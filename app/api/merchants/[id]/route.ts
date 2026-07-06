import { NextResponse } from "next/server"
import { merchants } from "@/lib/mock-data"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: merchants.find((m) => m.id === params.id) || null, mock: true })

  const { data, error } = await db.from("merchants").select("*").eq("id", params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data, mock: false })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ data: { id: params.id, ...body }, mock: true })

  const { data, error } = await db
    .from("merchants")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, mock: false })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ ok: true, mock: true })

  const { error } = await db.from("merchants").delete().eq("id", params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, mock: false })
}
