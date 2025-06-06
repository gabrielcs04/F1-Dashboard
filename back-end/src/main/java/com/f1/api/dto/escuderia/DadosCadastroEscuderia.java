package com.f1.api.dto.escuderia;

import jakarta.validation.constraints.NotBlank;

/**
 * Representa os dados necessários para o cadastro de uma escuderia.
 *
 * @param referencia    Referência única da escuderia (não pode ser nula ou vazia).
 * @param nome          Nome da escuderia (não pode ser nulo ou vazio).
 * @param nacionalidade Nacionalidade da escuderia (opcional).
 * @param url           URL com mais informações sobre a escuderia (opcional).
 */
public record DadosCadastroEscuderia(
        @NotBlank(message = "Referência é obrigatório")
        String referencia,

        @NotBlank(message = "Nome é obrigatório")
        String nome,

        String nacionalidade,

        String url
) {
}
