"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MedicineManagement } from "./medicine-management"
import { StockManagement } from "./stock-management"
import { SalesSystem } from "./sales-system"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { LogOut, Package, ShoppingCart, BarChart3, Pill, Menu, X } from "lucide-react"

interface DashboardProps {
  user: { name: string; email: string }
  onLogout: () => void
}

type TabType = "overview" | "medicines" | "stock" | "sales" | "analytics"

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "medicines" as const, label: "Medicines", icon: Pill },
    { id: "stock" as const, label: "Stock", icon: Package },
    { id: "sales" as const, label: "Sales", icon: ShoppingCart },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen border-r border-border/50 bg-card/50 backdrop-blur z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">Rx</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground">MediShop</h1>
                <p className="text-xs text-muted-foreground">Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border/50 space-y-3">
            <div className="px-4 py-3 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="w-full gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="md:hidden border-b border-border/50 bg-card/50 backdrop-blur p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="font-semibold text-foreground">MediShop</h2>
          </div>
          <div className="w-6" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {activeTab === "overview" && <AnalyticsDashboard />}
            {activeTab === "medicines" && <MedicineManagement />}
            {activeTab === "stock" && <StockManagement />}
            {activeTab === "sales" && <SalesSystem />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
          </div>
        </div>
      </main>
    </div>
  )
}
