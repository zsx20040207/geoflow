# Supabase 接入步骤

## 1. 创建 Supabase 项目

在 Supabase 新建项目后，进入 SQL Editor，执行：

```sql
-- 文件路径
supabase/migrations/001_initial.sql
```

## 2. 配置 Vercel 环境变量

在 Vercel 项目 Settings → Environment Variables 中添加：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

保存后重新部署。

## 3. 当前代码行为

- 未配置 Supabase：API 返回样例数据，不影响页面演示。
- 已配置 Supabase：`/api/merchants`、`/api/articles`、`/api/surveys` 会读写云数据库。

## 4. 下一步

- 把前端 localStorage 流程切换成调用这些 API。
- 接入 Supabase Storage 保存商家上传的 PDF、Word 和图片。
- 配置 RLS 策略和账号权限。
