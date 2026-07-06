import { NextResponse } from "next/server"; export async function PUT(_:Request,{params}:{params:{id:string}}){return NextResponse.json({id:params.id,status:"draft",mock:true})}
