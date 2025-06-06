package com.f1.api.dto.admin;

/**
 * Representa os dados para listagem de informações sobre circuitos relacionados a uma escuderia.
 *
 * @param circuito     Nome do circuito.
 * @param qtdeCorridas Quantidade de corridas realizadas pela escuderia nesse circuito.
 * @param minVoltas    Número mínimo de voltas completadas pela escuderia em corridas nesse circuito.
 * @param mediaVoltas  Número médio de voltas completadas pela escuderia em corridas nesse circuito.
 * @param maxVoltas    Número máximo de voltas completadas pela escuderia em corridas nesse circuito.
 */
public record DadosListagemCircuitosEscuderia(String circuito,
                                              Number qtdeCorridas,
                                              Number minVoltas,
                                              Number mediaVoltas,
                                              Number maxVoltas) {
}
