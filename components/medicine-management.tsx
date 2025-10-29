"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Search } from "lucide-react"

interface Medicine {
  id: string
  name: string
  genericName: string
  manufacturer: string
  price: number
  quantity: number
  expiryDate: string
  category: string
}

export function MedicineManagement() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Aspirin",
      genericName: "Acetylsalicylic Acid",
      manufacturer: "Bayer",
      price: 5.99,
      quantity: 150,
      expiryDate: "2025-12-31",
      category: "Pain Relief",
    },
    {
      id: "2",
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      manufacturer: "GSK",
      price: 12.5,
      quantity: 80,
      expiryDate: "2025-11-15",
      category: "Antibiotics",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Medicine, "id">>({
    name: "",
    genericName: "",
    manufacturer: "",
    price: 0,
    quantity: 0,
    expiryDate: "",
    category: "",
  })

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMedicine = () => {
    if (!formData.name || !formData.genericName || !formData.manufacturer) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      setMedicines(medicines.map((med) => (med.id === editingId ? { ...med, ...formData } : med)))
      setEditingId(null)
    } else {
      const newMedicine: Medicine = {
        id: Date.now().toString(),
        ...formData,
      }
      setMedicines([...medicines, newMedicine])
    }

    setFormData({
      name: "",
      genericName: "",
      manufacturer: "",
      price: 0,
      quantity: 0,
      expiryDate: "",
      category: "",
    })
    setShowForm(false)
  }

  const handleEdit = (medicine: Medicine) => {
    setFormData({
      name: medicine.name,
      genericName: medicine.genericName,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
      quantity: medicine.quantity,
      expiryDate: medicine.expiryDate,
      category: medicine.category,
    })
    setEditingId(medicine.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter((med) => med.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Medicine Inventory</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your medicine stock and details</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({
              name: "",
              genericName: "",
              manufacturer: "",
              price: 0,
              quantity: 0,
              expiryDate: "",
              category: "",
            })
          }}
          className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Medicine
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 sm:p-6 border-border/50 bg-card/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {editingId ? "Edit Medicine" : "Add New Medicine"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Medicine Name *</label>
              <Input
                placeholder="e.g., Aspirin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Generic Name *</label>
              <Input
                placeholder="e.g., Acetylsalicylic Acid"
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Manufacturer *</label>
              <Input
                placeholder="e.g., Bayer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <Input
                placeholder="e.g., Pain Relief"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price ($)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
              <Input
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button onClick={handleAddMedicine} className="bg-primary hover:bg-primary/90">
              {editingId ? "Update Medicine" : "Add Medicine"}
            </Button>
            <Button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              variant="outline"
              className="bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, generic name, or manufacturer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-background/50 border-border/50"
        />
      </div>

      <div className="grid gap-4">
        {filteredMedicines.length === 0 ? (
          <Card className="p-8 text-center border-border/50 bg-card/50">
            <p className="text-muted-foreground">No medicines found. Add your first medicine to get started.</p>
          </Card>
        ) : (
          filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="p-4 border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{medicine.name}</h3>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {medicine.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generic: {medicine.genericName} • Manufacturer: {medicine.manufacturer}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-lg font-semibold text-foreground">${medicine.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>
                      <p
                        className={`text-lg font-semibold ${medicine.quantity < 20 ? "text-destructive" : "text-primary"}`}
                      >
                        {medicine.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expiry</p>
                      <p className="text-lg font-semibold text-foreground text-sm">{medicine.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="text-lg font-semibold text-foreground">
                        ${(medicine.price * medicine.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => handleEdit(medicine)}
                    size="sm"
                    variant="outline"
                    className="bg-transparent flex-1 sm:flex-none"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(medicine.id)}
                    size="sm"
                    variant="outline"
                    className="bg-transparent text-destructive hover:bg-destructive/10 flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
