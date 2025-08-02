"use client";

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, ShoppingCart, Wallet, BarChart3 } from "lucide-react"
import HomeTab from "./tabs/home-tab"
import ReferralTab from "./tabs/referral-tab"
import PresaleTab from "./tabs/presale-tab"
import WalletTab from "./tabs/wallet-tab"
import DashboardTab from "./tabs/dashboard-tab"

const tabs = [
  { id: "home", label: "Home", icon: Home, component: HomeTab },
  { id: "referral", label: "Referral", icon: Users, component: ReferralTab },
  { id: "presale", label: "Presale", icon: ShoppingCart, component: PresaleTab },
  { id: "wallet", label: "Wallet", icon: Wallet, component: WalletTab },
  { id: "dashboard", label: "Dashboard", icon: BarChart3, component: DashboardTab },
]

export default function TelegramMiniApp() {
  const [activeTab, setActiveTab] = useState("home")

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || HomeTab

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-green-400 overflow-hidden">
      <div className="w-full bg-gray-900/90 backdrop-blur-sm h-full flex flex-col">
        {/* Main Content - Full height minus bottom nav */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation - Fixed at bottom */}
        <div className="w-full bg-gray-800/95 backdrop-blur-sm border-t border-green-500/20 z-50">
          <div className="flex justify-around py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors relative ${
                    isActive ? "text-pink-400 bg-pink-500/10" : "text-green-400 hover:text-pink-400"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div className="absolute -top-1 w-8 h-1 bg-pink-400 rounded-full" layoutId="activeTab" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
