"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Trophy, Calendar } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/lib/services/admin-service"
import type { DadosRelatorioVisaoGeral, DadosListagemCorridas, DadosListagemPontuacaoItem } from "@/lib/types"

export function AdminDashboard() {
  const [stats, setStats] = useState<DadosRelatorioVisaoGeral | null>(null)
  const [races, setRaces] = useState<DadosListagemCorridas[]>([])
  const [teams, setTeams] = useState<DadosListagemPontuacaoItem[]>([])
  const [drivers, setDrivers] = useState<DadosListagemPontuacaoItem[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const statsData = await adminService.getStats()
        setStats(statsData)
        await loadYearData(selectedYear)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const loadYearData = async (year: number) => {
    try {
      setLoading(true)
      const [racesData, teamsData, driversData] = await Promise.all([
        adminService.getRacesByYear(year),
        adminService.getTeamsByYear(year),
        adminService.getDriversByYear(year),
      ])

      setRaces(racesData)
      setTeams(teamsData)
      setDrivers(driversData)
    } catch (error) {
      console.error("Erro ao carregar dados do ano:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleYearChange = async () => {
    await loadYearData(selectedYear)
  }

  if (loading && !stats) {
    return <div className="text-center py-8">Carregando dashboard...</div>
  }

  const raceColumns = [
    { key: "nome", header: "Nome da Corrida" },
    { key: "data", header: "Data" },
    { key: "totalVoltas", header: "Total de Voltas" },
    { key: "tempoTotalMilisegundos", header: "Tempo Total (ms)" },
  ]

  const teamColumns = [
    { key: "nome", header: "Escuderia" },
    { key: "pontos", header: "Pontos" },
  ]

  const driverColumns = [
    { key: "nome", header: "Piloto" },
    { key: "pontos", header: "Pontos" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h2>
      <p className="text-sm text-gray-600">Estatísticas baseadas em stored procedures/functions do PostgreSQL</p>

      {/* Estatísticas Gerais - Função: grupo5.obter_visao_geral() */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pilotos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPilotos || 0}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_visao_geral()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Escuderias</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEscuderias || 0}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_visao_geral()
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Temporadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTemporadas || 0}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              grupo5.obter_visao_geral()
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Seletor de Ano */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Dados por Ano
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="year">Ano:</Label>
              <Input
                id="year"
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-24"
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>
            <Button onClick={handleYearChange} disabled={loading}>
              {loading ? "Carregando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dados do Ano Selecionado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corridas - Função: grupo5.obter_corridas_ano(:ano) */}
        <Card>
          <CardHeader>
            <CardTitle>Corridas de {selectedYear}</CardTitle>
            <Badge variant="outline" className="w-fit">
              grupo5.obter_corridas_ano({selectedYear})
            </Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Carregando corridas...</div>
            ) : (
              <DataTable data={races} columns={raceColumns} />
            )}
          </CardContent>
        </Card>

        {/* Escuderias - Função: grupo5.obter_escuderias_ano(:ano) */}
        <Card>
          <CardHeader>
            <CardTitle>Escuderias - Pontuação {selectedYear}</CardTitle>
            <Badge variant="outline" className="w-fit">
              grupo5.obter_escuderias_ano({selectedYear})
            </Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Carregando escuderias...</div>
            ) : (
              <DataTable data={teams} columns={teamColumns} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pilotos - Função: grupo5.obter_pilotos_ano(:ano) */}
      <Card>
        <CardHeader>
          <CardTitle>Pilotos - Pontuação {selectedYear}</CardTitle>
          <Badge variant="outline" className="w-fit">
            grupo5.obter_pilotos_ano({selectedYear})
          </Badge>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando pilotos...</div>
          ) : (
            <DataTable data={drivers} columns={driverColumns} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
