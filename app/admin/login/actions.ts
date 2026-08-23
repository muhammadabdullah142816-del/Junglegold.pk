"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import { generateSessionToken } from "@/lib/session";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminPass) {
    return { error: "Server misconfiguration: ADMIN_PASSWORD environment variable is not set." };
  }

  if (!password) {
    return { error: "Password is required." };
  }

  // Timing-safe password comparison to prevent timing attacks
  const passBuffer = Buffer.from(password, "utf-8");
  const adminBuffer = Buffer.from(adminPass, "utf-8");

  const isValid =
    passBuffer.length === adminBuffer.length &&
    timingSafeEqual(passBuffer, adminBuffer);

  if (isValid) {
    const token = generateSessionToken();

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect("/admin");
  } else {
    // Artificial 600ms delay to thwart brute-force scripts
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Invalid password." };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
