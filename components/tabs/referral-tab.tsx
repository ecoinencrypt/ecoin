"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Share2, Users, Gift, CheckCircle } from "lucide-react"
//import { useToast } from "@/hooks/use-toast"

export default function ReferralTab() {
  const [copied, setCopied] = useState(false)
  //const { toast } = useToast()

  const referralLink = "https://t.me/ECoinBot?start=ref_johndoe123"

  const referrals = [
    { username: "@alice_crypto", joined: "2024-01-15", earned: "45.50", status: "Active" },
    { username: "@bob_miner", joined: "2024-01-14", earned: "32.75", status: "Active" },
    { username: "@charlie_hodl", joined: "2024-01-13", earned: "28.90", status: "Inactive" },
    { username: "@diana_trader", joined: "2024-01-12", earned: "67.25", status: "Active" },
  ]

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      //setCopied(true)
      //toast({
       // title: "Link Copied!",
      //  description: "Referral link copied to clipboard",
      //})
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join ECoin Mining!",
        text: "Start mining ECoin and earn crypto rewards!",
        url: referralLink,
      })
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-gradient-to-r from-pink-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Users className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-green-400 mb-2">Referral Program</h1>
        <p className="text-gray-400">Share your link and earn 10% bonus when they mine!</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-pink-900/50 to-red-900/50 border-pink-500/30">
          <CardContent className="p-4 text-center">
            <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">174.40</div>
            <p className="text-sm text-pink-300">Total Earned (ECO)</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{referrals.length}</div>
            <p className="text-sm text-green-300">Total Referrals</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="bg-gray-800/80 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black/50 p-3 rounded-lg font-mono text-sm text-green-400 break-all">{referralLink}</div>

          <div className="flex gap-2">
            <Button onClick={copyReferralLink} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
            <Button
              onClick={shareReferralLink}
              variant="outline"
              className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Info */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-pink-500/20">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Gift className="w-5 h-5 text-pink-400 mr-2" />
            <span className="font-semibold text-pink-400">Referral Rewards</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Earn 10% of your referrals' mining rewards</li>
            <li>• Bonus 5% for first 24 hours after they join</li>
            <li>• No limit on number of referrals</li>
            <li>• Instant rewards when they mine</li>
          </ul>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card className="bg-gray-800/50 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">
            Your Referrals ({referrals.filter((r) => r.status === "Active").length} Active)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referrals.map((referral, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border border-green-500/30">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${referral.username.slice(1, 2).toUpperCase()}`}
                    />
                    <AvatarFallback className="bg-green-500/20 text-green-400">
                      {referral.username.slice(1, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{referral.username}</div>
                    <div className="text-sm text-gray-400">Joined {referral.joined}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium">{referral.earned} ECO</div>
                  <Badge
                    variant="outline"
                    className={
                      referral.status === "Active"
                        ? "border-green-500/30 text-green-400"
                        : "border-gray-500/30 text-gray-400"
                    }
                  >
                    {referral.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
