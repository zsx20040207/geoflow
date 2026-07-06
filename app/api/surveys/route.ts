import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const body = await req.json()
  const db = getSupabaseAdmin()
  if (!db) {
    return NextResponse.json({ id: crypto.randomUUID(), data: body, status: "pending", mock: true }, { status: 201 })
  }

  const { data, error } = await db
    .from("survey_submissions")
    .insert({
      merchant_id: body.merchant_id || body.merchantId || null,
      form_data: body.form_data || body,
      uploaded_files: body.uploaded_files || [],
      status: "pending"
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false }, { status: 201 })
}
