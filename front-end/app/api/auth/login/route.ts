import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json()

    // TODO: Implementar autenticação SCRAM-SHA-256 com banco de dados
    // const db = await connectToDatabase()
    // const user = await db.query(`
    //   SELECT userid, login, tipo, idoriginal
    //   FROM users
    //   WHERE login = $1 AND password = crypt($2, password)
    // `, [login, password])

    // Simulação para demonstração
    let userData = null

    if (login === "admin" && password === "admin") {
      userData = {
        userid: "1",
        login: "admin",
        tipo: "Administrador",
        idOriginal: "admin",
        name: "Administrador do Sistema",
      }
    } else if (login.endsWith("c")) {
      userData = {
        userid: "2",
        login: login,
        tipo: "Escuderia",
        idOriginal: login.slice(0, -1),
        name: login.slice(0, -1).toUpperCase(),
      }
    } else if (login.endsWith("d")) {
      userData = {
        userid: "3",
        login: login,
        tipo: "Piloto",
        idOriginal: login.slice(0, -1),
        name: login.slice(0, -1).charAt(0).toUpperCase() + login.slice(1, -1),
      }
    }

    if (!userData) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
