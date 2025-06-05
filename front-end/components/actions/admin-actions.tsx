"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EscuderiaForm } from "../forms/escuderia-form"
import { PilotoForm } from "../forms/piloto-form"

export function AdminActions() {
  const [showEscuderiaForm, setShowEscuderiaForm] = useState(false)
  const [showPilotoForm, setShowPilotoForm] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Ações Administrativas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={() => setShowEscuderiaForm(true)} className="h-20 flex flex-col">
          <span className="font-semibold">Cadastrar Escuderia</span>
          <span className="text-sm opacity-80">Adicionar nova escuderia</span>
        </Button>

        <Button onClick={() => setShowPilotoForm(true)} className="h-20 flex flex-col">
          <span className="font-semibold">Cadastrar Piloto</span>
          <span className="text-sm opacity-80">Adicionar novo piloto</span>
        </Button>
      </div>

      {showEscuderiaForm && <EscuderiaForm onClose={() => setShowEscuderiaForm(false)} />}
      {showPilotoForm && <PilotoForm onClose={() => setShowPilotoForm(false)} />}
    </div>
  )
}
