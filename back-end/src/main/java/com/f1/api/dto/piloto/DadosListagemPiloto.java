package com.f1.api.dto.piloto;

import com.f1.api.domain.piloto.Piloto;
import java.time.LocalDate;

/**
 * Representa os dados de listagem de um piloto, incluindo nome completo, data de nascimento e nacionalidade.
 *
 * Este record também possui um construtor que cria a instância a partir de um objeto {@link Piloto},
 * concatenando o nome e sobrenome para formar o nome completo.
 *
 * @param nomeCompleto  Nome completo do piloto (nome + sobrenome).
 * @param dataNascimento Data de nascimento do piloto.
 * @param nacionalidade Nacionalidade do piloto.
 */
public record DadosListagemPiloto(String nomeCompleto, LocalDate dataNascimento, String nacionalidade) {

    /**
     * Construtor que cria um {@code DadosListagemPiloto} a partir de uma entidade {@link Piloto}.
     *
     * @param piloto objeto Piloto do qual os dados são extraídos.
     */
    public DadosListagemPiloto(Piloto piloto) {
        this(piloto.getNome() + " " + piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade());
    }

}
