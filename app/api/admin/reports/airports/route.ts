import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")

    if (!city) {
      return NextResponse.json({ error: "Nome da cidade é obrigatório" }, { status: 400 })
    }

    // TODO: Implementar consulta real ao banco com cálculo de distância
    // const db = await connectToDatabase()
    // const airports = await db.query(`
    //   SELECT DISTINCT
    //     c.name as cidade,
    //     a.iata_code as codigoIATA,
    //     a.name as nomeAeroporto,
    //     a.municipality as cidadeAeroporto,
    //     ST_Distance(
    //       ST_Point(c.longitude, c.latitude),
    //       ST_Point(a.longitude_deg, a.latitude_deg)
    //     ) * 111.32 as distancia,
    //     a.type as tipo
    //   FROM cities c
    //   CROSS JOIN airports a
    //   WHERE c.name ILIKE $1
    //     AND a.iso_country = 'BR'
    //     AND a.type IN ('medium_airport', 'large_airport')
    //     AND ST_Distance(
    //       ST_Point(c.longitude, c.latitude),
    //       ST_Point(a.longitude_deg, a.latitude_deg)
    //     ) * 111.32 <= 100
    //   ORDER BY distancia
    // `, [`%${city}%`])

    // Dados simulados para demonstração
    const airports = [
      {
        cidade: city,
        codigoIATA: "GRU",
        nomeAeroporto: "São Paulo/Guarulhos–Governador André Franco Montoro International Airport",
        cidadeAeroporto: "São Paulo",
        distancia: 25.4,
        tipo: "large_airport",
      },
      {
        cidade: city,
        codigoIATA: "CGH",
        nomeAeroporto: "São Paulo-Congonhas Airport",
        cidadeAeroporto: "São Paulo",
        distancia: 8.2,
        tipo: "medium_airport",
      },
    ]

    return NextResponse.json(airports)
  } catch (error) {
    console.error("Erro ao gerar relatório de aeroportos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
