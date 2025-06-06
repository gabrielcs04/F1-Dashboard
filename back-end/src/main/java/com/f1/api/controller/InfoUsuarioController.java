package com.f1.api.controller;

import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.domain.usuario.Tipo;
import com.f1.api.dto.DadosInfoUsuario;
import com.f1.api.infra.security.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador responsável por fornecer informações detalhadas sobre o usuário autenticado.
 * A informação retornada varia conforme o tipo do usuário (ADMIN, PILOTO ou ESCUDERIA).
 */
@RestController
@RequestMapping("info-usuario")
public class InfoUsuarioController {

    private final TokenService tokenService;
    private final PilotoRepository pilotoRepository;
    private final EscuderiaRepository escuderiaRepository;

    /**
     * Construtor da classe que injeta os serviços necessários para extração de dados do usuário.
     *
     * @param tokenService Serviço responsável pela extração de informações do token JWT.
     * @param pilotoRepository Repositório para consulta de informações dos pilotos.
     * @param escuderiaRepository Repositório para consulta de informações das escuderias.
     */
    public InfoUsuarioController(TokenService tokenService, PilotoRepository pilotoRepository, EscuderiaRepository escuderiaRepository) {
        this.tokenService = tokenService;
        this.pilotoRepository = pilotoRepository;
        this.escuderiaRepository = escuderiaRepository;
    }

    /**
     * Endpoint responsável por retornar informações detalhadas do usuário autenticado com base no tipo de usuário.
     * O tipo é determinado a partir do token JWT presente no cabeçalho da requisição.
     *
     * @param authHeader Cabeçalho Authorization contendo o token JWT no formato "Bearer {token}".
     * @return {@code 200 OK} com nome ou descrição do usuário, ou {@code 400 Bad Request} se o tipo de usuário for inválido.
     */
    @GetMapping
    public ResponseEntity<DadosInfoUsuario> obterInfoUsuario(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Integer idUsuario = tokenService.extrairIdUsuario(token);
        String tipoUsuario = tokenService.extrairTipoUsuario(token);

        Tipo tipo;
        try {
            tipo = Tipo.valueOf(tipoUsuario.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new DadosInfoUsuario("Tipo de usuário inválido"));
        }

        String info;

        switch (tipo) {
            case ADMIN:
                info = "Administrador";
                break;

            case PILOTO:
                info = pilotoRepository.obterNomePorId(idUsuario)
                        .map(piloto -> piloto.nome() + " " + piloto.sobrenome())
                        .orElse("Piloto não encontrado");
                break;

            case ESCUDERIA:
                info = escuderiaRepository.obterNomePorId(idUsuario)
                        .map(nome -> {
                            Long qtdePilotos = escuderiaRepository.obterQtdePilotosDistintosPorIdEscuderia(idUsuario);
                            return nome + " (" + qtdePilotos + " pilotos)";
                        })
                        .orElse("Equipe não encontrada");
                break;

            default:
                info = "Tipo de usuário inválido";
        }

        return ResponseEntity.ok(new DadosInfoUsuario(info));
    }
}
