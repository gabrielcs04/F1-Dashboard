"use client"

import { AdminActions } from "./admin-actions"
import { EscuderiaActions } from "./escuderia-actions"
import type { User } from "@/lib/types"

interface ActionsSectionProps {
  user: User
}

export function ActionsSection({ user }: ActionsSectionProps) {
  switch (user.tipo) {
    case "ADMIN":
      return <AdminActions />
    case "ESCUDERIA":
      return <EscuderiaActions user={user} />
    default:
      return null
  }
}
