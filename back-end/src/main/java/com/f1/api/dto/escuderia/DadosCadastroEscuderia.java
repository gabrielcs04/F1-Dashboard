package com.f1.api.dto.escuderia;

import jakarta.validation.constraints.NotBlank;

public record DadosCadastroEscuderia(
        @NotBlank(message = "Referência é obrigatório")
        String referencia,

        @NotBlank(message = "Nome é obrigatório")
        String nome,

        String nacionalidade,

        String url
) {
}
