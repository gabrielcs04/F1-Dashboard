"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { AdminDashboard } from "./admin-dashboard"
import { EscuderiaDashboard } from "./escuderia-dashboard"
import { PilotoDashboard } from "./piloto-dashboard"
import { ReportsSection } from "../reports/reports-section"
import { ActionsSection } from "../actions/actions-section"
import type { User } from "@/lib/types"

interface DashboardLayoutProps {
  user: User
  onLogout: () => void
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "reports" | "actions">("dashboard")

  const renderDashboard = () => {
    switch (user.tipo) {
      case "ADMIN":
        return <AdminDashboard />
      case "ESCUDERIA":
        return <EscuderiaDashboard user={user} />
      case "PILOTO":
        return <PilotoDashboard user={user} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-red-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Sistema Fórmula 1</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.tipo}: {user.name || user.login}
              </span>
              <Button variant="outline" onClick={onLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 mb-8">
          <Button
            variant={currentView === "dashboard" ? "default" : "outline"}
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </Button>
          <Button variant={currentView === "reports" ? "default" : "outline"} onClick={() => setCurrentView("reports")}>
            Relatórios
          </Button>
          {user.tipo !== "PILOTO" && (
            <Button
              variant={currentView === "actions" ? "default" : "outline"}
              onClick={() => setCurrentView("actions")}
            >
              Ações
            </Button>
          )}
        </nav>

        {currentView === "dashboard" && renderDashboard()}
        {currentView === "reports" && <ReportsSection user={user} />}
        {currentView === "actions" && user.tipo !== "PILOTO" && <ActionsSection user={user} />}
      </div>
    </div>
  )
}
