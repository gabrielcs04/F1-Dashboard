"use client"

import { AdminReports } from "./admin-reports"
import { EscuderiaReports } from "./escuderia-reports"
import { PilotoReports } from "./piloto-reports"
import type { User } from "@/lib/types"

interface ReportsSectionProps {
  user: User
}

export function ReportsSection({ user }: ReportsSectionProps) {
  switch (user.tipo) {
    case "Administrador":
      return <AdminReports />
    case "Escuderia":
      return <EscuderiaReports user={user} />
    case "Piloto":
      return <PilotoReports user={user} />
    default:
      return null
  }
}
