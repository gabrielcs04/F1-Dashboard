import type { User, DadosLoginUsuario, DadosTokenJWT, TipoUsuario } from "@/lib/types"

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  private tokenKey = "f1_auth_token"

  async login(login: string, senha: string): Promise<User> {
    const loginData: DadosLoginUsuario = { login, senha }

    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginData),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciais inválidas")
      }
      throw new Error("Erro no servidor")
    }

    const tokenData: DadosTokenJWT = await response.json()

    // Armazenar o token
    localStorage.setItem(this.tokenKey, tokenData.token)

    // Decodificar o token para obter dados do usuário
    const userData = this.decodeToken(tokenData.token)

    // Registrar log de login
    await this.logAccess(userData.id.toString())

    return userData
  }

  private decodeToken(token: string): User {
    try {
      // Decodificar JWT payload (base64)
      const payload = JSON.parse(atob(token.split(".")[1]))

      // Extrair claims conforme definido no TokenService.java
      // - sub: "usuario" (fixo)
      // - idOriginal: ID na tabela específica do tipo
      // - role: ADMIN, PILOTO ou ESCUDERIA

      const tipoBackend = payload.role
      const tipoFrontend = this.mapTipoToFrontend(tipoBackend)
      const idOriginal = payload.idOriginal

      // Gerar um ID único para o usuário (pode ser o próprio idOriginal)
      const id = payload.id || idOriginal

      return {
        id,
        login: payload.login || payload.sub,
        tipo: tipoFrontend,
        idOriginal,
        name: this.generateDisplayName(payload.login || "usuario", tipoFrontend),
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error)
      throw new Error("Token inválido")
    }
  }

  // Mapeia o tipo do backend (ADMIN, PILOTO, ESCUDERIA) para o formato do frontend
  private mapTipoToFrontend(tipo: string): TipoUsuario {
    // Normaliza o tipo para maiúsculas para garantir compatibilidade
    const tipoUpper = tipo.toUpperCase()

    if (tipoUpper === "ADMIN") {
      return "ADMIN"
    } else if (tipoUpper === "PILOTO") {
      return "PILOTO"
    } else if (tipoUpper === "ESCUDERIA") {
      return "ESCUDERIA"
    }

    // Fallback para ADMIN se o tipo não for reconhecido
    console.warn(`Tipo não reconhecido: ${tipo}, usando ADMIN como fallback`)
    return "ADMIN"
  }

  private generateDisplayName(login: string, tipo: TipoUsuario): string {
    switch (tipo) {
      case "ADMIN":
        return "Administrador do Sistema"
      case "ESCUDERIA":
        return login.toUpperCase()
      case "PILOTO":
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

  private async logAccess(userid: string): Promise<void> {
    try {
      const token = this.getToken()
      await fetch(`${this.baseUrl}/users/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userid }),
      })
    } catch (error) {
      console.error("Erro ao registrar log de acesso:", error)
    }
  }

  // Método para adicionar token nas requisições
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
