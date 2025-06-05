// Atualizando tipos para autenticação baseados no TokenService.java
export interface DadosListagemQuantidade {
  quantidade: number
}

export interface DadosListagemPeriodo {
  primeiroAno: number
  ultimoAno: number
}

export interface DadosRelatorioResultados {
  ano: number
  totalPontos: number
  totalVitorias: number
  totalCorridas: number
}

export interface DadosListagemPontuacao {
  ano: number
  corrida: string
  pontos: number
}

export interface DadosListagemVitoriasPiloto {
  nome: string
  vitorias: number
}

export interface DadosListagemPiloto {
  nomeCompleto: string
  dataNascimento: string
  nacionalidade: string
}

// Enum Tipo do backend (conforme TokenService.java)
export type TipoUsuario = "ADMIN" | "PILOTO" | "ESCUDERIA"

// Interface de usuário alinhada com as claims do JWT
export interface User {
  id: number
  login: string
  tipo: TipoUsuario
  idOriginal: number
  name?: string // Campo adicional para exibição
}

export interface DadosLoginUsuario {
  login: string
  senha: string
}

// Alinhado com DadosTokenJWT.java
export interface DadosTokenJWT {
  token: string
}

export interface DadosListagemUsuario {
  id: number
  login: string
  tipo: TipoUsuario
  idOriginal: number
}

// DTOs baseados nos records Java
export interface DadosRelatorioVisaoGeral {
  totalPilotos: number
  totalEscuderias: number
  totalTemporadas: number
}

export interface DadosListagemCorridas {
  id: number
  nome: string
  data: string
  totalVoltas: number
  tempoTotalMilisegundos: number
}

export interface DadosListagemPontuacaoItem {
  nome: string
  pontos: number
}

export interface DadosListagemQuantidadeItem {
  item: string
  quantidade: number
}

export interface DadosListagemCidadeAeroporto {
  cidade: string
  codigoIATA: string
  aeroporto: string
  cidadeAeroporto: string
  distanciaKm: number
  tipo: string
}

export interface DadosCadastroEscuderia {
  referencia: string
  nome: string
  nacionalidade: string
  url: string
}

export interface DadosCadastroPiloto {
  referencia: string
  numero: number
  codigo: string
  nome: string
  sobrenome: string
  dataNascimento: string // LocalDate como string no frontend
  nacionalidade: string
  url: string
}

// Manter interfaces existentes para compatibilidade
export interface AdminStats extends DadosRelatorioVisaoGeral {}
export interface Race extends DadosListagemCorridas {}
export interface TeamPoints extends DadosListagemPontuacaoItem {}
export interface DriverPoints extends DadosListagemPontuacaoItem {}

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

export interface PilotoEstatistica extends DadosRelatorioResultados {}

export interface ConstructorData extends DadosCadastroEscuderia {}
export interface DriverData extends DadosCadastroPiloto {}
