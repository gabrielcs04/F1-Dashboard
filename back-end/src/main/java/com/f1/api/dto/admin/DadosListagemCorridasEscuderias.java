package com.f1.api.dto.admin;

/**
 * Representa os dados de listagem da quantidade de corridas disputadas por uma escuderia.
 *
 * @param escuderia   Nome da escuderia.
 * @param qtdeCorridas Quantidade total de corridas disputadas pela escuderia.
 */
public record DadosListagemCorridasEscuderias(String escuderia,
                                              Number qtdeCorridas) {
}
