package com.f1.api.domain.piloto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record DadosCadastroPiloto(
        @NotBlank(message = "Referência é obrigatório")
        String referencia,

        Integer numero,

        String codigo,

        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "Sobrenome é obrigatório")
        String sobrenome,

        LocalDate dataNascimento,

        String nacionalidade,

        String url
) {
}
