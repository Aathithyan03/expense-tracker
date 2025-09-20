"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Trash2, Calendar, DollarSign } from "lucide-react"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { expenseService, type Expense } from "../lib/expenses"

interface ExpenseListProps {
  refreshTrigger: number
  onExpenseDeleted?: () => void
}

export function ExpenseList({ refreshTrigger, onExpenseDeleted }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null)

  useEffect(() => {
    const fetchExpenses = () => {
      const expensesData = expenseService.getAll()
      // Sort by date (newest first)
      const sortedExpenses = expensesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setExpenses(sortedExpenses)
    }

    fetchExpenses()
  }, [refreshTrigger])

  const handleDelete = async (id: string) => {
    const success = expenseService.delete(id)

    if (success) {
      setExpenses(expenses.filter((expense) => expense.id !== id))
      onExpenseDeleted?.()
    }

    setDeleteExpenseId(null)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      Transportation: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Entertainment: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      Shopping: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      Bills: "bg-red-100 text-red-800 hover:bg-red-200",
      Healthcare: "bg-green-100 text-green-800 hover:bg-green-200",
      Education: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      Other: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }
    return colors[category] || colors.Other
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No expenses yet</h3>
          <p className="text-sm text-muted-foreground text-center">
            Start tracking your expenses by adding your first expense above.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Recent Expenses ({expenses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{expense.title}</h3>
                    <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(expense.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />${expense.amount.toFixed(2)}
                    </div>
                  </div>

                  {expense.description && <p className="text-sm text-muted-foreground mt-2">{expense.description}</p>}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteExpenseId(expense.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={deleteExpenseId !== null}
        onClose={() => setDeleteExpenseId(null)}
        onConfirm={() => deleteExpenseId && handleDelete(deleteExpenseId)}
        expenseName={expenses.find((e) => e.id === deleteExpenseId)?.title || ""}
      />
    </>
  )
}
