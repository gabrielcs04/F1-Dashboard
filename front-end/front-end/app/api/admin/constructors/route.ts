import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { constructorRef, name, nationality, url } = await request.json()

    // TODO: Implementar inserção real no banco com trigger
    // const db = await connectToDatabase()
    // await db.query(`
    //   INSERT INTO constructors (constructorref, name, nationality, url)
    //   VALUES ($1, $2, $3, $4)
    // `, [constructorRef, name, nationality, url])

    console.log("Escuderia cadastrada:", { constructorRef, name, nationality, url })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao cadastrar escuderia:", error)
    return NextResponse.json({ error: "Erro ao cadastrar escuderia" }, { status: 500 })
  }
}
