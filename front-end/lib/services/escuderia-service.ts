import type { EscuderiaStats } from "@/lib/types"

class EscuderiaService {
  async getStats(constructorId: string): Promise<EscuderiaStats> {
    const response = await fetch(`/api/escuderia/${constructorId}/stats`)
    if (!response.ok) throw new Error("Erro ao buscar estatísticas")
    return response.json()
  }

  async getPilotsReport(constructorId: string): Promise<any[]> {
    const response = await fetch(`/api/escuderia/${constructorId}/reports/pilots`)
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async getStatusReport(constructorId: string): Promise<any[]> {
    const response = await fetch(`/api/escuderia/${constructorId}/reports/status`)
    if (!response.ok) throw new Error("Erro ao gerar relatório")
    return response.json()
  }

  async searchByForename(constructorId: string, forename: string): Promise<any[]> {
    const response = await fetch(`/api/escuderia/${constructorId}/search?forename=${encodeURIComponent(forename)}`)
    if (!response.ok) throw new Error("Erro ao buscar piloto")
    return response.json()
  }

  async uploadDrivers(constructorId: string, file: File): Promise<void> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`/api/escuderia/${constructorId}/upload-drivers`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao processar arquivo")
    }
  }
}

export const escuderiaService = new EscuderiaService()
