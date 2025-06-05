package com.f1.api.dto.admin;

public record DadosListagemCorridasEscuderia(String escuderia,
                                             String corrida,
                                             String circuito,
                                             Number totalVoltas,
                                             Number tempoTotal) {
}
