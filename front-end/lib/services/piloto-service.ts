import type {
  DadosListagemPeriodo,
  DadosRelatorioResultados,
  DadosListagemPontuacao,
  DadosListagemQuantidadeItem,
  PilotoStats,
  DadosCadastroPiloto,
} from "@/lib/types"
import { BaseService } from "./base-service"

class PilotoService extends BaseService {
  // Função: grupo5.obter_periodo_piloto(:idPiloto)
  async getStats(pilotoId: number): Promise<PilotoStats> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/pilotos/${pilotoId}/dashboard/periodo`)

      if (!response.ok) {
        return this.handleResponseError(response, "Erro ao buscar estatísticas do piloto")
      }

      const periodo: DadosListagemPeriodo = await response.json()

      return {
        primeiroAno: periodo.primeiroAno,
        ultimoAno: periodo.ultimoAno,
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
      throw new Error("Erro ao buscar estatísticas do piloto")
    }
  }

  // Função: grupo5.obter_resultado_ano_piloto(:idPiloto)
  async getEstatisticas(pilotoId: number): Promise<DadosRelatorioResultados[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/pilotos/${pilotoId}/dashboard/resultados`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar estatísticas")
    }
    return response.json()
  }

  // Função: grupo5.relatorio_piloto_6(:idPiloto)
  async getPointsReport(pilotoId: number): Promise<DadosListagemPontuacao[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/pilotos/${pilotoId}/relatorio/pontuacao`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // Função: grupo5.relatorio_piloto_7(:idPiloto)
  async getStatusReport(pilotoId: number): Promise<DadosListagemQuantidadeItem[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/pilotos/${pilotoId}/relatorio/status`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // INSERT INTO grupo5.driver
  async createDriver(data: DadosCadastroPiloto): Promise<void> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/pilotos`, {
      method: "POST",
      body: JSON.stringify({
        referencia: data.referencia,
        numero: data.numero,
        codigo: data.codigo,
        nome: data.nome,
        sobrenome: data.sobrenome,
        dataNascimento: data.dataNascimento,
        nacionalidade: data.nacionalidade,
        url: data.url,
      }),
    })

    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao cadastrar piloto")
    }
  }
}

export const pilotoService = new PilotoService()
