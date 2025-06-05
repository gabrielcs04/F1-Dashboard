"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { escuderiaService } from "@/lib/services/escuderia-service"

interface FileUploadFormProps {
  onClose: () => void
  escuderiaId: number
}

export function FileUploadForm({ onClose, escuderiaId }: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Por favor, selecione um arquivo")
      return
    }

    setLoading(true)
    setError("")

    try {
      await escuderiaService.uploadDrivers(escuderiaId, file)
      alert("Arquivo processado com sucesso!")
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar arquivo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inserir Novo Piloto via Arquivo</CardTitle>
        <CardDescription>
          Selecione um arquivo com as informações dos pilotos. Cada linha deve conter: DriverRef, Number, Code,
          Forename, Surname, Date of Birth, Nationality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Arquivo</Label>
            <Input
              id="file"
              type="file"
              accept=".txt,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
              {loading ? "Processando..." : "Processar Arquivo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
