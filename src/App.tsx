"use client"

import { useState } from "react"
import { ExpenseForm } from "./components/expense-form"
import { ExpenseList } from "./components/expense-list"
import { ExpenseStats } from "./components/expense-stats"
import { Button } from "./components/ui/button"
import { Plus, BarChart3 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Toaster } from "./components/ui/toaster"
import "./App.css"

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
    setIsDialogOpen(false)
  }

  const handleExpenseDeleted = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-balance">Everyday Expense Tracker</h1>
            <p className="text-muted-foreground mt-2">Keep track of your daily spending habits</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  New Expense
                </DialogTitle>
              </DialogHeader>
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <ExpenseStats refreshTrigger={refreshTrigger} />
        </div>

        {/* Expense List */}
        <ExpenseList refreshTrigger={refreshTrigger} onExpenseDeleted={handleExpenseDeleted} />
      </div>
      <Toaster />
    </div>
  )
}

export default App
