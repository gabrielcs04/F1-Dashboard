import type { User, DadosTokenJWT } from "@/lib/types"
import { Tipo } from "@/lib/types"
import { debugToken } from "@/lib/utils/debug"

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  private tokenKey = "f1_auth_token"

  async login(login: string, senha: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, senha }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciais inválidas")
        }
        throw new Error(`Erro no servidor: ${response.status}`)
      }

      const tokenData: DadosTokenJWT = await response.json()

      // Debug do token (remover em produção)
      if (process.env.NODE_ENV === "development") {
        debugToken(tokenData.token)
      }

      // Armazenar o token
      localStorage.setItem(this.tokenKey, tokenData.token)

      // Buscar informações adicionais do usuário
      const userInfo = await this.fetchUserInfo(tokenData.token)

      // Decodificar o token para obter dados do usuário
      const userData = this.decodeToken(tokenData.token, userInfo.info)

      return userData
    } catch (error) {
      console.error("Erro no login:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro inesperado durante o login")
    }
  }

  async fetchUserInfo(token: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/info-usuario`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar informações do usuário: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error)
      throw error
    }
  }

  private decodeToken(token: string, userInfo?: string): User {
    try {
      // Decodificar JWT payload (base64)
      const payload = JSON.parse(atob(token.split(".")[1]))

      console.log("Token payload:", payload) // Para debug

      // Extrair claims conforme definido no TokenService.java
      // - sub: "usuario" (fixo)
      // - idOriginal: ID na tabela específica do tipo
      // - role: ADMIN, PILOTO ou ESCUDERIA
      // - iss: "API F1"
      // - exp: timestamp de expiração

      const tipoBackend = payload.role
      const tipoFrontend = this.mapTipoToFrontend(tipoBackend)
      const idOriginal = payload.idOriginal

      // Gerar um ID único para o usuário (usando idOriginal)
      const id = idOriginal

      return {
        id,
        login: userInfo || `user_${idOriginal}`,
        tipo: tipoFrontend,
        idOriginal,
        name: (userInfo || `user_${idOriginal}`).toUpperCase()
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error)
      throw new Error("Token inválido")
    }
  }

  // Mapeia o tipo do backend (ADMIN, PILOTO, ESCUDERIA) para o enum Tipo
  private mapTipoToFrontend(tipo: string): Tipo {
    // Normaliza o tipo para maiúsculas para garantir compatibilidade
    const tipoUpper = tipo.toUpperCase()

    if (tipoUpper === "ADMIN") {
      return Tipo.ADMIN
    } else if (tipoUpper === "PILOTO") {
      return Tipo.PILOTO
    } else if (tipoUpper === "ESCUDERIA") {
      return Tipo.ESCUDERIA
    }

    // Fallback para ADMIN se o tipo não for reconhecido
    console.warn(`Tipo não reconhecido: ${tipo}, usando ADMIN como fallback`)
    return Tipo.ADMIN
  }

  private generateDisplayName(login: string, tipo: Tipo): string {
    switch (tipo) {
      case Tipo.ADMIN:
        return "Administrador do Sistema"
      case Tipo.ESCUDERIA:
        return login.toUpperCase()
      case Tipo.PILOTO:
        return login.charAt(0).toUpperCase() + login.slice(1)
      default:
        return login
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const now = Date.now() / 1000
      return payload.exp > now
    } catch {
      return false
    }
  }

  getCurrentUser(): User | null {
    const token = this.getToken()
    if (!token || !this.isAuthenticated()) return null

    try {
      return this.decodeToken(token)
    } catch {
      return null
    }
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        }
  }
}

export const authService = new AuthService()
