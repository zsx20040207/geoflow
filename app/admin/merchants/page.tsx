"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge, Card, PageTitle, Button } from "@/components/ui"

type Merchant = {
  id: string
  name: string
  category?: string
  subcategory?: string
  province?: string
  city?: string
  district?: string
  address?: string
  phone?: string
  business_hours?: string
  years_in_business?: number
  avg_price?: number
  status?: string
  plan?: string
}

const emptyMerchant: Omit<Merchant, "id"> = {
  name: "",
  category: "餐饮",
  subcategory: "",
  province: "",
  city: "",
  district: "",
  address: "",
  phone: "",
  business_hours: "",
  years_in_business: 1,
  avg_price: 0,
  status: "active",
  plan: "standard"
}

export default function Page() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(emptyMerchant)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function loadMerchants() {
    const res = await fetch("/api/merchants", { cache: "no-store" })
    const json = await res.json()
    setMerchants(json.data || [])
  }

  useEffect(() => {
    loadMerchants().catch(() => setMessage("商家列表读取失败，请稍后刷新。"))
  }, [])

  async function submitMerchant(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch("/api/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, raw_data: form })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "保存失败")
      setMessage("商家已保存到云端。")
      setForm(emptyMerchant)
      setFormOpen(false)
      await loadMerchants()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败")
    } finally {
      setLoading(false)
    }
  }

  function update<K extends keyof typeof emptyMerchant>(key: K, value: (typeof emptyMerchant)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <>
      <PageTitle
        title="商家管理"
        desc="创建、查看和维护商家档案，触发 AI 蒸馏和 GEO 方案生成。"
        action={<Button onClick={() => setFormOpen((value) => !value)}>新增商家</Button>}
      />
      <div className="grid gap-4 p-6">
        {message && <div className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm text-black/70">{message}</div>}
        {formOpen && (
          <Card>
            <h2 className="mb-4 text-xl font-semibold">新增商家档案</h2>
            <form onSubmit={submitMerchant} className="grid gap-4 md:grid-cols-2">
              <Field label="店铺名称" value={form.name} onChange={(v) => update("name", v)} required />
              <Field label="所属品类" value={form.category || ""} onChange={(v) => update("category", v)} />
              <Field label="细分品类" value={form.subcategory || ""} onChange={(v) => update("subcategory", v)} placeholder="例如：炭火烧烤、咖啡、宠物洗护" />
              <Field label="城市" value={form.city || ""} onChange={(v) => update("city", v)} />
              <Field label="区县" value={form.district || ""} onChange={(v) => update("district", v)} />
              <Field label="详细地址" value={form.address || ""} onChange={(v) => update("address", v)} />
              <Field label="电话" value={form.phone || ""} onChange={(v) => update("phone", v)} />
              <Field label="营业时间" value={form.business_hours || ""} onChange={(v) => update("business_hours", v)} placeholder="例如：17:00-02:00" />
              <Field label="经营年限" type="number" value={String(form.years_in_business || 0)} onChange={(v) => update("years_in_business", Number(v))} />
              <Field label="人均消费" type="number" value={String(form.avg_price || 0)} onChange={(v) => update("avg_price", Number(v))} />
              <button disabled={loading} className="rounded-md bg-moss px-4 py-2 text-sm font-medium text-white md:w-40">
                {loading ? "保存中..." : "保存商家"}
              </button>
            </form>
          </Card>
        )}
        {merchants.map((m) => (
          <Card key={m.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{m.name}</h2>
                  <Badge>{m.plan || "standard"}</Badge>
                </div>
                <p className="mt-2 text-sm text-black/60">{m.city}{m.district} · {m.subcategory || m.category} · 人均 {m.avg_price || 0} 元</p>
                <p className="mt-1 text-sm text-black/60">{m.address} · {m.business_hours}</p>
              </div>
              <Link className="rounded-md border border-black/15 px-4 py-2 text-sm" href={`/admin/merchants/${m.id}`}>查看详情</Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

function Field(props: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{props.label}</span>
      <input
        required={props.required}
        type={props.type || "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event.target.value)}
        className="rounded-md border border-black/15 bg-white px-3 py-2"
      />
    </label>
  )
}
