"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, Plus, Minus } from "lucide-react"

interface StockItem {
  id: string
  medicineName: string
  currentStock: number
  minimumLevel: number
  maximumLevel: number
  reorderQuantity: number
  lastRestocked: string
  status: "critical" | "low" | "optimal" | "overstocked"
}

export function StockManagement() {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: "1",
      medicineName: "Aspirin",
      currentStock: 150,
      minimumLevel: 50,
      maximumLevel: 300,
      reorderQuantity: 100,
      lastRestocked: "2025-10-15",
      status: "optimal",
    },
    {
      id: "2",
      medicineName: "Amoxicillin",
      currentStock: 15,
      minimumLevel: 50,
      maximumLevel: 200,
      reorderQuantity: 80,
      lastRestocked: "2025-09-20",
      status: "critical",
    },
    {
      id: "3",
      medicineName: "Ibuprofen",
      currentStock: 350,
      minimumLevel: 100,
      maximumLevel: 300,
      reorderQuantity: 150,
      lastRestocked: "2025-10-10",
      status: "overstocked",
    },
  ])

  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "low":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "optimal":
        return "bg-primary/20 text-primary border-primary/30"
      case "overstocked":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "critical":
        return "Critical - Reorder Immediately"
      case "low":
        return "Low Stock"
      case "optimal":
        return "Optimal Level"
      case "overstocked":
        return "Overstocked"
      default:
        return "Unknown"
    }
  }

  const handleAdjustStock = (id: string, adjustment: number) => {
    setStockItems(
      stockItems.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.currentStock + adjustment)
          let newStatus: StockItem["status"] = "optimal"

          if (newStock <= item.minimumLevel) {
            newStatus = "critical"
          } else if (newStock < item.minimumLevel * 1.5) {
            newStatus = "low"
          } else if (newStock > item.maximumLevel) {
            newStatus = "overstocked"
          }

          return {
            ...item,
            currentStock: newStock,
            status: newStatus,
            lastRestocked: new Date().toISOString().split("T")[0],
          }
        }
        return item
      }),
    )
    setSelectedItem(null)
    setAdjustmentQuantity(0)
  }

  const criticalItems = stockItems.filter((item) => item.status === "critical")
  const lowItems = stockItems.filter((item) => item.status === "low")
  const totalValue = stockItems.reduce((sum, item) => sum + item.currentStock, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stock Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage medicine stock levels</p>
      </div>

      {/* Alert Section */}
      {(criticalItems.length > 0 || lowItems.length > 0) && (
        <Card className="p-4 border-destructive/30 bg-destructive/5">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Stock Alerts</h3>
              {criticalItems.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {criticalItems.length} medicine(s) at critical level - immediate reorder required
                </p>
              )}
              {lowItems.length > 0 && (
                <p className="text-sm text-yellow-600 mt-1">{lowItems.length} medicine(s) at low stock level</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Total Items</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stockItems.length}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Total Units</p>
          <p className="text-2xl font-bold text-foreground mt-2">{totalValue}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Critical Items</p>
          <p className="text-2xl font-bold text-destructive mt-2">{criticalItems.length}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Low Stock Items</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{lowItems.length}</p>
        </Card>
      </div>

      {/* Stock Items List */}
      <div className="space-y-3">
        {stockItems.map((item) => (
          <Card key={item.id} className="p-4 border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{item.medicineName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Stock</p>
                    <p className="text-lg font-semibold text-foreground">{item.currentStock}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Min Level</p>
                    <p className="text-lg font-semibold text-foreground">{item.minimumLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Max Level</p>
                    <p className="text-lg font-semibold text-foreground">{item.maximumLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reorder Qty</p>
                    <p className="text-lg font-semibold text-foreground">{item.reorderQuantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Restocked</p>
                    <p className="text-lg font-semibold text-foreground">{item.lastRestocked}</p>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      item.status === "critical"
                        ? "bg-destructive"
                        : item.status === "low"
                          ? "bg-yellow-500"
                          : item.status === "overstocked"
                            ? "bg-blue-500"
                            : "bg-primary"
                    }`}
                    style={{
                      width: `${Math.min(100, (item.currentStock / item.maximumLevel) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Adjustment Controls */}
              <div className="flex flex-col gap-2">
                {selectedItem === item.id ? (
                  <div className="flex flex-col gap-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={adjustmentQuantity}
                      onChange={(e) => setAdjustmentQuantity(Number.parseInt(e.target.value) || 0)}
                      className="w-20 bg-background/50 border-border/50 text-sm"
                    />
                    <Button
                      onClick={() => handleAdjustStock(item.id, adjustmentQuantity)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-xs"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => setSelectedItem(null)}
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setSelectedItem(item.id)
                        setAdjustmentQuantity(item.reorderQuantity)
                      }}
                      size="sm"
                      className="gap-1 bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4" />
                      Add Stock
                    </Button>
                    <Button
                      onClick={() => handleAdjustStock(item.id, -10)}
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent"
                    >
                      <Minus className="w-4 h-4" />
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
