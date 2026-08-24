import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isPlaceholderConfig } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const isPlaceholder = isPlaceholderConfig();
  const uptime = process.uptime();

  return NextResponse.json(
    {
      status: "healthy",
      service: "Jungle Gold Pure Raw Honey E-Commerce",
      version: "1.0.0",
      uptime_seconds: Math.floor(uptime),
      environment: process.env.NODE_ENV,
      database: isPlaceholder ? "local_fallback" : "supabase_live",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    }
  );
}
