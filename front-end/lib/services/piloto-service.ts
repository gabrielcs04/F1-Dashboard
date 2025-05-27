import type { PilotoStats, PilotoEstatistica } from "@/lib/types"

class PilotoService {
  async getStats(driverId: string): Promise<PilotoStats> {
    const response = await fetch(`/api/piloto/${driverId}/stats`)
    if (!response.ok) throw new Error("Erro ao buscar estatísticas")
    return response.json()
  }

  async getEstatisticas(driverId: string): Promise<PilotoEstatistica[]> {
    const response = await fetch(`/api/piloto/${driverId}/statistics`)
    if (!response.ok) throw new Error("Erro ao buscar estatísticas")
    return response.json()
  }

  async getPointsReport(driverId: string): Promise<any[]> {
    const response = await fetch(`/api/piloto/${driverId}/reports/points`)
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async getStatusReport(driverId: string): Promise<any[]> {
    const response = await fetch(`/api/piloto/${driverId}/reports/status`)
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }
}

export const pilotoService = new PilotoService()
