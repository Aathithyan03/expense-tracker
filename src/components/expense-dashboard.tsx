"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { LogOut, User } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import { ExpenseForm } from "./expense-form"
import { ExpenseList } from "./expense-list"
import { ExpenseStats } from "./expense-stats"
import { Toaster } from "./ui/toaster"

export function ExpenseDashboard() {
  const { user, logout } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleExpenseDeleted = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ET</span>
            </div>
            <h1 className="text-xl font-bold">Expense Tracker</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Welcome, {user?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Section */}
        <ExpenseStats refreshTrigger={refreshTrigger} />

        {/* Form and List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
          <div className="lg:col-span-2">
            <ExpenseList refreshTrigger={refreshTrigger} onExpenseDeleted={handleExpenseDeleted} />
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  )
}
