package com.f1.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.f1.api.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Serviço responsável pela criação e validação de tokens JWT para autenticação.
 *
 * <p>Utiliza o algoritmo HMAC256 com uma chave secreta configurada externamente para garantir a integridade
 * e autenticidade dos tokens.</p>
 *
 * <p>Os tokens gerados incluem informações como o identificador original do usuário e seu tipo (role),
 * além de data de expiração configurada para 24 horas após a geração.</p>
 */
@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    /**
     * Retorna o algoritmo de assinatura utilizado para criação e validação do token JWT.
     *
     * @return algoritmo HMAC256 configurado com a chave secreta
     */
    public Algorithm getAlgoritmo() {
        return Algorithm.HMAC256(secret);
    }

    /**
     * Gera um token JWT para o usuário informado.
     *
     * @param usuario usuário para o qual o token será criado
     * @return token JWT assinado com as informações do usuário
     * @throws RuntimeException caso ocorra erro durante a criação do token
     */
    public String gerarToken(Usuario usuario) {
        try {
            Algorithm algoritmo = getAlgoritmo();

            return JWT.create()
                    .withIssuer("API F1")
                    .withSubject("usuario")
                    .withClaim("idOriginal", usuario.getIdOriginal())
                    .withClaim("role", usuario.getTipo().toString())
                    .withExpiresAt(dataExpiracao())
                    .sign(algoritmo);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    /**
     * Valida o token JWT informado, verificando assinatura, emissor e validade.
     *
     * @param token token JWT a ser validado
     * @return objeto {@link DecodedJWT} contendo os dados decodificados do token
     * @throws com.auth0.jwt.exceptions.JWTVerificationException se o token for inválido
     */
    public DecodedJWT validarToken(String token) {
        Algorithm algoritmo = getAlgoritmo();
        JWTVerifier verifier = JWT.require(algoritmo).withSubject("usuario").build();
        return verifier.verify(token);
    }

    /**
     * Calcula a data de expiração do token, configurada para 24 horas a partir do momento atual,
     * considerando o fuso horário de Brasília (GMT-3).
     *
     * @return instante representando a data de expiração do token
     */
    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
    }

    /**
     * Extrai o identificador original do usuário presente no token JWT.
     *
     * @param token token JWT de onde o id será extraído
     * @return id original do usuário
     */
    public Integer extrairIdUsuario(String token) {
        return JWT.decode(token).getClaim("idOriginal").asInt();
    }

    /**
     * Extrai o tipo (role) do usuário presente no token JWT.
     *
     * @param token token JWT de onde o tipo será extraído
     * @return tipo do usuário como string
     */
    public String extrairTipoUsuario(String token) {
        return JWT.decode(token).getClaim("role").asString();
    }
}
