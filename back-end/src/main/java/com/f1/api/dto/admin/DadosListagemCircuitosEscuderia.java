package com.f1.api.dto.admin;

public record DadosListagemCircuitosEscuderia(String circuito,
                                              Number qtdeCorridas,
                                              Number minVoltas,
                                              Number mediaVoltas,
                                              Number maxVoltas) {
}
