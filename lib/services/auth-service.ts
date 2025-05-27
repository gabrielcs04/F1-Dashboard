import type { User } from "@/lib/types"

class AuthService {
  async login(login: string, password: string): Promise<User> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })

    if (!response.ok) {
      throw new Error("Credenciais inválidas")
    }

    const userData = await response.json()

    // Registrar log de login
    await this.logAccess(userData.userid)

    return userData
  }

  private async logAccess(userid: string): Promise<void> {
    try {
      await fetch("/api/users/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid }),
      })
    } catch (error) {
      console.error("Erro ao registrar log de acesso:", error)
    }
  }
}

export const authService = new AuthService()
