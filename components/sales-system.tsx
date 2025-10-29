"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Printer } from "lucide-react"

interface SaleItem {
  id: string
  medicineName: string
  quantity: number
  unitPrice: number
  total: number
}

interface Sale {
  id: string
  date: string
  items: SaleItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  status: "completed" | "pending"
}

export function SalesSystem() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "S001",
      date: "2025-10-28",
      items: [
        { id: "1", medicineName: "Aspirin", quantity: 2, unitPrice: 5.99, total: 11.98 },
        { id: "2", medicineName: "Ibuprofen", quantity: 1, unitPrice: 8.5, total: 8.5 },
      ],
      subtotal: 20.48,
      tax: 2.05,
      total: 22.53,
      paymentMethod: "Cash",
      status: "completed",
    },
  ])

  const [currentSale, setCurrentSale] = useState<SaleItem[]>([])
  const [medicineName, setMedicineName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [unitPrice, setUnitPrice] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("Cash")

  const medicines = [
    { name: "Aspirin", price: 5.99 },
    { name: "Amoxicillin", price: 12.5 },
    { name: "Ibuprofen", price: 8.5 },
    { name: "Paracetamol", price: 4.99 },
    { name: "Metformin", price: 15.0 },
  ]

  const addItemToSale = () => {
    if (!medicineName || quantity <= 0 || unitPrice <= 0) {
      alert("Please fill in all fields correctly")
      return
    }

    const newItem: SaleItem = {
      id: Date.now().toString(),
      medicineName,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
    }

    setCurrentSale([...currentSale, newItem])
    setMedicineName("")
    setQuantity(1)
    setUnitPrice(0)
  }

  const removeItemFromSale = (id: string) => {
    setCurrentSale(currentSale.filter((item) => item.id !== id))
  }

  const calculateTotals = () => {
    const subtotal = currentSale.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax
    return { subtotal, tax, total }
  }

  const completeSale = () => {
    if (currentSale.length === 0) {
      alert("Please add items to the sale")
      return
    }

    const { subtotal, tax, total } = calculateTotals()
    const newSale: Sale = {
      id: `S${String(sales.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      items: currentSale,
      subtotal,
      tax,
      total,
      paymentMethod,
      status: "completed",
    }

    setSales([newSale, ...sales])
    setCurrentSale([])
    setPaymentMethod("Cash")
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales & Billing</h1>
        <p className="text-muted-foreground mt-1">Process sales and generate invoices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border-border/50 bg-card/50">
            <h2 className="text-lg font-semibold text-foreground mb-4">New Sale</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Medicine Name</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Select or type medicine name"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    list="medicines-list"
                    className="flex-1 bg-background/50 border-border/50"
                  />
                  <datalist id="medicines-list">
                    {medicines.map((med) => (
                      <option key={med.name} value={med.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Unit Price ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number.parseFloat(e.target.value) || 0)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Total</label>
                  <div className="bg-background/50 border border-border/50 rounded-md p-2 text-foreground font-semibold">
                    ${(quantity * unitPrice).toFixed(2)}
                  </div>
                </div>
              </div>

              <Button onClick={addItemToSale} className="w-full gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Item to Sale
              </Button>
            </div>
          </Card>

          {/* Current Sale Items */}
          <Card className="p-6 border-border/50 bg-card/50">
            <h2 className="text-lg font-semibold text-foreground mb-4">Sale Items</h2>

            {currentSale.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No items added yet</p>
            ) : (
              <div className="space-y-3">
                {currentSale.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.medicineName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-foreground">${item.total.toFixed(2)}</p>
                      <Button
                        onClick={() => removeItemFromSale(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-4">
          <Card className="p-6 border-border/50 bg-card/50 sticky top-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Invoice Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%):</span>
                <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-foreground"
              >
                <option>Cash</option>
                <option>Card</option>
                <option>Check</option>
                <option>Online</option>
              </select>
            </div>

            <div className="space-y-2">
              <Button
                onClick={completeSale}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={currentSale.length === 0}
              >
                Complete Sale
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent" disabled={currentSale.length === 0}>
                <Printer className="w-4 h-4" />
                Print Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Sales History */}
      <Card className="p-6 border-border/50 bg-card/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Sales</h2>

        {sales.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No sales recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Sale ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Items</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Payment</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{sale.id}</td>
                    <td className="py-3 px-4 text-foreground">{sale.date}</td>
                    <td className="py-3 px-4 text-foreground">{sale.items.length} items</td>
                    <td className="py-3 px-4 text-foreground font-semibold">${sale.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-foreground">{sale.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
