"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/lib/services/admin-service"

export function AdminReports() {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [cityName, setCityName] = useState("")
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Função: grupo5.relatorio_admin_1()
  const handleReport1 = async () => {
    setLoading(true)
    try {
      const data = await adminService.getStatusReport()
      setReportData(data)
      setActiveReport("report1")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Função: grupo5.relatorio_admin_2(:cidade)
  const handleReport2 = async () => {
    if (!cityName.trim()) {
      alert("Por favor, digite o nome de uma cidade")
      return
    }

    setLoading(true)
    try {
      const data = await adminService.getAirportsReport(cityName)
      setReportData(data)
      setActiveReport("report2")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Relatório 3 - Mock data (implementar função no backend se necessário)
  const handleReport3 = async () => {
    setLoading(true)
    try {
      const data = await adminService.getConstructorsReport()
      setReportData(data)
      setActiveReport("report3")
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  const getColumns = () => {
    switch (activeReport) {
      case "report1":
        return [
          { key: "item", header: "Status" },
          { key: "quantidade", header: "Quantidade" },
        ]
      case "report2":
        return [
          { key: "cidade", header: "Cidade" },
          { key: "codigoIATA", header: "Código IATA" },
          { key: "aeroporto", header: "Nome do Aeroporto" },
          { key: "cidadeAeroporto", header: "Cidade do Aeroporto" },
          { key: "distanciaKm", header: "Distância (km)" },
          { key: "tipo", header: "Tipo" },
        ]
      case "report3":
        return [
          { key: "escuderia", header: "Escuderia" },
          { key: "quantidadePilotos", header: "Quantidade de Pilotos" },
          { key: "totalCorridas", header: "Total de Corridas" },
        ]
      default:
        return []
    }
  }

  const getReportTitle = () => {
    switch (activeReport) {
      case "report1":
        return "Quantidade de Resultados por Status"
      case "report2":
        return `Aeroportos próximos a ${cityName}`
      case "report3":
        return "Relatório de Escuderias e Corridas"
      default:
        return ""
    }
  }

  const getFunctionName = () => {
    switch (activeReport) {
      case "report1":
        return "grupo5.relatorio_admin_1()"
      case "report2":
        return `grupo5.relatorio_admin_2('${cityName}')`
      case "report3":
        return "Dados simulados (implementar função no backend)"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios Administrativos</h2>
      <p className="text-sm text-gray-600">Relatórios baseados em stored procedures/functions do PostgreSQL</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" onClick={handleReport1} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 1</span>
          <span className="text-sm text-gray-600">Resultados por Status</span>
          <Badge variant="secondary" className="text-xs mt-1">
            grupo5.relatorio_admin_1()
          </Badge>
        </Button>

        <div className="space-y-2">
          <Input placeholder="Nome da cidade" value={cityName} onChange={(e) => setCityName(e.target.value)} />
          <Button
            variant="outline"
            onClick={handleReport2}
            className="w-full h-16 flex flex-col"
            disabled={loading || !cityName.trim()}
          >
            <span className="font-semibold">Relatório 2</span>
            <span className="text-sm text-gray-600">Aeroportos por Cidade</span>
            <Badge variant="secondary" className="text-xs mt-1">
              grupo5.relatorio_admin_2()
            </Badge>
          </Button>
        </div>

        <Button variant="outline" onClick={handleReport3} className="h-20 flex flex-col" disabled={loading}>
          <span className="font-semibold">Relatório 3</span>
          <span className="text-sm text-gray-600">Escuderias e Corridas</span>
          <Badge variant="outline" className="text-xs mt-1">
            Mock Data
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
