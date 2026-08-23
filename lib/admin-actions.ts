"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/session";
import {
  isPlaceholderConfig,
  addLocalProduct, updateLocalProduct, deleteLocalProduct,
  addLocalOperator, updateLocalOperator, deleteLocalOperator,
  addLocalLegacy, updateLocalLegacy, deleteLocalLegacy,
  updateLocalOrderStatus,
} from "@/lib/api";
import type {
  Product,
  CreateProductPayload,
  Operator,
  CreateOperatorPayload,
  OrderStatus,
  LegacyMilestone,
  CreateLegacyPayload,
} from "@/types/database";

function isUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// ─── Supabase Admin Client ────────────────────────────────────────────────────

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase configuration in environment variables");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

// ─── Session Guard ────────────────────────────────────────────────────────────

async function requireAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (!sessionCookie || !verifySessionToken(sessionCookie.value)) {
    throw new Error("Unauthorized: Admin authentication required");
  }
}

// ─── Shared Image Upload Helper ───────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

async function uploadImage(formData: FormData, prefix: string): Promise<string> {
  await requireAdmin();

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("File size exceeds maximum allowed limit (5MB).");
  }

  const mimeType = (file.type || "").toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error("Invalid file type. Only JPEG, PNG, WEBP, and AVIF images are permitted.");
  }

  const rawExt = (file.name.split(".").pop() || "").toLowerCase();
  const fileExt = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : "jpg";

  if (isPlaceholderConfig()) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    return `data:${mimeType};base64,${base64}`;
  }

  try {
    const supabase = getAdminSupabase();
    const sanitizedPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, "");
    const fileName = `${sanitizedPrefix}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    let bucketName = "product-images";
    let { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, { contentType: mimeType, upsert: false });

    if (uploadError && uploadError.message.includes("not found")) {
      bucketName = "products";
      const retry = await supabase.storage
        .from(bucketName)
        .upload(fileName, buffer, { contentType: mimeType, upsert: false });
      uploadError = retry.error;
    }

    if (uploadError) {
      console.warn("Supabase storage upload failed, falling back to data URL:", uploadError.message);
      const base64 = buffer.toString("base64");
      return `data:${mimeType};base64,${base64}`;
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err: unknown) {
    console.warn("Storage upload exception, falling back to base64 data URL:", err);
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    return `data:${mimeType};base64,${base64}`;
  }
}

// ─── Product Server Actions ───────────────────────────────────────────────────

export async function createProductAction(payload: CreateProductPayload): Promise<Product> {
  await requireAdmin();

  if (isPlaceholderConfig()) {
    const newProduct: Product = {
      id: "prod-" + Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
    };
    addLocalProduct(newProduct);
    return newProduct;
  }

  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase.from("products").insert(payload).select().single();
    if (error) {
      if (error.code === "42501") {
        throw new Error("Supabase Row-Level Security (RLS) blocking insert. Please set your SUPABASE_SERVICE_ROLE_KEY or disable RLS on 'products' table.");
      }
      throw new Error(error.message);
    }
    return data as Product;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to create product on Supabase.");
  }
}

export async function updateProductAction(id: string, payload: CreateProductPayload): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig()) {
    updateLocalProduct(id, payload);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    
    // If saving a local mock item (e.g. "prod-sidr-01") for the first time to live Supabase:
    if (!isUUID(id)) {
      const { error: insertErr } = await supabase.from("products").insert(payload);
      if (insertErr) throw new Error("Failed to save product to Supabase: " + insertErr.message);
      return;
    }

    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw new Error("Failed to update product: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to update product on Supabase.");
  }
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig() || !isUUID(id)) {
    deleteLocalProduct(id);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error("Failed to delete product: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to delete product on Supabase.");
  }
}

export async function uploadProductImageAction(formData: FormData): Promise<string> {
  return uploadImage(formData, "product");
}

// ─── Order Server Actions ─────────────────────────────────────────────────────

export async function updateOrderStatusAction(orderId: string, status: OrderStatus): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig() || !isUUID(orderId)) {
    updateLocalOrderStatus(orderId, status);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) throw new Error("Failed to update order status: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to update order status on Supabase.");
  }
}

// ─── Operator Server Actions ──────────────────────────────────────────────────

export async function createOperatorAction(payload: CreateOperatorPayload): Promise<Operator> {
  await requireAdmin();
  if (isPlaceholderConfig()) {
    const newOp: Operator = { id: "op-" + Date.now(), ...payload, created_at: new Date().toISOString() };
    addLocalOperator(newOp);
    return newOp;
  }

  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase.from("operators").insert(payload).select().single();
    if (error) throw new Error("Failed to create operator: " + error.message);
    return data as Operator;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to create operator on Supabase.");
  }
}

export async function updateOperatorAction(id: string, payload: CreateOperatorPayload): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig()) {
    updateLocalOperator(id, payload);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    if (!isUUID(id)) {
      const { error: insertErr } = await supabase.from("operators").insert(payload);
      if (insertErr) throw new Error("Failed to save member to Supabase: " + insertErr.message);
      return;
    }

    const { error } = await supabase.from("operators").update(payload).eq("id", id);
    if (error) throw new Error("Failed to update operator: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to update operator on Supabase.");
  }
}

export async function deleteOperatorAction(id: string): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig() || !isUUID(id)) {
    deleteLocalOperator(id);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("operators").delete().eq("id", id);
    if (error) throw new Error("Failed to delete operator: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to delete operator on Supabase.");
  }
}

export async function uploadOperatorImageAction(formData: FormData): Promise<string> {
  return uploadImage(formData, "operator");
}

// ─── Legacy Milestone Server Actions ─────────────────────────────────────────

export async function createLegacyAction(payload: CreateLegacyPayload): Promise<LegacyMilestone> {
  await requireAdmin();
  if (isPlaceholderConfig()) {
    const newLeg: LegacyMilestone = { id: "legacy-" + Date.now(), ...payload, created_at: new Date().toISOString() };
    addLocalLegacy(newLeg);
    return newLeg;
  }

  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase.from("legacy_milestones").insert(payload).select().single();
    if (error) throw new Error("Failed to create milestone: " + error.message);
    return data as LegacyMilestone;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to create milestone on Supabase.");
  }
}

export async function updateLegacyAction(id: string, payload: CreateLegacyPayload): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig()) {
    updateLocalLegacy(id, payload);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    if (!isUUID(id)) {
      const { error: insertErr } = await supabase.from("legacy_milestones").insert(payload);
      if (insertErr) throw new Error("Failed to save milestone to Supabase: " + insertErr.message);
      return;
    }

    const { error } = await supabase.from("legacy_milestones").update(payload).eq("id", id);
    if (error) throw new Error("Failed to update milestone: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to update milestone on Supabase.");
  }
}

export async function deleteLegacyAction(id: string): Promise<void> {
  await requireAdmin();
  if (isPlaceholderConfig() || !isUUID(id)) {
    deleteLocalLegacy(id);
    return;
  }

  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("legacy_milestones").delete().eq("id", id);
    if (error) throw new Error("Failed to delete milestone: " + error.message);
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to delete milestone on Supabase.");
  }
}

export async function uploadLegacyImageAction(formData: FormData): Promise<string> {
  return uploadImage(formData, "legacy");
}
