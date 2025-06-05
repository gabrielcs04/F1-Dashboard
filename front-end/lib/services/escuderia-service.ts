import type {
  DadosListagemQuantidade,
  DadosListagemPeriodo,
  DadosListagemVitoriasPiloto,
  DadosListagemQuantidadeItem,
  DadosListagemPiloto,
  DadosCadastroPiloto,
  EscuderiaStats,
} from "@/lib/types"
import { authService } from "./auth-service"
import { BaseService } from "./base-service"

class EscuderiaService extends BaseService {
  // Combina as 3 funções PostgreSQL para obter estatísticas completas
  // - grupo5.obter_vitorias_escuderia(:idEscuderia)
  // - grupo5.obter_qtd_pilotos_escuderia(:idEscuderia)
  // - grupo5.obter_periodo_escuderia(:idEscuderia)
  async getStats(escuderiaId: number): Promise<EscuderiaStats> {
    try {
      // Fazendo múltiplas requisições em paralelo
      const [vitoriasResponse, pilotosResponse, periodoResponse] = await Promise.all([
        this.fetchWithAuth(`${this.baseUrl}/escuderias/${escuderiaId}/dashboard/vitorias`),
        this.fetchWithAuth(`${this.baseUrl}/escuderias/${escuderiaId}/dashboard/pilotos`),
        this.fetchWithAuth(`${this.baseUrl}/escuderias/${escuderiaId}/dashboard/periodo`),
      ])

      if (!vitoriasResponse.ok || !pilotosResponse.ok || !periodoResponse.ok) {
        throw new Error("Erro ao buscar estatísticas da escuderia")
      }

      const vitorias: DadosListagemQuantidade = await vitoriasResponse.json()
      const pilotos: DadosListagemQuantidade = await pilotosResponse.json()
      const periodo: DadosListagemPeriodo = await periodoResponse.json()

      // Combinando os resultados em um único objeto
      return {
        vitorias: vitorias.quantidade,
        totalPilotos: pilotos.quantidade,
        primeiroAno: periodo.primeiroAno,
        ultimoAno: periodo.ultimoAno,
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
      throw new Error("Erro ao buscar estatísticas da escuderia")
    }
  }

  // Função: grupo5.relatorio_escuderia_4(:idEscuderia)
  async getPilotsReport(escuderiaId: number): Promise<DadosListagemVitoriasPiloto[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/escuderias/${escuderiaId}/relatorio/vitorias-pilotos`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // Função: grupo5.relatorio_escuderia_5(:idEscuderia)
  async getStatusReport(escuderiaId: number): Promise<DadosListagemQuantidadeItem[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/escuderias/${escuderiaId}/relatorio/status`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // Consulta complexa: consultarPorSobrenomeEIdEscuderia
  async searchByForename(escuderiaId: number, sobrenome: string): Promise<DadosListagemPiloto[]> {
    const response = await this.fetchWithAuth(
      `${this.baseUrl}/escuderias/${escuderiaId}/pilotos?sobrenome=${encodeURIComponent(sobrenome)}`,
    )
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar piloto")
    }
    return response.json()
  }

  // Upload de arquivo de pilotos (método legado - mantido para compatibilidade)
  async uploadDrivers(escuderiaId: number, file: File): Promise<void> {
    const formData = new FormData()
    formData.append("file", file)

    const token = authService.getToken()
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await fetch(`${this.baseUrl}/escuderias/${escuderiaId}/upload-drivers`, {
      method: "POST",
      headers,
      body: formData,
    })

    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao processar arquivo")
    }
  }

  // INSERT INTO grupo5.driver - Endpoint específico da escuderia
  async createDriver(data: DadosCadastroPiloto): Promise<void> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/escuderias/pilotos`, {
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

export const escuderiaService = new EscuderiaService()
