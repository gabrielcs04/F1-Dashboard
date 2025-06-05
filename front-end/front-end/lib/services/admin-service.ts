import type {
  DadosRelatorioVisaoGeral,
  DadosListagemCorridas,
  DadosListagemPontuacaoItem,
  DadosListagemQuantidadeItem,
  DadosListagemCidadeAeroporto,
  DadosCadastroEscuderia,
  DadosCadastroPiloto,
} from "@/lib/types"
import { BaseService } from "./base-service"

class AdminService extends BaseService {
  // Função: grupo5.obter_visao_geral()
  async getStats(): Promise<DadosRelatorioVisaoGeral> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/dashboard/visao-geral`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar estatísticas")
    }
    return response.json()
  }

  // Função: grupo5.obter_corridas_ano(:ano)
  async getRacesByYear(year: number): Promise<DadosListagemCorridas[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/dashboard/corridas/${year}`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar corridas do ano")
    }
    return response.json()
  }

  // Função: grupo5.obter_escuderias_ano(:ano)
  async getTeamsByYear(year: number): Promise<DadosListagemPontuacaoItem[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/dashboard/escuderias/${year}`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar escuderias do ano")
    }
    return response.json()
  }

  // Função: grupo5.obter_pilotos_ano(:ano)
  async getDriversByYear(year: number): Promise<DadosListagemPontuacaoItem[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/dashboard/pilotos/${year}`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao buscar pilotos do ano")
    }
    return response.json()
  }

  // Função: grupo5.relatorio_admin_1()
  async getStatusReport(): Promise<DadosListagemQuantidadeItem[]> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/relatorio/status`)
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // Função: grupo5.relatorio_admin_2(:cidade)
  async getAirportsReport(cityName: string): Promise<DadosListagemCidadeAeroporto[]> {
    const response = await this.fetchWithAuth(
      `${this.baseUrl}/admin/relatorio/aeroportos/${encodeURIComponent(cityName)}`,
    )
    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao gerar relatório")
    }
    return response.json()
  }

  // Métodos auxiliares para o dashboard
  async getCurrentYearRaces(): Promise<DadosListagemCorridas[]> {
    const currentYear = new Date().getFullYear()
    return this.getRacesByYear(currentYear)
  }

  async getCurrentYearTeams(): Promise<DadosListagemPontuacaoItem[]> {
    const currentYear = new Date().getFullYear()
    return this.getTeamsByYear(currentYear)
  }

  async getCurrentYearDrivers(): Promise<DadosListagemPontuacaoItem[]> {
    const currentYear = new Date().getFullYear()
    return this.getDriversByYear(currentYear)
  }

  // Trigger para inserir escuderia
  async createConstructor(data: DadosCadastroEscuderia): Promise<void> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/escuderias`, {
      method: "POST",
      body: JSON.stringify({
        referencia: data.referencia,
        nome: data.nome,
        nacionalidade: data.nacionalidade,
        url: data.url,
      }),
    })

    if (!response.ok) {
      return this.handleResponseError(response, "Erro ao cadastrar escuderia")
    }
  }

  // Trigger para inserir piloto
  async createDriver(data: DadosCadastroPiloto): Promise<void> {
    const response = await this.fetchWithAuth(`${this.baseUrl}/admin/pilotos`, {
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

export const adminService = new AdminService()
