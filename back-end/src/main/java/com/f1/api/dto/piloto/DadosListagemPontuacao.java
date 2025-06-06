package com.f1.api.dto.piloto;

/**
 * Representa os dados de pontuação de um piloto em uma corrida específica durante um ano.
 *
 * @param ano     Ano da corrida.
 * @param corrida Nome da corrida.
 * @param pontos  Pontuação obtida pelo piloto na corrida.
 */
public record DadosListagemPontuacao(Integer ano,
                                     String corrida,
                                     Number pontos) {
}
