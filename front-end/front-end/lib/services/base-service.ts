import { authService } from "./auth-service"

// Classe base para todos os serviços que precisam de autenticação
export class BaseService {
  protected baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  // Método para fazer requisições autenticadas
  protected async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      ...authService.getAuthHeaders(),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Se o token expirou, faz logout e redireciona para a página de login
    if (response.status === 401) {
      authService.logout()
      window.location.href = "/"
      throw new Error("Sessão expirada")
    }

    return response
  }

  // Método para tratar erros de resposta
  protected handleResponseError(response: Response, defaultMessage: string): Promise<never> {
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json().then((data) => {
        throw new Error(data.message || defaultMessage)
      })
    }
    return response.text().then((text) => {
      throw new Error(text || defaultMessage)
    })
  }
}
