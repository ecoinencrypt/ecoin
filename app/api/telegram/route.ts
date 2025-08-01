import { Telegraf } from "telegraf"
import { addUser } from "@/lib/users"
import { NextRequest } from "next/server"

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start(async (ctx) => {
  const telegram_id = String(ctx.from.id)
  const username = ctx.from.username || "-"
  const full_name = `${ctx.from.first_name || ""} ${ctx.from.last_name || ""}`.trim()
  const profile_picture = `https://t.me/i/userpic/320/${ctx.from.username}.jpg`

  const args = ctx.message.text.split(" ")
  const referred_by = args.length > 1 ? args[1] : null

  await addUser({
    telegram_id,
    username,
    full_name,
    profile_picture,
    referred_by,
  })

  ctx.reply("✅ Kamu berhasil masuk ke ECoin Mining. Klik tombol di bawah untuk mulai.")
})

// Webhook handler untuk Vercel
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await bot.handleUpdate(body)
    return new Response("OK")
  } catch (e) {
    console.error("❌ Gagal handle update:", e)
    return new Response("Internal Server Error", { status: 500 })
  }
}