package com.f1.api.dto.piloto;

/**
 * Representa os dados resumidos dos resultados de um piloto em um determinado ano.
 *
 * @param ano           Ano da temporada.
 * @param totalPontos   Total de pontos conquistados pelo piloto no ano.
 * @param totalVitorias Total de vitórias do piloto no ano.
 * @param totalCorridas Total de corridas disputadas pelo piloto no ano.
 */
public record DadosRelatorioResultados(Integer ano,
                                       Number totalPontos,
                                       Integer totalVitorias,
                                       Integer totalCorridas) {
}
