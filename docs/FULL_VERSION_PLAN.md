# GEOFlow 完整作品版路线

## 已完成

- 线上 Vercel 部署
- GitHub 仓库连接
- 可操作的浏览器端运营工作台
- 商家资料录入、AI 档案生成、稿件生成、审核、发布记录、监测模拟
- 数据导入导出和本地持久化
- Supabase SQL、Next.js API、豆包/高德封装骨架

## 下一步

1. 创建 Supabase 项目并执行 `supabase/migrations/001_initial.sql`。
2. 在 Vercel 环境变量中配置 Supabase、豆包、高德和 Cron Secret。
3. 将当前 localStorage 数据流切换为 Supabase 数据流。
4. 将模拟蒸馏和稿件生成切换为豆包 API。
5. 接入高德 POI 搜索接口补全商家资料。
6. 接入 Vercel Cron：每日发布提醒、每周 AI 检索监测。
