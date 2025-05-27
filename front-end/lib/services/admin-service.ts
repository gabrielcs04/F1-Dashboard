import type { AdminStats, Race, TeamPoints, DriverPoints, ConstructorData, DriverData } from "@/lib/types"

class AdminService {
  async getStats(): Promise<AdminStats> {
    const response = await fetch("/api/admin/stats")
    if (!response.ok) throw new Error("Erro ao buscar estatísticas")
    return response.json()
  }

  async getCurrentYearRaces(): Promise<Race[]> {
    const response = await fetch("/api/admin/races/current-year")
    if (!response.ok) throw new Error("Erro ao buscar corridas")
    return response.json()
  }

  async getCurrentYearTeams(): Promise<TeamPoints[]> {
    const response = await fetch("/api/admin/teams/current-year")
    if (!response.ok) throw new Error("Erro ao buscar escuderias")
    return response.json()
  }

  async getCurrentYearDrivers(): Promise<DriverPoints[]> {
    const response = await fetch("/api/admin/drivers/current-year")
    if (!response.ok) throw new Error("Erro ao buscar pilotos")
    return response.json()
  }

  async getStatusReport(): Promise<any[]> {
    const response = await fetch("/api/admin/reports/status")
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async getAirportsReport(cityName: string): Promise<any[]> {
    const response = await fetch(`/api/admin/reports/airports?city=${encodeURIComponent(cityName)}`)
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async getConstructorsReport(): Promise<any[]> {
    const response = await fetch("/api/admin/reports/constructors")
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async createConstructor(data: ConstructorData): Promise<void> {
    const response = await fetch("/api/admin/constructors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao cadastrar escuderia")
    }
  }

  async createDriver(data: DriverData): Promise<void> {
    const response = await fetch("/api/admin/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao cadastrar piloto")
    }
  }
}

export const adminService = new AdminService()
