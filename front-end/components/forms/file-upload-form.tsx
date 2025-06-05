"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { DadosCadastroPiloto } from "@/lib/types"

interface FileUploadFormProps {
  onClose: () => void
  escuderiaId: number
}

interface ProcessResult {
  success: number
  errors: string[]
  total: number
}

export function FileUploadForm({ onClose, escuderiaId }: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ProcessResult | null>(null)

  const parseDriverLine = (line: string, lineNumber: number): DadosCadastroPiloto | null => {
    try {
      // Remove espaços em branco e divide por vírgula
      const parts = line
        .trim()
        .split(",")
        .map((part) => part.trim())

      // Validar se tem pelo menos os campos obrigatórios (6 campos mínimos)
      // Driverref, Code, Forename, Surname, Date of Birth, Nationality
      // Number é opcional
      if (parts.length < 6) {
        throw new Error(
          `Linha ${lineNumber}: Deve conter pelo menos 6 campos (Driverref, Code, Forename, Surname, Date of Birth, Nationality)`,
        )
      }

      // Ajustar para o caso de Number ser omitido completamente
      let driverRef, code, forename, surname, dateOfBirth, nationality, url
      let numberStr = ""

      if (parts.length === 6) {
        // Number foi omitido completamente
        ;[driverRef, code, forename, surname, dateOfBirth, nationality] = parts
      } else {
        // Number pode estar vazio, mas a posição existe
        ;[driverRef, numberStr, code, forename, surname, dateOfBirth, nationality, url] = parts
      }

      // Validar campos obrigatórios
      if (!driverRef) throw new Error(`Linha ${lineNumber}: Driverref é obrigatório`)
      if (!code) throw new Error(`Linha ${lineNumber}: Code é obrigatório`)
      if (!forename) throw new Error(`Linha ${lineNumber}: Forename é obrigatório`)
      if (!surname) throw new Error(`Linha ${lineNumber}: Surname é obrigatório`)
      if (!dateOfBirth) throw new Error(`Linha ${lineNumber}: Date of Birth é obrigatório`)
      if (!nationality) throw new Error(`Linha ${lineNumber}: Nationality é obrigatório`)

      // Validar e converter número (pode ser nulo)
      let numero = 0
      if (numberStr && numberStr.trim() !== "") {
        const parsedNumber = Number.parseInt(numberStr.trim())
        if (isNaN(parsedNumber)) {
          throw new Error(`Linha ${lineNumber}: Number deve ser um número válido ou vazio`)
        }
        numero = parsedNumber
      }

      // Validar formato da data (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(dateOfBirth)) {
        throw new Error(`Linha ${lineNumber}: Date of Birth deve estar no formato YYYY-MM-DD`)
      }

      return {
        referencia: driverRef,
        numero,
        codigo: code,
        nome: forename,
        sobrenome: surname,
        dataNascimento: dateOfBirth,
        nacionalidade: nationality,
        url: url || "", // URL pode ser vazia
      }
    } catch (error) {
      console.error(`Erro ao processar linha ${lineNumber}:`, error)
      throw error
    }
  }

  const processFile = async (fileContent: string): Promise<ProcessResult> => {
    const lines = fileContent.split("\n").filter((line) => line.trim() !== "")
    const result: ProcessResult = {
      success: 0,
      errors: [],
      total: lines.length,
    }

    console.log(`Processando ${lines.length} linhas do arquivo`)

    for (let i = 0; i < lines.length; i++) {
      const lineNumber = i + 1
      try {
        const pilotoData = parseDriverLine(lines[i], lineNumber)

        if (pilotoData) {
          // Chamar o endpoint específico da escuderia para cadastro de pilotos
          await escuderiaService.createDriver(pilotoData)
          result.success++
          console.log(`Linha ${lineNumber}: Piloto ${pilotoData.nome} ${pilotoData.sobrenome} cadastrado com sucesso`)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Erro desconhecido na linha ${lineNumber}`
        result.errors.push(errorMessage)
        console.error(`Erro na linha ${lineNumber}:`, error)
      }
    }

    return result
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Por favor, selecione um arquivo")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const fileContent = await file.text()
      const processResult = await processFile(fileContent)
      setResult(processResult)
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
          <div className="space-y-2 text-sm">
            <p>
              <strong>Formato do arquivo:</strong> Cada linha deve conter os dados de um piloto separados por vírgula:
            </p>
            <p>
              <strong>Campos obrigatórios:</strong> Driverref, Code, Forename, Surname, Date of Birth, Nationality
            </p>
            <p>
              <strong>Campos opcionais:</strong> Number, URL (podem ficar vazios)
            </p>
            <p>
              <strong>Exemplos:</strong>
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              hamilton,44,HAM,Lewis,Hamilton,1985-01-07,British,https://lewishamilton.com
              <br />
              verstappen,,VER,Max,Verstappen,1997-09-30,Dutch
              <br />
              leclerc,LEC,Charles,Leclerc,1997-10-16,Monégasque
            </code>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Arquivo de Pilotos</Label>
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

          {result && (
            <Alert variant={result.errors.length === 0 ? "default" : "destructive"}>
              <AlertDescription>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    {result.errors.length === 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <strong>Resultado do processamento:</strong>
                  </p>
                  <p>
                    ✅ Sucessos: {result.success}/{result.total}
                  </p>
                  {result.errors.length > 0 && (
                    <div>
                      <p>❌ Erros: {result.errors.length}</p>
                      <div className="max-h-32 overflow-y-auto text-xs mt-2">
                        {result.errors.map((error, index) => (
                          <div key={index} className="text-red-600">
                            {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AlertDescription>
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
