package com.f1.api.domain.piloto;

import java.time.LocalDate;

public record DadosListagemPiloto(String nomeCompleto, LocalDate dataNascimento, String nacionalidade) {

    public DadosListagemPiloto(Piloto piloto) {
        this(piloto.getNome() + " " + piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade());
    }

}
