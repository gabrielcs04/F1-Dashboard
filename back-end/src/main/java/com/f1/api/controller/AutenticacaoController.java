package com.f1.api.controller;

import com.f1.api.domain.usuario.Usuario;
import com.f1.api.dto.usuario.DadosListagemUsuario;
import com.f1.api.dto.usuario.DadosLoginUsuario;
import com.f1.api.infra.security.DadosTokenJWT;
import com.f1.api.infra.security.TokenService;
import com.f1.api.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AutenticacaoController {

    private final UsuarioService usuarioService;
    private final TokenService tokenService;

    public AutenticacaoController(UsuarioService usuarioService,TokenService tokenService) {
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DadosLoginUsuario loginUsuario) {
        Usuario usuario = usuarioService.autenticarUsuario(loginUsuario.login(), loginUsuario.senha());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        String token = tokenService.gerarToken(usuario);
        return ResponseEntity.ok(new DadosTokenJWT(token));
    }

}
