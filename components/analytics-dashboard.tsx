"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"

export function AnalyticsDashboard() {
  // Sample data for charts
  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ]

  const categoryData = [
    { name: "Pain Relief", value: 35, fill: "#10b981" },
    { name: "Antibiotics", value: 25, fill: "#06b6d4" },
    { name: "Vitamins", value: 20, fill: "#f59e0b" },
    { name: "Others", value: 20, fill: "#8b5cf6" },
  ]

  const topMedicines = [
    { name: "Aspirin", sales: 450, revenue: 2695.5 },
    { name: "Amoxicillin", sales: 320, revenue: 4000 },
    { name: "Ibuprofen", sales: 280, revenue: 2380 },
    { name: "Paracetamol", sales: 210, revenue: 1047.9 },
    { name: "Metformin", sales: 150, revenue: 2250 },
  ]

  const dailyTrend = [
    { day: "Mon", transactions: 45, amount: 1250 },
    { day: "Tue", transactions: 52, amount: 1420 },
    { day: "Wed", transactions: 48, amount: 1380 },
    { day: "Thu", transactions: 61, amount: 1680 },
    { day: "Fri", transactions: 55, amount: 1520 },
    { day: "Sat", transactions: 67, amount: 1890 },
    { day: "Sun", transactions: 42, amount: 1150 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Key metrics and analytics for your medical shop</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">$24,580</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% from last month
              </p>
            </div>
            <div className="p-3 bg-primary/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-3xl font-bold text-foreground mt-2">1,245</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8.2% from last month
              </p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Inventory</p>
              <p className="text-3xl font-bold text-foreground mt-2">3,847</p>
              <p className="text-xs text-yellow-600 mt-2">12 items low on stock</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-3xl font-bold text-foreground mt-2">$19.73</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +3.1% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Revenue Trend */}
        <Card className="p-6 border-border/50 bg-card/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sales & Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 border-border/50 bg-card/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Daily Transactions */}
      <Card className="p-6 border-border/50 bg-card/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Daily Transactions</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Legend />
            <Bar dataKey="transactions" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="amount" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Medicines */}
      <Card className="p-6 border-border/50 bg-card/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Top Selling Medicines</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Medicine Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Units Sold</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Revenue</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topMedicines.map((medicine, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                  <td className="py-3 px-4 text-foreground font-medium">{medicine.name}</td>
                  <td className="py-3 px-4 text-foreground">{medicine.sales}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">${medicine.revenue.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      +{Math.floor(Math.random() * 20) + 5}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
