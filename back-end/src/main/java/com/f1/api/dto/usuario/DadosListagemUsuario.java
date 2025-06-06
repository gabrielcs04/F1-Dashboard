package com.f1.api.dto.usuario;

import com.f1.api.domain.usuario.Tipo;
import com.f1.api.domain.usuario.Usuario;

/**
 * Representa os dados essenciais para listagem de um usuário no sistema.
 *
 * @param id         Identificador único do usuário.
 * @param login      Nome de login do usuário.
 * @param tipo       Tipo do usuário (exemplo: ADMIN, PILOTO, ESCUDERIA).
 * @param idOriginal Identificador original associado ao usuário (por exemplo, ID do piloto ou escuderia relacionado).
 */
public record DadosListagemUsuario(Integer id, String login, Tipo tipo, Integer idOriginal) {

    /**
     * Construtor que cria uma instância de DadosListagemUsuario a partir de uma entidade Usuario.
     *
     * @param usuario Entidade Usuario do domínio.
     */
    public DadosListagemUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getLogin(), usuario.getTipo(), usuario.getIdOriginal());
    }

}
