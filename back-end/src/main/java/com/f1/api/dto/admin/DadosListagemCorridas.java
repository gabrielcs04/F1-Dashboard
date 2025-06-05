package com.f1.api.dto.admin;

import java.util.Date;

public record DadosListagemCorridas(Integer id,
                                    String nome,
                                    Date data,
                                    Integer totalVoltas,
                                    Long tempoTotalMilisegundos) {
}
