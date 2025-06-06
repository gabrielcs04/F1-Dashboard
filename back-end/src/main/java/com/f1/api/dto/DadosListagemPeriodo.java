package com.f1.api.dto;

/**
 * Representa o período de atividade, definido pelo primeiro e último ano.
 *
 * @param primeiroAno Ano inicial do período.
 * @param ultimoAno   Ano final do período.
 */
public record DadosListagemPeriodo(Integer primeiroAno,
                                   Integer ultimoAno) {
}
