package com.f1.api.dto.usuario;

/**
 * Representa os dados de login fornecidos pelo usuário para autenticação.
 *
 * @param login Nome de usuário utilizado para login.
 * @param senha Senha correspondente ao login do usuário.
 */
public record DadosLoginUsuario(String login,
                                String senha) {
}
