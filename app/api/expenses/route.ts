import { type NextRequest, NextResponse } from "next/server"
import { getExpenses, addExpense } from "@/lib/expenses"

export async function GET() {
  try {
    const expenses = getExpenses()
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, amount, category, date, description } = body

    if (!title || !amount || !category || !date) {
      return NextResponse.json({ error: "Missing required fields: title, amount, category, date" }, { status: 400 })
    }

    const expense = addExpense({
      title,
      amount: Number.parseFloat(amount),
      category,
      date,
      description,
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
