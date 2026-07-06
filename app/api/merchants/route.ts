import { NextResponse } from "next/server"
import { merchants } from "@/lib/mock-data"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: merchants, mock: true })

  const { data, error } = await db
    .from("merchants")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false })
}

export async function POST(req: Request) {
  const body = await req.json()
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: { id: crypto.randomUUID(), ...body }, mock: true }, { status: 201 })

  const payload = {
    name: body.name,
    category: body.category,
    subcategory: body.subcategory,
    province: body.province,
    city: body.city,
    district: body.district,
    address: body.address,
    phone: body.phone,
    business_hours: body.business_hours || body.hours,
    years_in_business: body.years_in_business || body.years,
    avg_price: body.avg_price || body.avgPrice,
    raw_data: body.raw_data || body,
    status: body.status || "active",
    plan: body.plan || "standard"
  }

  const { data, error } = await db.from("merchants").insert(payload).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false }, { status: 201 })
}
