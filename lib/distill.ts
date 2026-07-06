import { callDoubao } from "./ai/doubao"
export async function distillMerchant(rawData:any){const prompt="请将以下商家原始信息提炼为 AI 友好的结构化 JSON 档案："+JSON.stringify(rawData); const text=await callDoubao(prompt,"你是品牌信息结构化专家，只返回 JSON"); try{return JSON.parse(text)}catch{return {raw:text}}}
