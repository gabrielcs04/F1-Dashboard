"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { User } from "@/lib/types"

interface EscuderiaReportsProps {
  user: User
}

export function EscuderiaReports({ user }: EscuderiaReportsProps) {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleReport4 = async () => {
    setLoading(true)
    try {
      const data = await escuderiaService.getPilotsReport(user.idOriginal)
      setReportData(data)
      setActiveReport("report4")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReport5 = async () => {
    setLoading(true)
    try {
      const data = await escuderiaService.getStatusReport(user.idOriginal)
      setReportData(data)
      setActiveReport("report5")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  const getColumns = () => {
    switch (activeReport) {
      case "report4":
        return [
          { key: "piloto", header: "Piloto" },
          { key: "vitorias", header: "Vitórias" },
        ]
      case "report5":
        return [
          { key: "status", header: "Status" },
          { key: "quantidade", header: "Quantidade" },
        ]
      default:
        return []
    }
  }

  const getReportTitle = () => {
    switch (activeReport) {
      case "report4":
        return "Pilotos da Escuderia e Vitórias"
      case "report5":
        return "Quantidade de Resultados por Status"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios - {user.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleReport4} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 4</span>
          <span className="text-sm text-gray-600">Pilotos e Vitórias</span>
        </Button>

        <Button variant="outline" onClick={handleReport5} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 5</span>
          <span className="text-sm text-gray-600">Resultados por Status</span>
        </Button>
      </div>

      {activeReport && (
        <Card>
          <CardHeader>
            <CardTitle>{getReportTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Carregando relatório...</div>
            ) : (
              <DataTable data={reportData} columns={getColumns()} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
