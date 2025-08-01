"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BarChart3, Calendar, Lock, ImageIcon, CheckCircle, Clock, Target } from "lucide-react"

export default function DashboardTab() {
  const [stakingPeriod, setStakingPeriod] = useState("30")
  const [stakingAmount, setStakingAmount] = useState("")

  const roadmapItems = [
    { phase: "Q1 2024", title: "Platform Launch", status: "completed", description: "Launch of ECoin mining platform" },
    { phase: "Q2 2024", title: "Presale Phase 1", status: "completed", description: "First presale round completion" },
    { phase: "Q3 2024", title: "Presale Phase 2", status: "active", description: "Second presale round ongoing" },
    { phase: "Q4 2024", title: "Exchange Listing", status: "upcoming", description: "CEX and DEX listings" },
    { phase: "Q1 2025", title: "NFT Marketplace", status: "upcoming", description: "Launch of NFT trading platform" },
    { phase: "Q2 2025", title: "Mobile App", status: "upcoming", description: "Native mobile applications" },
  ]

  const nftItems = [
    {
      id: 1,
      name: "Crypto Miner #001",
      price: "50 ECO",
      rarity: "Rare",
      image: "/placeholder.svg?height=150&width=150&text=NFT1",
    },
    {
      id: 2,
      name: "Digital Hacker #042",
      price: "75 ECO",
      rarity: "Epic",
      image: "/placeholder.svg?height=150&width=150&text=NFT2",
    },
    {
      id: 3,
      name: "Cyber Punk #123",
      price: "100 ECO",
      rarity: "Legendary",
      image: "/placeholder.svg?height=150&width=150&text=NFT3",
    },
    {
      id: 4,
      name: "Code Warrior #089",
      price: "25 ECO",
      rarity: "Common",
      image: "/placeholder.svg?height=150&width=150&text=NFT4",
    },
  ]

  const stakingRewards = {
    "30": { apy: "12%", multiplier: "1.2x" },
    "90": { apy: "25%", multiplier: "1.5x" },
  }

  const calculateStakingRewards = () => {
    if (!stakingAmount) return "0"
    const amount = Number.parseFloat(stakingAmount)
    const apy = stakingPeriod === "30" ? 0.12 : 0.25
    const days = Number.parseInt(stakingPeriod)
    const dailyRate = apy / 365
    const rewards = amount * dailyRate * days
    return rewards.toFixed(2)
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
          <BarChart3 className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-green-400 mb-2">Dashboard</h1>
        <p className="text-gray-400">Explore roadmap, staking, and NFT marketplace</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-green-600">
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="staking" className="data-[state=active]:bg-green-600">
            Staking
          </TabsTrigger>
          <TabsTrigger value="nft" className="data-[state=active]:bg-green-600">
            NFT
          </TabsTrigger>
        </TabsList>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="mt-4">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                ECoin Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roadmapItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === "completed"
                          ? "bg-green-500/20"
                          : item.status === "active"
                            ? "bg-pink-500/20"
                            : "bg-gray-500/20"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : item.status === "active" ? (
                        <Clock className="w-4 h-4 text-pink-400" />
                      ) : (
                        <Calendar className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "completed"
                              ? "border-green-500/30 text-green-400"
                              : item.status === "active"
                                ? "border-pink-500/30 text-pink-400"
                                : "border-gray-500/30 text-gray-400"
                          }
                        >
                          {item.phase}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value="staking" className="mt-4">
          <div className="space-y-4">
            {/* Staking Options */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all ${
                  stakingPeriod === "30" ? "bg-green-900/50 border-green-500" : "bg-gray-800/50 border-green-500/20"
                }`}
                onClick={() => setStakingPeriod("30")}
              >
                <CardContent className="p-4 text-center">
                  <Lock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">30 Days</div>
                  <div className="text-green-400">12% APY</div>
                  <div className="text-sm text-gray-400">1.2x Multiplier</div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  stakingPeriod === "90" ? "bg-green-900/50 border-green-500" : "bg-gray-800/50 border-green-500/20"
                }`}
                onClick={() => setStakingPeriod("90")}
              >
                <CardContent className="p-4 text-center">
                  <Lock className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">90 Days</div>
                  <div className="text-pink-400">25% APY</div>
                  <div className="text-sm text-gray-400">1.5x Multiplier</div>
                </CardContent>
              </Card>
            </div>

            {/* Staking Form */}
            <Card className="bg-gray-800/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Stake ECO Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Amount to Stake</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                    className="bg-gray-700 border-green-500/30 text-white"
                  />
                  <div className="text-sm text-gray-400 mt-1">Available: 1,247.85 ECO</div>
                </div>

                {stakingAmount && (
                  <div className="p-4 bg-green-900/20 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Staking Period</div>
                        <div className="text-white font-medium">{stakingPeriod} Days</div>
                      </div>
                      <div>
                        <div className="text-gray-400">APY</div>
                        <div className="text-green-400 font-medium">
                          {stakingRewards[stakingPeriod as keyof typeof stakingRewards].apy}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Estimated Rewards</div>
                        <div className="text-pink-400 font-medium">{calculateStakingRewards()} ECO</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Total Return</div>
                        <div className="text-white font-medium">
                          {(Number.parseFloat(stakingAmount) + Number.parseFloat(calculateStakingRewards())).toFixed(2)}{" "}
                          ECO
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-pink-600 hover:from-green-700 hover:to-pink-700 text-white"
                  disabled={!stakingAmount}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Stake ECO Tokens
                </Button>
              </CardContent>
            </Card>

            {/* Active Stakes */}
            <Card className="bg-gray-800/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Active Stakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">500 ECO</div>
                      <div className="text-sm text-gray-400">30 days • 12% APY</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400">+15.2 ECO</div>
                      <div className="text-sm text-gray-400">18 days left</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">1000 ECO</div>
                      <div className="text-sm text-gray-400">90 days • 25% APY</div>
                    </div>
                    <div className="text-right">
                      <div className="text-pink-400">+68.5 ECO</div>
                      <div className="text-sm text-gray-400">45 days left</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NFT Tab */}
        <TabsContent value="nft" className="mt-4">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                NFT Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {nftItems.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/30 rounded-lg p-3"
                  >
                    <div className="aspect-square bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white font-medium text-sm">{nft.name}</h3>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={
                            nft.rarity === "Common"
                              ? "border-gray-500/30 text-gray-400"
                              : nft.rarity === "Rare"
                                ? "border-blue-500/30 text-blue-400"
                                : nft.rarity === "Epic"
                                  ? "border-purple-500/30 text-purple-400"
                                  : "border-yellow-500/30 text-yellow-400"
                          }
                        >
                          {nft.rarity}
                        </Badge>
                      </div>
                      <div className="text-green-400 font-medium text-sm">{nft.price}</div>
                      <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs">
                        Buy Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                >
                  View All NFTs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
