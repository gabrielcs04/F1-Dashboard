package com.f1.api.dto.admin;

/**
 * Representa um item de pontuação com nome associado e pontos correspondentes.
 *
 * @param nome   Nome associado ao item de pontuação (ex: piloto, escuderia).
 * @param pontos Quantidade de pontos atribuída.
 */
public record DadosListagemPontuacaoItem(String nome,
                                         Number pontos) {
}
