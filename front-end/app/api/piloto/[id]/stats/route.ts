import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const driverId = params.id

    // TODO: Implementar funções PL/SQL
    // const db = await connectToDatabase()
    // const stats = await db.query(`
    //   SELECT
    //     get_driver_first_year($1) as primeiroAno,
    //     get_driver_last_year($1) as ultimoAno
    // `, [driverId])

    // Dados simulados para demonstração
    const stats = {
      primeiroAno: 2007,
      ultimoAno: 2024,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erro ao buscar estatísticas do piloto:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
