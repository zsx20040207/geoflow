"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
export function TrendChart({data}:{data:any[]}){return <ResponsiveContainer width="100%" height={260}><LineChart data={data}><XAxis dataKey="week"/><YAxis/><Tooltip/><Line type="monotone" dataKey="rate" stroke="#356859" strokeWidth={3}/></LineChart></ResponsiveContainer>}
export function ModelChart({data}:{data:any[]}){return <ResponsiveContainer width="100%" height={260}><BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="rate" fill="#e46f5d" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
