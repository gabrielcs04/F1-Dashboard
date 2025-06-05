// Utilitário para debug do token JWT
export function debugToken(token: string) {
  try {
    const [header, payload, signature] = token.split(".")

    const decodedHeader = JSON.parse(atob(header))
    const decodedPayload = JSON.parse(atob(payload))

    return { header: decodedHeader, payload: decodedPayload }
  } catch (error) {
    console.error("Erro ao fazer debug do token:", error)
    return null
  }
}

// Função para verificar se o token está expirado
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const now = Date.now() / 1000
    return payload.exp < now
  } catch {
    return true
  }
}
