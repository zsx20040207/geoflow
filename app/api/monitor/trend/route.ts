import { NextResponse } from "next/server"; import { monitorTrend } from "@/lib/mock-data"; export async function GET(){return NextResponse.json({data:monitorTrend})}
