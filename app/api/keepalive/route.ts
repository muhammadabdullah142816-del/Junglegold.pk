import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isPlaceholderConfig } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();

  try {
    if (isPlaceholderConfig()) {
      return NextResponse.json({
        status: "ok",
        mode: "mock_mode",
        message: "Jungle Gold Storefront active (Local DB fallback)",
        latency: `${Date.now() - startTime}ms`,
        timestamp: new Date().toISOString(),
      });
    }

    // Ping Supabase with lightweight query to keep instance active 24/7
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        {
          status: "degraded",
          supabase_error: error.message,
          latency: `${Date.now() - startTime}ms`,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        supabase: "active",
        products_count: count ?? 0,
        latency: `${Date.now() - startTime}ms`,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Health check error";
    return NextResponse.json(
      {
        status: "error",
        error: msg,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
