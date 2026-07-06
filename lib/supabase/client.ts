import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cached: SupabaseClient | null = null

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function getSupabaseClient() {
  if (!hasSupabaseConfig()) return null
  if (!cached) {
    cached = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return cached
}
