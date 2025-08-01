"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Clock, TrendingUp, AlertCircle } from "lucide-react"

export default function PresaleTab() {
  const [selectedPhase, setSelectedPhase] = useState("phase1")
  const [paymentToken, setPaymentToken] = useState("USDT")
  const [buyAmount, setBuyAmount] = useState("")

  const presalePhases = {
    phase1: {
      name: "Phase 1",
      price: "$0.001",
      totalTokens: 10000000,
      soldTokens: 7500000,
      remaining: 2500000,
      progress: 75,
      status: "Active",
      bonus: "50% Bonus",
    },
    phase2: {
      name: "Phase 2",
      price: "$0.002",
      totalTokens: 15000000,
      soldTokens: 0,
      remaining: 15000000,
      progress: 0,
      status: "Upcoming",
      bonus: "25% Bonus",
    },
    phase3: {
      name: "Phase 3",
      price: "$0.005",
      totalTokens: 20000000,
      soldTokens: 0,
      remaining: 20000000,
      progress: 0,
      status: "Upcoming",
      bonus: "10% Bonus",
    },
  }

  const currentPhase = presalePhases[selectedPhase as keyof typeof presalePhases]

  const calculateTokens = () => {
    if (!buyAmount) return "0"
    const price = Number.parseFloat(currentPhase.price.replace("$", ""))
    const tokens = Number.parseFloat(buyAmount) / price
    return tokens.toLocaleString()
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ShoppingCart className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-green-400 mb-2">ECoin Presale</h1>
        <p className="text-gray-400">Get ECO tokens at exclusive presale prices</p>
      </div>

      {/* Phase Selection */}
      <Tabs value={selectedPhase} onValueChange={setSelectedPhase} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="phase1" className="data-[state=active]:bg-green-600">
            Phase 1
          </TabsTrigger>
          <TabsTrigger value="phase2" className="data-[state=active]:bg-green-600">
            Phase 2
          </TabsTrigger>
          <TabsTrigger value="phase3" className="data-[state=active]:bg-green-600">
            Phase 3
          </TabsTrigger>
        </TabsList>

        {Object.entries(presalePhases).map(([key, phase]) => (
          <TabsContent key={key} value={key} className="mt-4">
            <Card className="bg-gray-800/80 border-green-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-400">{phase.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      phase.status === "Active"
                        ? "border-green-500/30 text-green-400"
                        : "border-yellow-500/30 text-yellow-400"
                    }
                  >
                    {phase.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price and Bonus */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">{phase.price}</div>
                    <div className="text-sm text-green-400">per ECO</div>
                  </div>
                  <div className="text-center p-3 bg-pink-900/30 rounded-lg">
                    <div className="text-lg font-bold text-pink-400">{phase.bonus}</div>
                    <div className="text-sm text-pink-300">Extra Tokens</div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-green-400">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-pink-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Sold: {phase.soldTokens.toLocaleString()}</span>
                    <span className="text-green-400">Remaining: {phase.remaining.toLocaleString()}</span>
                  </div>
                </div>

                {/* Buy Form */}
                {phase.status === "Active" && (
                  <div className="space-y-4 p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Payment Method</label>
                      <div className="flex gap-2">
                        <Button
                          variant={paymentToken === "USDT" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentToken("USDT")}
                          className={paymentToken === "USDT" ? "bg-green-600" : "border-green-500/30"}
                        >
                          USDT
                        </Button>
                        <Button
                          variant={paymentToken === "POL" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentToken("POL")}
                          className={paymentToken === "POL" ? "bg-green-600" : "border-green-500/30"}
                        >
                          POL
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Amount ({paymentToken})</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="bg-gray-800 border-green-500/30 text-white"
                      />
                    </div>

                    {buyAmount && (
                      <div className="p-3 bg-green-900/20 rounded-lg">
                        <div className="text-sm text-gray-400">You will receive:</div>
                        <div className="text-xl font-bold text-green-400">{calculateTokens()} ECO</div>
                        <div className="text-sm text-pink-400">
                          + {phase.bonus} ={" "}
                          {(Number.parseFloat(calculateTokens().replace(/,/g, "")) * 1.5).toLocaleString()} ECO total
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-pink-600 hover:from-green-700 hover:to-pink-700 text-white"
                      disabled={!buyAmount}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy ECO Tokens
                    </Button>
                  </div>
                )}

                {phase.status === "Upcoming" && (
                  <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-yellow-400 font-medium">Coming Soon</div>
                    <div className="text-sm text-gray-400">
                      This phase will be available after the current phase ends
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Listing Info */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-pink-500/20">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-pink-400 mr-2" />
            <span className="font-semibold text-pink-400">After Presale</span>
          </div>
          <p className="text-gray-300 text-sm mb-2">After Phase 3 completion, ECO will be listed on major exchanges:</p>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>• Centralized Exchanges (CEX)</li>
            <li>• Decentralized Exchanges (DEX)</li>
            <li>• Initial listing price: $0.01</li>
          </ul>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
            <div>
              <div className="text-red-400 font-medium mb-1">Important Notice</div>
              <p className="text-sm text-gray-300">
                Cryptocurrency investments carry risk. Only invest what you can afford to lose. Presale tokens will be
                distributed after each phase completion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
