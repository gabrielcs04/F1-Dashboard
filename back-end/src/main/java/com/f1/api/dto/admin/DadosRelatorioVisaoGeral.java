package com.f1.api.dto.admin;

/**
 * Representa uma visão geral com totais agregados do sistema de Fórmula 1.
 *
 * @param totalPilotos     Quantidade total de pilotos cadastrados.
 * @param totalEscuderias  Quantidade total de escuderias cadastradas.
 * @param totalTemporadas  Quantidade total de temporadas registradas.
 */
public record DadosRelatorioVisaoGeral(Long totalPilotos,
                                       Long totalEscuderias,
                                       Long totalTemporadas) {
}
