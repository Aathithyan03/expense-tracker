import { type NextRequest, NextResponse } from "next/server"
import { deleteExpense } from "@/lib/expenses"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const deleted = deleteExpense(id)

    if (!deleted) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Expense deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 })
  }
}
