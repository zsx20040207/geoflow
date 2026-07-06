import { callDoubao } from "./doubao"
export async function runMonitorCheck(queryText:string, brandNames:string[]){const response=await callDoubao(queryText); const mentioned=brandNames.some(n=>response.includes(n)); return {modelName:"doubao",modelResponse:response,isMentioned:mentioned,mentionPosition:mentioned?1:null,mentionSentiment:mentioned?"positive":"neutral",hasSpecificInfo:mentioned}}
