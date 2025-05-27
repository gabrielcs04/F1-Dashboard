export interface User {
  userid: string
  login: string
  tipo: "Administrador" | "Escuderia" | "Piloto"
  idOriginal: string
  name?: string
}

export interface AdminStats {
  totalPilotos: number
  totalEscuderias: number
  totalTemporadas: number
}

export interface Race {
  name: string
  date: string
  totalLaps: number
  time: string
}

export interface TeamPoints {
  name: string
  points: number
}

export interface DriverPoints {
  name: string
  points: number
}

export interface EscuderiaStats {
  vitorias: number
  totalPilotos: number
  primeiroAno: number
  ultimoAno: number
}

export interface PilotoStats {
  primeiroAno: number
  ultimoAno: number
}

export interface PilotoEstatistica {
  ano: number
  circuito: string
  pontos: number
  vitorias: number
  corridas: number
}

export interface ConstructorData {
  constructorRef: string
  name: string
  nationality: string
  url: string
}

export interface DriverData {
  driverRef: string
  number: string
  code: string
  forename: string
  surname: string
  dateOfBirth: string
  nationality: string
}
