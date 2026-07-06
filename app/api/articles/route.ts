import { NextResponse } from "next/server"; import { articles } from "@/lib/mock-data"; export async function GET(){return NextResponse.json({data:articles})}
