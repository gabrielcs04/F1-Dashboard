package com.f1.api.domain.admin;

import java.util.Date;

public record DadosRelatorioCorridasAno(Integer idCorrida,
                                        String nomeCorrida,
                                        Date data,
                                        Integer totalVoltas,
                                        Long tempoTotalMilisegundos) {
}
