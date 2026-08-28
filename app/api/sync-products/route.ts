import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route syncs the Supabase products table with the correct catalog.
// Call it once from: /api/sync-products
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 });
  }

  const admin = createClient(url, serviceKey);

  // 1. Delete all old products
  await admin.from("products").delete().neq("id", "___never___");

  // 2. Insert the correct product catalog
  const { error } = await admin.from("products").insert([
    {
      id: "prod-multi-02",
      title: "Wild Forest Multi-Flower Honey",
      description:
        "Harvested from untouched high-altitude forest blossoms in Margalla Hills & Skardu. Rich in live bee pollen and natural active enzymes.",
      images: ["/products.jpg", "/hero-jar.jpg", "/harvest.jpg", "/crystallization.jpg"],
      variants: [
        { id: "var-m100", size: "100g",  price: 350,  in_stock: true },
        { id: "var-m200", size: "250g",  price: 700,  in_stock: true },
        { id: "var-m500", size: "500g",  price: 1400, in_stock: true },
        { id: "var-m1kg", size: "1kg",   price: 2800, in_stock: true },
      ],
      created_at: "2026-01-02T00:00:00.000Z", // newer = shows first
    },
    {
      id: "prod-sidr-01",
      title: "Raw Wild Sidr (Beri) Honey",
      description:
        "100% pure, unheated, unfiltered raw wild Sidr honey harvested from wild berries in Swat Valley & Karak.",
      images: ["/hero-jar.jpg", "/products.jpg", "/harvest.jpg"],
      variants: [
        { id: "var-100", size: "125g", price: 1200, in_stock: false },
        { id: "var-200", size: "250g", price: 2200, in_stock: false },
        { id: "var-720", size: "500g", price: 4500, in_stock: false },
      ],
      created_at: "2026-01-01T00:00:00.000Z", // older = shows second
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "✅ Products synced: Wild Forest Multi-Flower (in stock, 4 sizes) is now #1. Beri is out of stock.",
  });
}
