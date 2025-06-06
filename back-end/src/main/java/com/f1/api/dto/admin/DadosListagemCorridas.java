package com.f1.api.dto.admin;

import java.util.Date;

/**
 * Representa os dados para listagem de corridas de Fórmula 1.
 *
 * @param id                   Identificador único da corrida.
 * @param nome                 Nome da corrida.
 * @param data                 Data em que a corrida foi realizada.
 * @param totalVoltas          Total de voltas completadas na corrida.
 * @param tempoTotalMilisegundos Tempo total da corrida em milissegundos.
 */
public record DadosListagemCorridas(Integer id,
                                    String nome,
                                    Date data,
                                    Integer totalVoltas,
                                    Long tempoTotalMilisegundos) {
}
