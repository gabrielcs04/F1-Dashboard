"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { adminService } from "@/lib/services/admin-service"
import type { DadosCadastroPiloto } from "@/lib/types"
import { CheckCircle } from "lucide-react"

interface PilotoFormProps {
  onClose: () => void
}

export function PilotoForm({ onClose }: PilotoFormProps) {
  const initialFormData = {
    referencia: "",
    numero: 0,
    codigo: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    nacionalidade: "",
    url: "",
  }

  const [formData, setFormData] = useState<DadosCadastroPiloto>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await adminService.createDriver(formData)
      setSuccess(true)
      // Limpar os campos do formulário
      setFormData(initialFormData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar piloto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Piloto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referencia">Referência *</Label>
              <Input
                id="referencia"
                value={formData.referencia}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, referencia: e.target.value })
                }}
                required
                placeholder="Ex: hamilton"
              />
            </div>
            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                type="number"
                value={formData.numero}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, numero: Number.parseInt(e.target.value) || 0 })
                }}
                placeholder="Ex: 44"
              />
            </div>
            <div>
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, codigo: e.target.value })
                }}
                placeholder="Ex: HAM"
              />
            </div>
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, nome: e.target.value })
                }}
                required
                placeholder="Ex: Lewis"
              />
            </div>
            <div>
              <Label htmlFor="sobrenome">Sobrenome *</Label>
              <Input
                id="sobrenome"
                value={formData.sobrenome}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, sobrenome: e.target.value })
                }}
                required
                placeholder="Ex: Hamilton"
              />
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, dataNascimento: e.target.value })
                }}
              />
            </div>
            <div>
              <Label htmlFor="nacionalidade">Nacionalidade</Label>
              <Input
                id="nacionalidade"
                value={formData.nacionalidade}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, nacionalidade: e.target.value })
                }}
                placeholder="Ex: British"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => {
                  setSuccess(false)
                  setFormData({ ...formData, url: e.target.value })
                }}
                placeholder="Ex: https://lewishamilton.com"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default">
              <AlertDescription>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <strong>Resultado do processamento:</strong>
                  </p>
                  <p>✅ Piloto cadastrado com sucesso!</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
