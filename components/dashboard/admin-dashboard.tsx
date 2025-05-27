"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Trophy } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { adminService } from "@/lib/services/admin-service"
import type { AdminStats, Race, TeamPoints, DriverPoints } from "@/lib/types"

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [races, setRaces] = useState<Race[]>([])
  const [teams, setTeams] = useState<TeamPoints[]>([])
  const [drivers, setDrivers] = useState<DriverPoints[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, racesData, teamsData, driversData] = await Promise.all([
          adminService.getStats(),
          adminService.getCurrentYearRaces(),
          adminService.getCurrentYearTeams(),
          adminService.getCurrentYearDrivers(),
        ])

        setStats(statsData)
        setRaces(racesData)
        setTeams(teamsData)
        setDrivers(driversData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Carregando dashboard...</div>
  }

  const raceColumns = [
    { key: "name", header: "Nome da Corrida" },
    { key: "date", header: "Data" },
    { key: "totalLaps", header: "Total de Voltas" },
    { key: "time", header: "Tempo Total" },
  ]

  const teamColumns = [
    { key: "name", header: "Escuderia" },
    { key: "points", header: "Pontos" },
  ]

  const driverColumns = [
    { key: "name", header: "Piloto" },
    { key: "points", header: "Pontos" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pilotos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPilotos || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Escuderias</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEscuderias || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Temporadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTemporadas || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Corridas do Ano Corrente</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={races} columns={raceColumns} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escuderias - Pontuação</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={teams} columns={teamColumns} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pilotos - Pontuação</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={drivers} columns={driverColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
