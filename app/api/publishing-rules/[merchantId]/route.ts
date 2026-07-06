import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    frequency_days: 3,
    time_window_start: "09:00",
    time_window_end: "18:00",
    platform_weights: { toutiao: 0.4, baijiahao: 0.25, zhihu: 0.2, self_site: 0.15 }
  })
}

export async function PUT(req: Request) {
  return NextResponse.json({ data: await req.json(), mock: true })
}
