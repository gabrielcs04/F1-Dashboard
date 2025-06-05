"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { adminService } from "@/lib/services/admin-service"

interface PilotoFormProps {
  onClose: () => void
}

export function PilotoForm({ onClose }: PilotoFormProps) {
  const [formData, setFormData] = useState({
    referencia: "",
    numero: 0,
    codigo: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    nacionalidade: "",
    url: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await adminService.createDriver(formData)
      alert("Piloto cadastrado com sucesso!")
      onClose()
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
              <Label htmlFor="referencia">Referência</Label>
              <Input
                id="referencia"
                value={formData.referencia}
                onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                type="number"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input
                id="sobrenome"
                value={formData.sobrenome}
                onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nacionalidade">Nacionalidade</Label>
              <Input
                id="nacionalidade"
                value={formData.nacionalidade}
                onChange={(e) => setFormData({ ...formData, nacionalidade: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
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
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
