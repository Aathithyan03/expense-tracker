import { ProtectedRoute } from "../src/components/protected-route"
import { ExpenseDashboard } from "../src/components/expense-dashboard"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <ExpenseDashboard />
    </ProtectedRoute>
  )
}
