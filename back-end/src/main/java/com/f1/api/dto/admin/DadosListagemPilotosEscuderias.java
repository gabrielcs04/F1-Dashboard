package com.f1.api.dto.admin;

/**
 * Representa os dados de listagem da quantidade de pilotos associados a uma escuderia.
 *
 * @param escuderia  Nome da escuderia.
 * @param qtdePilotos Quantidade total de pilotos da escuderia.
 */
public record DadosListagemPilotosEscuderias(String escuderia,
                                             Number qtdePilotos) {
}
