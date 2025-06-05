// Enum Tipo do backend (conforme DadosListagemUsuario.java)
export enum Tipo {
  ADMIN = "ADMIN",
  PILOTO = "PILOTO",
  ESCUDERIA = "ESCUDERIA",
}

// DTOs gerais baseados nos records Java fornecidos
export interface DadosListagemQuantidade {
  quantidade: number // Integer no backend
}

export interface DadosListagemPeriodo {
  primeiroAno: number // Integer no backend
  ultimoAno: number // Integer no backend
}

export interface DadosListagemQuantidadeItem {
  nome: string
  total: number // Number no backend
}

// DTOs de usuário baseados nos records Java fornecidos
export interface DadosLoginUsuario {
  login: string
  senha: string
}

export interface DadosListagemUsuario {
  id: number // Integer no backend
  login: string
  tipo: Tipo
  idOriginal: number // Integer no backend
}

// DTOs Piloto baseados nos records Java fornecidos
export interface DadosRelatorioResultados {
  ano: number // Integer no backend
  totalPontos: number // Number no backend
  totalVitorias: number // Integer no backend
  totalCorridas: number // Integer no backend
}

export interface DadosListagemPontuacao {
  ano: number // Integer no backend
  corrida: string
  pontos: number // Number no backend
}

export interface DadosRelatorioQtdPilotos {
  qtdPilotos: number // Integer no backend
}

export interface DadosListagemPiloto {
  nomeCompleto: string
  dataNascimento: string // LocalDate será convertido para string no frontend
  nacionalidade: string
}

// DTOs Escuderia baseados nos records Java fornecidos
export interface DadosListagemVitoriasPiloto {
  nome: string
  vitorias: number // Number no backend
}

export interface DadosCadastroEscuderia {
  referencia: string
  nome: string
  nacionalidade: string
  url: string
}

export interface DadosCadastroPiloto {
  referencia: string
  numero: number // Integer no backend
  codigo: string
  nome: string
  sobrenome: string
  dataNascimento: string // LocalDate como string no frontend
  nacionalidade: string
  url: string
}

// Alinhado com DadosTokenJWT.java
export interface DadosTokenJWT {
  token: string
}

// DTOs Admin baseados nos records Java fornecidos
export interface DadosRelatorioVisaoGeral {
  totalPilotos: number // Long no backend
  totalEscuderias: number // Long no backend
  totalTemporadas: number // Long no backend
}

export interface DadosListagemCorridas {
  id: number // Integer no backend
  nome: string
  data: string // Date será convertido para string no frontend
  totalVoltas: number // Integer no backend
  tempoTotalMilisegundos: number // Long no backend
}

export interface DadosListagemPontuacaoItem {
  nome: string
  pontos: number // Number no backend
}

export interface DadosListagemCidadeAeroporto {
  cidade: string
  codigoIATA: string
  aeroporto: string
  cidadeAeroporto: string
  distanciaKm: number // Number no backend
  tipo: string
}

export interface DadosListagemPilotosEscuderias {
  escuderia: string
  qtdePilotos: number // Number no backend
}

export interface DadosListagemCorridasEscuderias {
  escuderia: string
  qtdeCorridas: number // Number no backend
}

export interface DadosListagemCircuitosEscuderia {
  circuito: string
  qtdeCorridas: number // Number no backend
  minVoltas: number // Number no backend
  mediaVoltas: number // Number no backend
  maxVoltas: number // Number no backend
}

export interface DadosListagemCorridasEscuderia {
  escuderia: string
  corrida: string
  circuito: string
  totalVoltas: number // Number no backend
  tempoTotal: number // Number no backend
}

// Interface de usuário para uso interno do frontend
export interface User {
  id: number
  login: string
  tipo: Tipo
  idOriginal: number
  name?: string // Campo adicional para exibição
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
