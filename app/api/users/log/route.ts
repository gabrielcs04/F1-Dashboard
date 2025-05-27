import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userid } = await request.json()

    // TODO: Implementar inserção no log de usuários
    // const db = await connectToDatabase()
    // await db.query(`
    //   INSERT INTO users_log (userid, data_login, hora_login)
    //   VALUES ($1, CURRENT_DATE, CURRENT_TIME)
    // `, [userid])

    console.log(`Log de acesso registrado para usuário: ${userid}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao registrar log:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
