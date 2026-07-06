import { callDoubao } from "./ai/doubao"
export async function generateArticle(brandProfile:any, articleType:string, targetQuery:string){const prompt="请根据商家档案写一篇"+articleType+"，目标查询词："+targetQuery+"。商家档案："+JSON.stringify(brandProfile); const content=await callDoubao(prompt,"你是本地生活内容写手"); return {title:targetQuery+"｜GEO 优化稿件",content}}
