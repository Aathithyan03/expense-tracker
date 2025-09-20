import { NextResponse } from "next/server"
import { getExpenseStats } from "@/lib/expenses"

export async function GET() {
  try {
    const stats = getExpenseStats()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expense stats" }, { status: 500 })
  }
}
