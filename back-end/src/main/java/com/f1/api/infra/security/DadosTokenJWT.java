package com.f1.api.infra.security;

/**
 * Representa um token JWT (JSON Web Token) utilizado para autenticação e autorização.
 *
 * @param token String que contém o token JWT gerado para o usuário autenticado.
 */
public record DadosTokenJWT(String token) {
}
