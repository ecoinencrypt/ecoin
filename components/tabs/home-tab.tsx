"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Zap, Clock, Gift, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export default function HomeTab() {
  const [language, setLanguage] = useState("🇺🇸")
  const [miningProgress, setMiningProgress] = useState(40)
  const [isMining, setIsMining] = useState(true)
  const [canClaim, setCanClaim] = useState(false)

  useEffect(() => {
    if (isMining) {
      const interval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) {
            setCanClaim(true)
            setIsMining(false)
            return 100
          }
          return prev + 0.5
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isMining])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "🇺🇸" ? "🇮🇩" : "🇺🇸"))
  }

  const startMining = () => {
    setIsMining(true)
    setMiningProgress(0)
    setCanClaim(false)
  }

  const claimRewards = () => {
    setCanClaim(false)
    setMiningProgress(0)
    // Add claim logic here
  }

  const miningHistory = [
    { date: "2024-01-15", amount: "125.50", status: "Completed" },
    { date: "2024-01-14", amount: "98.75", status: "Completed" },
    { date: "2024-01-13", amount: "156.25", status: "Completed" },
  ]

  return (
    <div className="min-h-screen space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800/30">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-green-500">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-green-500/20 text-green-400">JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-base font-bold text-green-400">@johndoe</h2>
            <p className="text-xs text-gray-400">Crypto Miner</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
        >
          <Globe className="w-4 h-4 mr-1" />
          {language}
        </Button>
      </div>

      <div className="px-4 space-y-4">
        {/* ECO Balance - Made smaller */}
        <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-1">
              <Image src="/images/ecoin-logo.png" alt="ECoin Logo" width={24} height={24} className="mr-2" />
              <span className="text-lg font-bold text-green-400">ECO</span>
            </div>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-bold text-white mb-1">
              1,247.85
            </motion.div>
            <p className="text-sm text-green-400">≈ $623.92 USD</p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 text-pink-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">24</div>
              <p className="text-xs text-gray-400">Active Referrals</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardContent className="p-3 text-center">
              <Zap className="w-5 h-5 text-pink-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">18</div>
              <p className="text-xs text-gray-400">Mining Referrals</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mining Terminal - Made much bigger and more detailed */}
      <div className="px-4">
        <Card className="bg-gray-800/80 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center text-lg">
              <Zap className="w-6 h-6 mr-2" />
              ECoin Mining Terminal v2.1
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Terminal Display - Much bigger */}
            <div className="bg-black/70 p-6 rounded-lg font-mono text-sm border border-green-500/30">
              <div className="text-green-400 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {"> ECoin Mining Protocol v2.1 - ACTIVE"}
              </div>
              <div className="text-gray-400 mb-2">{"> Node Status: CONNECTED"}</div>
              <div className="text-gray-400 mb-2">{"> Hash Rate: 2.45 MH/s"}</div>
              <div className="text-gray-400 mb-2">{"> Network Difficulty: 1,247,892"}</div>
              <div className="text-gray-400 mb-4">
                {"> Status: " + (isMining ? "MINING ACTIVE" : canClaim ? "READY TO CLAIM" : "IDLE")}
              </div>

              {/* Mining Progress Display */}
              <div className="bg-gray-900/50 p-4 rounded border border-green-500/20 mb-4">
                <div className="text-green-400 mb-3 text-center font-bold">MINING PROGRESS</div>
                <div className="text-green-400 mb-4 text-center">
                  {"> Mining in progress "}
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    className="text-pink-400"
                  >
                    {"█".repeat(Math.floor(miningProgress / 10))}
                    {"░".repeat(10 - Math.floor(miningProgress / 10))}
                  </motion.span>
                  {" " + Math.floor(miningProgress) + "%"}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4 border border-green-500/20">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 via-pink-500 to-green-500 h-4 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${miningProgress}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    />
                  </motion.div>
                </div>

                {/* Mining Stats */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-gray-400">Current Reward:</div>
                    <div className="text-green-400 font-bold">+{(miningProgress * 1.25).toFixed(2)} ECO</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Time Remaining:</div>
                    <div className="text-pink-400 font-bold">{Math.floor((100 - miningProgress) * 14.4)}m</div>
                  </div>
                </div>
              </div>

              {/* System Messages */}
              <div className="space-y-1 text-xs">
                <div className="text-green-400">[INFO] Mining algorithm: SHA-256</div>
                <div className="text-green-400">[INFO] Block reward: 6.25 ECO</div>
                <div className="text-yellow-400">[WARN] High network activity detected</div>
                {isMining && (
                  <motion.div
                    className="text-pink-400"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    [MINING] Processing transactions...
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={startMining}
                disabled={isMining}
                className="bg-green-600 hover:bg-green-700 text-white py-3"
              >
                <Zap className="w-4 h-4 mr-1" />
                {isMining ? "Mining..." : "Start Mining"}
              </Button>
              <Button
                onClick={claimRewards}
                disabled={!canClaim}
                className="bg-pink-600 hover:bg-pink-700 text-white py-3"
              >
                <Gift className="w-4 h-4 mr-1" />
                {canClaim ? "Claim Now!" : "Claim"}
              </Button>
              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent py-3"
              >
                <ArrowUpRight className="w-4 h-4 mr-1" />
                Withdraw
              </Button>
            </div>

            {/* Mining Info */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-gray-400">Daily Limit</div>
                  <div className="text-white font-bold">500 ECO</div>
                </div>
                <div>
                  <div className="text-gray-400">Mined Today</div>
                  <div className="text-green-400 font-bold">247.85 ECO</div>
                </div>
                <div>
                  <div className="text-gray-400">Efficiency</div>
                  <div className="text-pink-400 font-bold">98.5%</div>
                </div>
              </div>
            </div>

            {/* Timer */}
            {isMining && (
              <div className="text-center bg-pink-900/20 p-3 rounded-lg">
                <Clock className="w-5 h-5 inline mr-2 text-pink-400" />
                <span className="text-pink-400 font-bold">
                  Next claim in: {Math.floor((100 - miningProgress) * 14.4)} minutes
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mining History */}
      <div className="px-4 pb-6">
        <Card className="bg-gray-800/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400">Recent Mining History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {miningHistory.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{entry.amount} ECO</div>
                    <div className="text-sm text-gray-400">{entry.date}</div>
                  </div>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
