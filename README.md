# GEOFlow

GEOFlow 是面向本地小店的生成式引擎优化运营工具，覆盖商家信息采集、AI 友好档案蒸馏、稿件生成与审核、手动发布记录、AI 检索监测和运营看板。

## 本地运行

1. 复制 `.env.example` 为 `.env.local`，填入 Supabase、豆包和高德密钥。
2. 在 Supabase SQL Editor 执行 `supabase/migrations/001_initial.sql`。
3. 安装依赖后运行 `npm run dev`。

未配置 Supabase 时，页面会使用内置样例数据，便于先查看产品流程。
