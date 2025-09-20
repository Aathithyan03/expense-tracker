export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  description?: string
  createdAt: string
}

const STORAGE_KEY = "expense-tracker-data"

export const expenseService = {
  getAll: (): Expense[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  create: (expense: Omit<Expense, "id" | "createdAt">): Expense => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    const expenses = expenseService.getAll()
    expenses.push(newExpense)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))

    return newExpense
  },

  delete: (id: string): boolean => {
    const expenses = expenseService.getAll()
    const filteredExpenses = expenses.filter((expense) => expense.id !== id)

    if (filteredExpenses.length !== expenses.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredExpenses))
      return true
    }

    return false
  },

  getStats: () => {
    const expenses = expenseService.getAll()
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const count = expenses.length

    // Get current month expenses
    const currentMonth = new Date().toISOString().slice(0, 7)
    const monthlyExpenses = expenses.filter((expense) => expense.date.startsWith(currentMonth))
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Get today's expenses
    const today = new Date().toISOString().split("T")[0]
    const todayExpenses = expenses.filter((expense) => expense.date === today)
    const todayTotal = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
      total,
      count,
      monthlyTotal,
      todayTotal,
    }
  },
}
