"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConsultaForenameForm } from "../forms/consulta-forename-form"
import { FileUploadForm } from "../forms/file-upload-form"
import type { User } from "@/lib/types"

interface EscuderiaActionsProps {
  user: User
}

export function EscuderiaActions({ user }: EscuderiaActionsProps) {
  const [showConsultaForm, setShowConsultaForm] = useState(false)
  const [showFileForm, setShowFileForm] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Ações - {user.name || user.login}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={() => setShowConsultaForm(true)} className="h-20 flex flex-col">
          <span className="font-semibold">Consultar por Sobrenome</span>
          <span className="text-sm opacity-80">Buscar piloto por sobrenome</span>
        </Button>

        <Button onClick={() => setShowFileForm(true)} className="h-20 flex flex-col">
          <span className="font-semibold">Inserir Novo Piloto</span>
          <span className="text-sm opacity-80">Upload de arquivo</span>
        </Button>
      </div>

      {showConsultaForm && (
        <ConsultaForenameForm onClose={() => setShowConsultaForm(false)} escuderiaId={user.idOriginal} />
      )}
      {showFileForm && <FileUploadForm onClose={() => setShowFileForm(false)} escuderiaId={user.idOriginal} />}
    </div>
  )
}
