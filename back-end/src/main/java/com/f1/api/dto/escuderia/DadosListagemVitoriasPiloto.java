package com.f1.api.dto.escuderia;

/**
 * Representa os dados para listagem das vitórias de um piloto.
 *
 * @param nome     Nome completo do piloto.
 * @param vitorias Quantidade de vitórias conquistadas pelo piloto.
 */
public record DadosListagemVitoriasPiloto(String nome,
                                          Number vitorias) {
}
