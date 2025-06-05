import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { driverRef, number, code, forename, surname, dateOfBirth, nationality } = await request.json()

    // TODO: Implementar inserção real no banco com trigger
    // const db = await connectToDatabase()
    // await db.query(`
    //   INSERT INTO drivers (driverref, number, code, forename, surname, dob, nationality)
    //   VALUES ($1, $2, $3, $4, $5, $6, $7)
    // `, [driverRef, number, code, forename, surname, dateOfBirth, nationality])

    console.log("Piloto cadastrado:", { driverRef, forename, surname })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao cadastrar piloto:", error)
    return NextResponse.json({ error: "Erro ao cadastrar piloto" }, { status: 500 })
  }
}
