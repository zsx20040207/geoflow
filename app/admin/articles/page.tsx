"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, PageTitle, Badge, Button } from "@/components/ui"

type Merchant = { id: string; name: string; category?: string; subcategory?: string; city?: string; district?: string; address?: string; business_hours?: string; avg_price?: number; raw_data?: any }
type Article = { id: string; merchant_id: string; article_type: string; target_query: string; target_platform: string; title: string; content: string; status: string; published_url?: string }

const articleTypes = [
  ["brand_intro", "百家号"],
  ["qa", "知乎"],
  ["recommendation", "头条号"],
  ["ranking", "自建站"]
] as const

export default function Page() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [merchantId, setMerchantId] = useState("")
  const [queries, setQueries] = useState("成都烧烤推荐\n成都武侯区好吃的烧烤")
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function loadAll() {
    const [mRes, aRes] = await Promise.all([fetch("/api/merchants", { cache: "no-store" }), fetch("/api/articles", { cache: "no-store" })])
    const [mJson, aJson] = await Promise.all([mRes.json(), aRes.json()])
    const nextMerchants = mJson.data || []
    setMerchants(nextMerchants)
    setArticles(aJson.data || [])
    setMerchantId((current) => current || nextMerchants[0]?.id || "")
  }

  useEffect(() => {
    loadAll().catch(() => setMessage("数据读取失败，请稍后刷新。"))
  }, [])

  const selectedMerchant = useMemo(() => merchants.find((m) => m.id === merchantId), [merchants, merchantId])

  async function generateArticles() {
    if (!selectedMerchant) {
      setMessage("请先新增一个商家，再生成稿件。")
      return
    }
    setLoading(true)
    setMessage("")
    const queryList = queries.split("\n").map((item) => item.trim()).filter(Boolean)
    let created = 0
    try {
      for (const query of queryList) {
        for (const [type, platform] of articleTypes) {
          for (let i = 0; i < count; i++) {
            const article = buildArticle(selectedMerchant, type, platform, query)
            const res = await fetch("/api/articles", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(article)
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || "稿件保存失败")
            created++
          }
        }
      }
      setMessage(`已生成并保存 ${created} 篇稿件。`)
      setPanelOpen(false)
      await loadAll()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "稿件生成失败")
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(article: Article, status: string) {
    setArticles((rows) => rows.map((row) => row.id === article.id ? { ...row, status } : row))
    setMessage("状态已在页面更新，后续会接入云端审核接口。")
  }

  return (
    <>
      <PageTitle
        title="稿件工作台"
        desc="按状态管理草稿、待审核、已通过、已排期、已发布和已监测稿件。"
        action={<Button onClick={() => setPanelOpen((value) => !value)}>批量生成稿件</Button>}
      />
      <div className="grid gap-4 p-6">
        {message && <div className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm text-black/70">{message}</div>}
        {panelOpen && (
          <Card>
            <h2 className="mb-4 text-xl font-semibold">批量生成稿件</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">商家</span>
                <select value={merchantId} onChange={(event) => setMerchantId(event.target.value)} className="rounded-md border border-black/15 bg-white px-3 py-2">
                  {merchants.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">每类数量</span>
                <input type="number" min={1} max={5} value={count} onChange={(event) => setCount(Number(event.target.value))} className="rounded-md border border-black/15 bg-white px-3 py-2" />
              </label>
              <label className="grid gap-2 text-sm md:col-span-2">
                <span className="font-medium">目标查询词，一行一个</span>
                <textarea rows={5} value={queries} onChange={(event) => setQueries(event.target.value)} className="rounded-md border border-black/15 bg-white px-3 py-2" />
              </label>
              <button disabled={loading} onClick={generateArticles} className="rounded-md bg-moss px-4 py-2 text-sm font-medium text-white md:w-44">
                {loading ? "生成中..." : "开始生成"}
              </button>
            </div>
          </Card>
        )}
        {articles.map((a) => (
          <Card key={a.id}>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <Badge>{a.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-black/60">{a.target_platform} · {a.article_type} · 查询词：{a.target_query}</p>
                <p className="mt-3 text-sm leading-6 text-black/70">{a.content}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => updateStatus(a, "approved")} className="rounded-md border px-3 py-2">通过</button>
                <button onClick={() => updateStatus(a, "published")} className="rounded-md border px-3 py-2">发布记录</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

function buildArticle(merchant: Merchant, type: string, platform: string, query: string) {
  const category = merchant.subcategory || merchant.category || "本地门店"
  const titleMap: Record<string, string> = {
    brand_intro: `${query}：${merchant.name}这家店值得收藏`,
    qa: `${merchant.city || "本地"}${merchant.district || ""}有哪些值得去的${category}？`,
    recommendation: `${merchant.name}探店：适合被 AI 推荐的本地小店`,
    ranking: `${merchant.city || "本地"}${category}推荐清单：为什么会提到${merchant.name}`
  }
  const content = `${merchant.name}位于${merchant.city || ""}${merchant.district || ""}${merchant.address || ""}，主营${category}。人均约${merchant.avg_price || 0}元，营业时间为${merchant.business_hours || "待补充"}。这篇内容围绕“${query}”补充具体地址、品类、人均、营业时间和推荐理由，方便 AI 搜索在回答本地推荐问题时引用。`
  return {
    merchant_id: merchant.id,
    article_type: type,
    target_query: query,
    target_platform: platform,
    title: titleMap[type] || `${query}：${merchant.name}`,
    content,
    status: "pending_review"
  }
}
