import { db } from "./firebase"
import { doc, setDoc, updateDoc, getDoc, increment } from "firebase/firestore"

// Tambah user baru (jika belum ada)
export async function addUser(user: {
  telegram_id: string
  username: string
  full_name: string
  profile_picture?: string
  referred_by?: string | null// <--- opsional
}) {
  try {
    const ref = doc(db, "users", user.telegram_id)
    const existing = await getDoc(ref)

    if (!existing.exists()) {
      await setDoc(ref, {
        telegram_id: user.telegram_id,
        username: user.username,
        full_name: user.full_name,
        profile_picture: user.profile_picture || null,
        wallet_address: null,
        referrals: 0,
        active_refs: 0,
        reward_daily: 0.1,
        last_mining_at: null,
        joined_at: new Date(),
        is_banned: false,
        ref_code: user.telegram_id,
        referred_by: user.referred_by || null, // disimpan hanya jika ada by
      })

      console.log("✅ User baru disimpan")

      // Jika user direferensikan oleh orang lain, tambahkan +1 ke data referrer
      if (user.referred_by) {
        const referrer = doc(db, "users", user.referred_by)
        await updateDoc(referrer, {
          referrals: increment(1),
        })
        console.log("🎉 Referral ditambahkan ke", user.referred_by)
      }

    } else {
      console.log("ℹ️ User sudah ada")
    }
  } catch (e) {
    console.error("❌ Gagal tambah user:", e)
  }
}

// Update wallet user
export async function updateUserWallet(telegram_id: string, wallet_address: string) {
  try {
    await updateDoc(doc(db, "users", telegram_id), {
      wallet_address,
    })
    console.log("✅ Wallet address berhasil diupdate")
  } catch (e) {
    console.error("❌ Gagal update wallet:", e)
  }
}