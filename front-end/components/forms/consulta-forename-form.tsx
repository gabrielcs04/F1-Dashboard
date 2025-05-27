"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { escuderiaService } from "@/lib/services/escuderia-service"

interface ConsultaForenameFormProps {
  onClose: () => void
  escuderiaId: string
}

export function ConsultaForenameForm({ onClose, escuderiaId }: ConsultaForenameFormProps) {
  const [forename, setForename] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await escuderiaService.searchByForename(escuderiaId, forename)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar piloto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultar Piloto por Forename</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Label htmlFor="forename">Nome do Piloto</Label>
            <Input
              id="forename"
              value={forename}
              onChange={(e) => setForename(e.target.value)}
              placeholder="Digite o nome do piloto"
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
                    <strong>Nome:</strong> {pilot.forename} {pilot.surname}
                  </p>
                  <p>
                    <strong>Data de Nascimento:</strong> {pilot.dateOfBirth}
                  </p>
                  <p>
                    <strong>Nacionalidade:</strong> {pilot.nationality}
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
