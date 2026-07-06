import type { Config } from "tailwindcss"
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#17201a", moss: "#356859", mint: "#d8efe3", coral: "#e46f5d", amber: "#f5b65a" } } }, plugins: [] }
export default config
