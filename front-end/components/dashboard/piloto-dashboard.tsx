"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { pilotoService } from "@/lib/services/piloto-service"
import type { User, PilotoStats, PilotoEstatistica } from "@/lib/types"

interface PilotoDashboardProps {
  user: User
}

export function PilotoDashboard({ user }: PilotoDashboardProps) {
  const [stats, setStats] = useState<PilotoStats | null>(null)
  const [estatisticas, setEstatisticas] = useState<PilotoEstatistica[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, estatisticasData] = await Promise.all([
          pilotoService.getStats(user.idOriginal),
          pilotoService.getEstatisticas(user.idOriginal),
        ])

        setStats(statsData)
        setEstatisticas(estatisticasData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user.idOriginal])

  if (loading) {
    return <div className="text-center py-8">Carregando dashboard...</div>
  }

  const estatisticasColumns = [
    { key: "ano", header: "Ano" },
    { key: "circuito", header: "Circuito" },
    { key: "pontos", header: "Pontos" },
    { key: "vitorias", header: "Vitórias" },
    { key: "corridas", header: "Corridas" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard - {user.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primeiro Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.primeiroAno || "-"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.ultimoAno || "-"}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas por Ano/Circuito</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={estatisticas} columns={estatisticasColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
