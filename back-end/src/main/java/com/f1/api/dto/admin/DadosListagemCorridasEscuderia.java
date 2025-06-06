package com.f1.api.dto.admin;

/**
 * Representa os dados de listagem das corridas de uma escuderia específica,
 * incluindo informações sobre a corrida, circuito e estatísticas como total de voltas e tempo total.
 *
 * @param escuderia   Nome da escuderia.
 * @param corrida     Nome da corrida.
 * @param circuito    Nome do circuito onde a corrida foi realizada.
 * @param totalVoltas Total de voltas completadas na corrida.
 * @param tempoTotal  Tempo total da corrida.
 */
public record DadosListagemCorridasEscuderia(String escuderia,
                                             String corrida,
                                             String circuito,
                                             Number totalVoltas,
                                             Number tempoTotal) {
}
