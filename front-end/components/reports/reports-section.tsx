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
    case "ADMIN":
      return <AdminReports />
    case "ESCUDERIA":
      return <EscuderiaReports user={user} />
    case "PILOTO":
      return <PilotoReports user={user} />
    default:
      return null
  }
}
