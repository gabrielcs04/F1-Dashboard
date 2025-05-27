import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Implementar consulta real ao banco
    // const db = await connectToDatabase()
    // const teams = await db.query(`
    //   SELECT c.name, SUM(res.points) as points
    //   FROM constructors c
    //   JOIN results res ON c.constructorid = res.constructorid
    //   JOIN races r ON res.raceid = r.raceid
    //   WHERE EXTRACT(YEAR FROM r.date) = EXTRACT(YEAR FROM CURRENT_DATE)
    //   GROUP BY c.constructorid, c.name
    //   ORDER BY points DESC
    // `)

    // Dados simulados para demonstração
    const teams = [
      { name: "Red Bull Racing", points: 860 },
      { name: "Mercedes", points: 409 },
      { name: "Ferrari", points: 406 },
      { name: "McLaren", points: 302 },
    ]

    return NextResponse.json(teams)
  } catch (error) {
    console.error("Erro ao buscar escuderias:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
