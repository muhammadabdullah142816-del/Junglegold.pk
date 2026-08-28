import { NextResponse } from "next/server";
import { fetchProducts, DEFAULT_PRODUCTS } from "@/lib/api";

export async function GET() {
  try {
    const products = await fetchProducts();
    if (!products || products.length === 0) {
      return NextResponse.json({ success: true, products: DEFAULT_PRODUCTS, source: "default" });
    }
    return NextResponse.json({ success: true, products, source: "database" });
  } catch (err: unknown) {
    console.error("Products API route error (returning fallback data):", err);
    return NextResponse.json({ success: true, products: DEFAULT_PRODUCTS, source: "fallback" });
  }
}
