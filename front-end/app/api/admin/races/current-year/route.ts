import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Implementar consulta real ao banco
    // const db = await connectToDatabase()
    // const races = await db.query(`
    //   SELECT r.name, r.date, r.time,
    //          COUNT(res.resultid) as total_laps
    //   FROM races r
    //   LEFT JOIN results res ON r.raceid = res.raceid
    //   WHERE EXTRACT(YEAR FROM r.date) = EXTRACT(YEAR FROM CURRENT_DATE)
    //   GROUP BY r.raceid, r.name, r.date, r.time
    //   ORDER BY r.date
    // `)

    // Dados simulados para demonstração
    const races = [
      {
        name: "Grande Prêmio do Bahrein",
        date: "2024-03-02",
        totalLaps: 57,
        time: "1:31:44.742",
      },
      {
        name: "Grande Prêmio da Arábia Saudita",
        date: "2024-03-09",
        totalLaps: 50,
        time: "1:20:43.273",
      },
    ]

    return NextResponse.json(races)
  } catch (error) {
    console.error("Erro ao buscar corridas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
