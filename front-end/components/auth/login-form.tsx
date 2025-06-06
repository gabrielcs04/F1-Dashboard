"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Car } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { authService } from "@/lib/services/auth-service"
import type { User } from "@/lib/types"

export function LoginForm() {
  const [login, setLogin] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!login.trim() || !senha.trim()) {
      setError("Por favor, preencha todos os campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("Tentando fazer login com:", { login, senha: "***" })

      const userData = await authService.login(login, senha)

      console.log("Login bem-sucedido:", userData)
      setUser(userData)
    } catch (err) {
      console.error("Erro no login:", err)
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setLogin("")
    setSenha("")
  }

  if (user) {
    return <DashboardLayout user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Sistema Fórmula 1</CardTitle>
          <CardDescription>Faça login para acessar o sistema de gerenciamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                type="text"
                placeholder="Digite seu login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading || !login.trim() || !senha.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold mb-2">Tipos de login:</p>
            <ul className="space-y-1">
              <li>
                • <strong>Admin:</strong> admin / admin
              </li>
              <li>
                • <strong>Escuderia:</strong> [nome]_c / [nome]
              </li>
              <li>
                • <strong>Piloto:</strong> [nome]_d / [nome]
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
