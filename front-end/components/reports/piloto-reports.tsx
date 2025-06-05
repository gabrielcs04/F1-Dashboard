"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { pilotoService } from "@/lib/services/piloto-service"
import type { User } from "@/lib/types"

interface PilotoReportsProps {
  user: User
}

export function PilotoReports({ user }: PilotoReportsProps) {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Função: grupo5.relatorio_piloto_6(:idPiloto)
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

  // Função: grupo5.relatorio_piloto_7(:idPiloto)
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
          { key: "item", header: "Status" },
          { key: "quantidade", header: "Quantidade" },
        ]
      default:
        return []
    }
  }

  const getReportTitle = () => {
    switch (activeReport) {
      case "report6":
        return "Pontuação por Ano e Corrida"
      case "report7":
        return "Quantidade de Resultados por Status"
      default:
        return ""
    }
  }

  const getFunctionName = () => {
    switch (activeReport) {
      case "report6":
        return `grupo5.relatorio_piloto_6(${user.idOriginal})`
      case "report7":
        return `grupo5.relatorio_piloto_7(${user.idOriginal})`
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios - {user.name || user.login}</h2>
      <p className="text-sm text-gray-600">Relatórios baseados em stored procedures/functions do PostgreSQL</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleReport6} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 6</span>
          <span className="text-sm text-gray-600">Pontuação por Corrida</span>
          <Badge variant="outline" className="text-xs mt-1">
            grupo5.relatorio_piloto_6()
          </Badge>
        </Button>

        <Button variant="outline" onClick={handleReport7} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 7</span>
          <span className="text-sm text-gray-600">Resultados por Status</span>
          <Badge variant="outline" className="text-xs mt-1">
            grupo5.relatorio_piloto_7()
          </Badge>
        </Button>
      </div>

      {activeReport && (
        <Card>
          <CardHeader>
            <CardTitle>{getReportTitle()}</CardTitle>
            <Badge variant="outline" className="w-fit">
              {getFunctionName()}
            </Badge>
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
