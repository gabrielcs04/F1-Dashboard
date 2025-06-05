import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const driverId = params.id

    // TODO: Implementar consulta real
    // const db = await connectToDatabase()
    // const statusReport = await db.query(`
    //   SELECT s.status, COUNT(res.resultid) as quantidade
    //   FROM status s
    //   JOIN results res ON s.statusid = res.statusid
    //   JOIN drivers d ON res.driverid = d.driverid
    //   WHERE d.driverref = $1
    //   GROUP BY s.statusid, s.status
    //   ORDER BY quantidade DESC
    // `, [driverId])

    // Dados simulados para demonstração
    const statusReport = [
      { status: "Finished", quantidade: 180 },
      { status: "Engine", quantidade: 12 },
      { status: "Accident", quantidade: 8 },
    ]

    return NextResponse.json(statusReport)
  } catch (error) {
    console.error("Erro ao gerar relatório de status:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
