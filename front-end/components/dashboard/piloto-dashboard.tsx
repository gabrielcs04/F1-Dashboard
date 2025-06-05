"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { pilotoService } from "@/lib/services/piloto-service"
import type { User, PilotoStats, DadosRelatorioResultados } from "@/lib/types"

interface PilotoDashboardProps {
  user: User
}

export function PilotoDashboard({ user }: PilotoDashboardProps) {
  const [stats, setStats] = useState<PilotoStats | null>(null)
  const [estatisticas, setEstatisticas] = useState<DadosRelatorioResultados[]>([])
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
    { key: "totalPontos", header: "Total de Pontos" },
    { key: "totalVitorias", header: "Total de Vitórias" },
    { key: "totalCorridas", header: "Total de Corridas" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Piloto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primeiro Ano</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.primeiroAno || "-"}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_periodo_piloto()
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
              grupo5.obter_periodo_piloto()
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados por Ano</CardTitle>
          <Badge variant="outline" className="w-fit">
            grupo5.obter_resultado_ano_piloto({user.idOriginal})
          </Badge>
        </CardHeader>
        <CardContent>
          <DataTable data={estatisticas} columns={estatisticasColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
