import type { Metadata } from "next"
import "./globals.css"
export const metadata: Metadata = { title: "GEOFlow", description: "生成式引擎优化全流程工具" }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html> }
