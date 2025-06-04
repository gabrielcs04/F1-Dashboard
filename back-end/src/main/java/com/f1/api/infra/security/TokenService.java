package com.f1.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.f1.api.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public Algorithm getAlgoritmo() {
        return Algorithm.HMAC256(secret);
    }

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

    public DecodedJWT validarToken(String token) {
        Algorithm algoritmo = getAlgoritmo();
        JWTVerifier verifier = JWT.require(algoritmo).withSubject("usuario").build();
        return verifier.verify(token);
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
    }

}
