"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/lib/services/admin-service"
import { FileText, Search, BarChart3, Car, MapPin } from "lucide-react"

export function AdminReports() {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [cityName, setCityName] = useState("")
  const [escuderiaName, setEscuderiaName] = useState("")
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

  // Função: grupo5.relatorio_admin_1()
  const handleReport1 = async () => {
    setLoading(true)
    try {
      const data = await adminService.getStatusReport()
      setReportData(data)
      setActiveReport("report1")
      scrollToResults()
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
      scrollToResults()
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Relatório 3 - Pilotos por Escuderia
  const handleReport3 = async () => {
    setLoading(true)
    try {
      const data = await adminService.getPilotosEscuderiasReport()
      setReportData(data)
      setActiveReport("report3")
      scrollToResults()
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Relatório 4 - Corridas por Escuderia
  const handleReport4 = async () => {
    setLoading(true)
    try {
      const data = await adminService.getCorridasEscuderiasReport()
      setReportData(data)
      setActiveReport("report4")
      scrollToResults()
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Relatório 5 - Circuitos por Escuderia
  const handleReport5 = async () => {
    if (!escuderiaName.trim()) {
      alert("Por favor, digite o nome de uma escuderia")
      return
    }

    setLoading(true)
    try {
      const data = await adminService.getCircuitosEscuderiaReport(escuderiaName)
      setReportData(data)
      setActiveReport("report5")
      scrollToResults()
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setLoading(false)
    }
  }

  // Relatório 6 - Corridas de uma Escuderia
  const handleReport6 = async () => {
    if (!escuderiaName.trim()) {
      alert("Por favor, digite o nome de uma escuderia")
      return
    }

    setLoading(true)
    try {
      const data = await adminService.getCorridasEscuderiaReport(escuderiaName)
      setReportData(data)
      setActiveReport("report6")
      scrollToResults()
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
          { key: "nome", header: "Status" },
          { key: "total", header: "Quantidade" },
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
          { key: "qtdePilotos", header: "Quantidade de Pilotos" },
        ]
      case "report4":
        return [
          { key: "escuderia", header: "Escuderia" },
          { key: "qtdeCorridas", header: "Quantidade de Corridas" },
        ]
      case "report5":
        return [
          { key: "circuito", header: "Circuito" },
          { key: "qtdeCorridas", header: "Qtde Corridas" },
          { key: "minVoltas", header: "Min Voltas" },
          { key: "mediaVoltas", header: "Média Voltas" },
          { key: "maxVoltas", header: "Max Voltas" },
        ]
      case "report6":
        return [
          { key: "escuderia", header: "Escuderia" },
          { key: "corrida", header: "Corrida" },
          { key: "circuito", header: "Circuito" },
          { key: "totalVoltas", header: "Total Voltas" },
          { key: "tempoTotal", header: "Tempo Total" },
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
        return "Quantidade de Pilotos por Escuderia"
      case "report4":
        return "Quantidade de Corridas por Escuderia"
      case "report5":
        return `Estatísticas de Circuitos - ${escuderiaName}`
      case "report6":
        return `Detalhes das Corridas - ${escuderiaName}`
      default:
        return ""
    }
  }

  const getFunctionName = () => {
    switch (activeReport) {
      case "report1":
        return "/admin/relatorio/status"
      case "report2":
        return `/admin/relatorio/aeroportos/${cityName}`
      case "report3":
        return "/admin/relatorio/escuderias/pilotos"
      case "report4":
        return "/admin/relatorio/escuderias/corridas"
      case "report5":
        return `/admin/relatorio/escuderias/${escuderiaName}/circuitos`
      case "report6":
        return `/admin/relatorio/escuderias/${escuderiaName}/corridas`
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Relatórios Administrativos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Relatórios Diretos - Lado Esquerdo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <BarChart3 className="h-5 w-5" />
              Relatórios Diretos
            </CardTitle>
            <p className="text-sm text-gray-600">Clique para gerar relatórios instantâneos</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <Button onClick={handleReport1} className="h-20 flex flex-col" disabled={loading}>
                <span className="font-semibold">Relatório de Status</span>
                <span className="text-sm opacity-80">Resultados por Status</span>
              </Button>

              <Button onClick={handleReport3} className="h-20 flex flex-col" disabled={loading}>
                <span className="font-semibold">Pilotos por Escuderia</span>
                <span className="text-sm opacity-80">Quantidade de Pilotos</span>
              </Button>

              <Button onClick={handleReport4} className="h-20 flex flex-col" disabled={loading}>
                <span className="font-semibold">Corridas por Escuderia</span>
                <span className="text-sm opacity-80">Quantidade de Corridas</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios com Parâmetros - Lado Direito */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Search className="h-5 w-5" />
              Relatórios com Parâmetros
            </CardTitle>
            <p className="text-sm text-gray-600">Insira os dados necessários e clique para gerar</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Relatório de Aeroportos */}
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="font-bold text-gray-900">Aeroportos por Cidade</span>
              </div>
              <Input
                placeholder="Digite o nome da cidade"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <Button onClick={handleReport2} className="w-full h-12" disabled={loading || !cityName.trim()}>
                <span className="font-semibold">Gerar Relatório de Aeroportos</span>
              </Button>
            </div>

            {/* Relatórios de Escuderia */}
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-gray-600" />
                <span className="font-bold text-gray-900">Relatórios por Escuderia</span>
              </div>
              <Input
                placeholder="Digite o nome da escuderia"
                value={escuderiaName}
                onChange={(e) => setEscuderiaName(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={handleReport5}
                  className="h-16 flex flex-col"
                  disabled={loading || !escuderiaName.trim()}
                >
                  <span className="font-semibold">Estatísticas de Circuitos</span>
                  <span className="text-xs opacity-80">Dados por circuito</span>
                </Button>

                <Button
                  onClick={handleReport6}
                  className="h-16 flex flex-col"
                  disabled={loading || !escuderiaName.trim()}
                >
                  <span className="font-semibold">Detalhes das Corridas</span>
                  <span className="text-xs opacity-80">Informações completas</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
