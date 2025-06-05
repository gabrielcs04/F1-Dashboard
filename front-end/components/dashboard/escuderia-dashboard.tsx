"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { User, EscuderiaStats } from "@/lib/types"

interface EscuderiaDashboardProps {
  user: User
}

export function EscuderiaDashboard({ user }: EscuderiaDashboardProps) {
  const [stats, setStats] = useState<EscuderiaStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await escuderiaService.getStats(user.idOriginal)
        setStats(data)
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [user.idOriginal])

  if (loading) {
    return <div className="text-center py-8">Carregando dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Escuderia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vitórias</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.vitorias || 0}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_vitorias_escuderia()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pilotos Diferentes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPilotos || 0}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_qtd_pilotos_escuderia()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primeiro Ano</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.primeiroAno || "-"}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_periodo_escuderia()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Ano</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.ultimoAno || "-"}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_periodo_escuderia()
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
