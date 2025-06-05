import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Implementar consulta real ao banco
    // const db = await connectToDatabase()
    // const statusReport = await db.query(`
    //   SELECT s.status, COUNT(res.resultid) as quantidade
    //   FROM status s
    //   LEFT JOIN results res ON s.statusid = res.statusid
    //   GROUP BY s.statusid, s.status
    //   ORDER BY quantidade DESC
    // `)

    // Dados simulados para demonstração
    const statusReport = [
      { status: "Finished", quantidade: 15420 },
      { status: "Accident", quantidade: 1876 },
      { status: "Engine", quantidade: 1245 },
      { status: "Gearbox", quantidade: 987 },
    ]

    return NextResponse.json(statusReport)
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
