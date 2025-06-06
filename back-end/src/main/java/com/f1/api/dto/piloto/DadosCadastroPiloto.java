package com.f1.api.dto.piloto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

/**
 * Representa os dados necessários para o cadastro de um piloto.
 *
 * @param referencia    Referência única do piloto (não pode ser nula ou vazia).
 * @param numero        Número do piloto (pode ser nulo).
 * @param codigo        Código do piloto (pode ser nulo).
 * @param nome          Nome do piloto (não pode ser nulo ou vazio).
 * @param sobrenome     Sobrenome do piloto (não pode ser nulo ou vazio).
 * @param dataNascimento Data de nascimento do piloto (pode ser nula).
 * @param nacionalidade Nacionalidade do piloto (pode ser nula).
 * @param url           URL com mais informações sobre o piloto (pode ser nula).
 */
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
