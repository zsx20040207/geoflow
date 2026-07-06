import { NextResponse } from "next/server"; export async function POST(){return NextResponse.json({ok:true,mock:true,message:"文件上传接口已预留，接入 Supabase Storage 后启用"})}
