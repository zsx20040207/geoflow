import OpenAI from "openai"
export async function callDoubao(prompt:string, systemPrompt?:string){if(!process.env.DOUBAO_API_KEY||!process.env.DOUBAO_ENDPOINT_ID){return JSON.stringify({mock:true,message:"未配置豆包 API，返回样例结果",prompt:prompt.slice(0,400)})}
const client=new OpenAI({apiKey:process.env.DOUBAO_API_KEY,baseURL:"https://ark.cn-beijing.volces.com/api/v3"})
const response=await client.chat.completions.create({model:process.env.DOUBAO_ENDPOINT_ID,messages:[...(systemPrompt?[{role:"system" as const,content:systemPrompt}]:[]),{role:"user" as const,content:prompt}],temperature:0.7})
return response.choices[0]?.message?.content || ""}
