"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Dashboard user={user!} onLogout={handleLogout} />}
    </main>
  )
}
