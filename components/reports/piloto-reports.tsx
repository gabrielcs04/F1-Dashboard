"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { pilotoService } from "@/lib/services/piloto-service"
import type { User } from "@/lib/types"

interface PilotoReportsProps {
  user: User
}

export function PilotoReports({ user }: PilotoReportsProps) {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleReport6 = async () => {
    setLoading(true)
    try {
      const data = await pilotoService.getPointsReport(user.idOriginal)
      setReportData(data)
      setActiveReport("report6")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReport7 = async () => {
    setLoading(true)
    try {
      const data = await pilotoService.getStatusReport(user.idOriginal)
      setReportData(data)
      setActiveReport("report7")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  const getColumns = () => {
    switch (activeReport) {
      case "report6":
        return [
          { key: "ano", header: "Ano" },
          { key: "corrida", header: "Corrida" },
          { key: "pontos", header: "Pontos" },
        ]
      case "report7":
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
      case "report6":
        return "Pontos Totais por Ano de Participação"
      case "report7":
        return "Quantidade de Resultados por Status"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios - {user.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleReport6} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 6</span>
          <span className="text-sm text-gray-600">Pontos por Ano</span>
        </Button>

        <Button variant="outline" onClick={handleReport7} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 7</span>
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
