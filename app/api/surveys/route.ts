import { NextResponse } from "next/server"; export async function POST(req:Request){return NextResponse.json({id:crypto.randomUUID(),data:await req.json(),status:"pending",mock:true},{status:201})}
