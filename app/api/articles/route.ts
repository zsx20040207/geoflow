import { NextResponse } from "next/server"
import { articles } from "@/lib/mock-data"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: articles, mock: true })

  const url = new URL(req.url)
  let query = db.from("articles").select("*").order("created_at", { ascending: false })
  const merchantId = url.searchParams.get("merchant_id")
  const status = url.searchParams.get("status")
  if (merchantId) query = query.eq("merchant_id", merchantId)
  if (status) query = query.eq("status", status)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false })
}

export async function POST(req: Request) {
  const body = await req.json()
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: { id: crypto.randomUUID(), ...body }, mock: true }, { status: 201 })

  const { data, error } = await db.from("articles").insert(body).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false }, { status: 201 })
}
