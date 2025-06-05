"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { DadosListagemPiloto } from "@/lib/types"

interface ConsultaForenameFormProps {
  onClose: () => void
  escuderiaId: number
}

export function ConsultaForenameForm({ onClose, escuderiaId }: ConsultaForenameFormProps) {
  const [sobrenome, setSobrenome] = useState("")
  const [results, setResults] = useState<DadosListagemPiloto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await escuderiaService.searchByForename(escuderiaId, sobrenome)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar piloto")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR")
    } catch {
      return dateString
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultar Piloto por Sobrenome</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Label htmlFor="sobrenome">Sobrenome do Piloto</Label>
            <Input
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Digite o sobrenome do piloto"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Resultados:</h4>
            <div className="space-y-2">
              {results.map((pilot, index) => (
                <div key={index} className="p-2 border rounded">
                  <p>
                    <strong>Nome:</strong> {pilot.nomeCompleto}
                  </p>
                  <p>
                    <strong>Data de Nascimento:</strong> {formatDate(pilot.dataNascimento)}
                  </p>
                  <p>
                    <strong>Nacionalidade:</strong> {pilot.nacionalidade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
