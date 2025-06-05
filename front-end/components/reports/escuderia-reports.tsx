"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { escuderiaService } from "@/lib/services/escuderia-service"
import type { User } from "@/lib/types"
import { FileText, BarChart3 } from "lucide-react"

interface EscuderiaReportsProps {
  user: User
}

export function EscuderiaReports({ user }: EscuderiaReportsProps) {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  // Função: grupo5.relatorio_escuderia_4(:idEscuderia)
  const handleReport4 = async () => {
    setLoading(true)
    try {
      const data = await escuderiaService.getPilotsReport(user.idOriginal)
      setReportData(data)
      setActiveReport("report4")
      scrollToResults()
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
      scrollToResults()
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
          { key: "nome", header: "Status" },
          { key: "total", header: "Quantidade" },
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
      <h2 className="text-2xl font-bold text-gray-900">Relatórios Escuderia</h2>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <BarChart3 className="h-5 w-5" />
            Relatórios Disponíveis
          </CardTitle>
          <p className="text-sm text-gray-600">Clique para gerar relatórios da sua escuderia</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleReport4} className="h-20 flex flex-col" disabled={loading}>
              <span className="font-semibold">Pilotos e Vitórias</span>
              <span className="text-sm opacity-80">Pilotos da Escuderia</span>
            </Button>

            <Button onClick={handleReport5} className="h-20 flex flex-col" disabled={loading}>
              <span className="font-semibold">Relatório de Status</span>
              <span className="text-sm opacity-80">Resultados por Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado do Relatório */}
      {activeReport && (
        <Card ref={resultsRef}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <FileText className="h-5 w-5" />
              {getReportTitle()}
            </CardTitle>
            <Badge variant="outline" className="w-fit">
              {getFunctionName()}
            </Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="font-medium text-gray-900">Carregando relatório...</span>
                </div>
              </div>
            ) : (
              <DataTable data={reportData} columns={getColumns()} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
