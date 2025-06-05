import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const constructorId = params.id
    const { searchParams } = new URL(request.url)
    const forename = searchParams.get("forename")

    if (!forename) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
    }

    // TODO: Implementar consulta real
    // const db = await connectToDatabase()
    // const pilots = await db.query(`
    //   SELECT DISTINCT d.forename, d.surname, d.dob as dateOfBirth, d.nationality
    //   FROM drivers d
    //   JOIN results res ON d.driverid = res.driverid
    //   JOIN constructors c ON res.constructorid = c.constructorid
    //   WHERE c.constructorref = $1 AND d.forename ILIKE $2
    //   ORDER BY d.surname, d.forename
    // `, [constructorId, `%${forename}%`])

    // Dados simulados para demonstração
    const pilots = [
      {
        forename: forename,
        surname: "Silva",
        dateOfBirth: "1990-05-15",
        nationality: "Brazilian",
      },
    ]

    return NextResponse.json(pilots)
  } catch (error) {
    console.error("Erro ao buscar piloto:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
