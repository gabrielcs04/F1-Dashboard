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

@RestController
@RequestMapping("info-usuario")
public class InfoUsuarioController {

    private final TokenService tokenService;
    private final PilotoRepository pilotoRepository;
    private final EscuderiaRepository escuderiaRepository;

    public InfoUsuarioController(TokenService tokenService, PilotoRepository pilotoRepository, EscuderiaRepository escuderiaRepository) {
        this.tokenService = tokenService;
        this.pilotoRepository = pilotoRepository;
        this.escuderiaRepository = escuderiaRepository;
    }

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
