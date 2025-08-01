"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Wallet, Plus, Download, Send, ArrowDownToLine, History, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function WalletTab() {
  const [hasWallet, setHasWallet] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [activeAction, setActiveAction] = useState("overview")

  const balances = [
    { symbol: "ECO", name: "ECoin", balance: "1,247.85", usdValue: "623.92", icon: "/images/ecoin-logo.png" },
    {
      symbol: "POL",
      name: "Polygon",
      balance: "45.67",
      usdValue: "32.15",
      icon: "/placeholder.svg?height=32&width=32&text=POL",
    },
    {
      symbol: "USDT",
      name: "Tether",
      balance: "156.23",
      usdValue: "156.23",
      icon: "/placeholder.svg?height=32&width=32&text=USDT",
    },
  ]

  const transactions = [
    {
      type: "Received",
      token: "ECO",
      amount: "+125.50",
      date: "2024-01-15",
      status: "Completed",
      hash: "0x1234...5678",
    },
    { type: "Sent", token: "USDT", amount: "-50.00", date: "2024-01-14", status: "Completed", hash: "0x8765...4321" },
    { type: "Mining", token: "ECO", amount: "+98.75", date: "2024-01-14", status: "Completed", hash: "0x9876...1234" },
    {
      type: "Received",
      token: "POL",
      amount: "+15.25",
      date: "2024-01-13",
      status: "Completed",
      hash: "0x5432...8765",
    },
  ]

  const totalUsdValue = balances.reduce((sum, token) => sum + Number.parseFloat(token.usdValue), 0)

  if (!hasWallet) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-green-400 mb-2">Wallet Setup</h1>
          <p className="text-gray-400 mb-8">Create or import a wallet to get started</p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => setHasWallet(true)} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">
            <Plus className="w-5 h-5 mr-2" />
            Create New Wallet
          </Button>

          <Button
            onClick={() => setHasWallet(true)}
            variant="outline"
            className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 py-6"
          >
            <Download className="w-5 h-5 mr-2" />
            Import Existing Wallet
          </Button>
        </div>

        <Card className="bg-gray-800/50 border-green-500/20">
          <CardContent className="p-4">
            <h3 className="text-green-400 font-medium mb-2">Wallet Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Secure storage for ECO, POL, and USDT</li>
              <li>• Send and receive cryptocurrencies</li>
              <li>• Transaction history tracking</li>
              <li>• Built-in exchange features</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-400">My Wallet</h1>
          <p className="text-gray-400">Manage your crypto assets</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="text-green-400">
          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
      </div>

      {/* Total Balance */}
      <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30">
        <CardContent className="p-6 text-center">
          <div className="text-sm text-green-400 mb-2">Total Portfolio Value</div>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-white mb-2">
            {showBalance ? `$${totalUsdValue.toFixed(2)}` : "****"}
          </motion.div>
          <div className="text-green-400 text-sm">≈ {showBalance ? `${totalUsdValue * 0.85} ECO` : "****"}</div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={() => setActiveAction("send")}
          className="bg-pink-600 hover:bg-pink-700 text-white py-6 flex-col"
        >
          <Send className="w-5 h-5 mb-1" />
          Send
        </Button>
        <Button
          onClick={() => setActiveAction("receive")}
          className="bg-green-600 hover:bg-green-700 text-white py-6 flex-col"
        >
          <ArrowDownToLine className="w-5 h-5 mb-1" />
          Receive
        </Button>
        <Button
          onClick={() => setActiveAction("history")}
          variant="outline"
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 py-6 flex-col"
        >
          <History className="w-5 h-5 mb-1" />
          History
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeAction} onValueChange={setActiveAction} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="send" className="data-[state=active]:bg-green-600">
            Send
          </TabsTrigger>
          <TabsTrigger value="receive" className="data-[state=active]:bg-green-600">
            Receive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          {/* Token Balances */}
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Token Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {balances.map((token, index) => (
                  <motion.div
                    key={token.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        {token.symbol === "ECO" ? (
                          <Image src="/images/ecoin-logo.png" alt="ECoin" width={32} height={32} />
                        ) : (
                          <span className="text-xs font-bold text-white">{token.symbol}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{token.name}</div>
                        <div className="text-sm text-gray-400">{token.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{showBalance ? token.balance : "****"}</div>
                      <div className="text-sm text-gray-400">${showBalance ? token.usdValue : "****"}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="mt-4">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Send Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Select Token</label>
                <select className="w-full p-3 bg-gray-700 border border-green-500/30 rounded-lg text-white">
                  {balances.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.name} ({token.balance} {token.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Recipient Address</label>
                <Input placeholder="0x..." className="bg-gray-700 border-green-500/30 text-white" />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                <Input type="number" placeholder="0.00" className="bg-gray-700 border-green-500/30 text-white" />
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Transaction
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receive" className="mt-4">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Receive Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="w-48 h-48 bg-white rounded-lg mx-auto flex items-center justify-center">
                <div className="text-gray-800 text-sm">QR Code</div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Your Wallet Address</label>
                <div className="bg-gray-700 p-3 rounded-lg font-mono text-sm text-green-400 break-all">
                  0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4
                </div>
              </div>

              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                Copy Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Transactions */}
      <Card className="bg-gray-800/50 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 3).map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "Received"
                        ? "bg-green-500/20"
                        : tx.type === "Sent"
                          ? "bg-red-500/20"
                          : "bg-blue-500/20"
                    }`}
                  >
                    {tx.type === "Received" ? (
                      <ArrowDownToLine className="w-4 h-4 text-green-400" />
                    ) : tx.type === "Sent" ? (
                      <Send className="w-4 h-4 text-red-400" />
                    ) : (
                      <History className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {tx.type} {tx.token}
                    </div>
                    <div className="text-sm text-gray-400">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount}
                  </div>
                  <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
