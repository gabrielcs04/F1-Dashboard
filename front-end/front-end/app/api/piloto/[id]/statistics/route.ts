import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const driverId = params.id

    // TODO: Implementar consulta real com funções PL/SQL
    // const db = await connectToDatabase()
    // const statistics = await db.query(`
    //   SELECT
    //     EXTRACT(YEAR FROM r.date) as ano,
    //     c.name as circuito,
    //     SUM(res.points) as pontos,
    //     COUNT(CASE WHEN res.position = 1 THEN 1 END) as vitorias,
    //     COUNT(res.resultid) as corridas
    //   FROM results res
    //   JOIN races r ON res.raceid = r.raceid
    //   JOIN circuits c ON r.circuitid = c.circuitid
    //   JOIN drivers d ON res.driverid = d.driverid
    //   WHERE d.driverref = $1
    //   GROUP BY EXTRACT(YEAR FROM r.date), c.circuitid, c.name
    //   ORDER BY ano DESC, circuito
    // `, [driverId])

    // Dados simulados para demonstração
    const statistics = [
      {
        ano: 2024,
        circuito: "Monaco",
        pontos: 25,
        vitorias: 1,
        corridas: 1,
      },
      {
        ano: 2024,
        circuito: "Silverstone",
        pontos: 18,
        vitorias: 0,
        corridas: 1,
      },
    ]

    return NextResponse.json(statistics)
  } catch (error) {
    console.error("Erro ao buscar estatísticas do piloto:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
