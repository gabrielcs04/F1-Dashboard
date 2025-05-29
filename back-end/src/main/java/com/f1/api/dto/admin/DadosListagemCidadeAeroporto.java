package com.f1.api.dto.admin;

public record DadosListagemCidadeAeroporto(String cidade,
                                           String codigoIATA,
                                           String aeroporto,
                                           String cidadeAeroporto,
                                           Number distanciaKm,
                                           String tipo) {
}
