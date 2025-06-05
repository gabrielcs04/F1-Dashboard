"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { User } from "@/lib/types"

interface EscuderiaReportsProps {
  user: User
}

export function EscuderiaReports({ user }: EscuderiaReportsProps) {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Função: grupo5.relatorio_escuderia_4(:idEscuderia)
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

  // Função: grupo5.relatorio_escuderia_5(:idEscuderia)
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
          { key: "nome", header: "Piloto" },
          { key: "vitorias", header: "Vitórias" },
        ]
      case "report5":
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
      case "report4":
        return "Pilotos da Escuderia e Vitórias"
      case "report5":
        return "Quantidade de Resultados por Status"
      default:
        return ""
    }
  }

  const getFunctionName = () => {
    switch (activeReport) {
      case "report4":
        return `grupo5.relatorio_escuderia_4(${user.idOriginal})`
      case "report5":
        return `grupo5.relatorio_escuderia_5(${user.idOriginal})`
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios - {user.name || user.login}</h2>
      <p className="text-sm text-gray-600">Relatórios baseados em stored procedures/functions do PostgreSQL</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleReport4} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 4</span>
          <span className="text-sm text-gray-600">Pilotos e Vitórias</span>
          <Badge variant="outline" className="text-xs mt-1">
            grupo5.relatorio_escuderia_4()
          </Badge>
        </Button>

        <Button variant="outline" onClick={handleReport5} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 5</span>
          <span className="text-sm text-gray-600">Resultados por Status</span>
          <Badge variant="outline" className="text-xs mt-1">
            grupo5.relatorio_escuderia_5()
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
