"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { DollarSign, TrendingUp, Calendar, Target } from "lucide-react"
import { expenseService } from "../lib/expenses"

interface ExpenseStatsProps {
  refreshTrigger: number
}

export function ExpenseStats({ refreshTrigger }: ExpenseStatsProps) {
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    monthlyTotal: 0,
    todayTotal: 0,
  })

  useEffect(() => {
    const fetchStats = () => {
      const statsData = expenseService.getStats()
      setStats(statsData)
    }

    fetchStats()
  }, [refreshTrigger])

  const statsCards = [
    {
      title: "Total Expenses",
      value: `$${stats.total.toFixed(2)}`,
      icon: DollarSign,
      description: `${stats.count} total expenses`,
    },
    {
      title: "This Month",
      value: `$${stats.monthlyTotal.toFixed(2)}`,
      icon: TrendingUp,
      description: "Current month spending",
    },
    {
      title: "Today",
      value: `$${stats.todayTotal.toFixed(2)}`,
      icon: Calendar,
      description: "Today's expenses",
    },
    {
      title: "Average/Day",
      value: `$${stats.count > 0 ? (stats.total / Math.max(stats.count, 1)).toFixed(2) : "0.00"}`,
      icon: Target,
      description: "Daily average",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
