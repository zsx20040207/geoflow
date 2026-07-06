import { NextResponse } from "next/server"; import { modelRates, monitorTrend } from "@/lib/mock-data"; export async function GET(){return NextResponse.json({trend:monitorTrend,modelRates})}
