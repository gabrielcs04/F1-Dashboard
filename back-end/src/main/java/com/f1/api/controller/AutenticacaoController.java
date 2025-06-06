package com.f1.api.controller;

import com.f1.api.domain.usuario.Usuario;
import com.f1.api.domain.usuarioLog.UsuarioLogRepository;
import com.f1.api.dto.usuario.DadosLoginUsuario;
import com.f1.api.infra.security.DadosTokenJWT;
import com.f1.api.infra.security.TokenService;
import com.f1.api.domain.usuario.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

/**
 * Controlador responsável pela autenticação de usuários.
 * Expõe endpoints relacionados ao login e à geração de tokens JWT.
 */
@RestController
@RequestMapping("auth")
public class AutenticacaoController {

    private final UsuarioService usuarioService;
    private final TokenService tokenService;
    private final UsuarioLogRepository usuarioLogRepository;

    /**
     * Construtor que injeta os serviços necessários para autenticação.
     *
     * @param usuarioService Serviço responsável por autenticar usuários.
     * @param tokenService Serviço responsável pela geração de tokens JWT.
     * @param usuarioLogRepository Repositório para registrar logs de login de usuários.
     */
    public AutenticacaoController(UsuarioService usuarioService, TokenService tokenService, UsuarioLogRepository usuarioLogRepository) {
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
        this.usuarioLogRepository = usuarioLogRepository;
    }

    /**
     * Endpoint para autenticação de um usuário.
     * Verifica as credenciais fornecidas e, se válidas, gera um token JWT.
     * Também registra o horário do login no banco de dados.
     *
     * @param loginUsuario Objeto contendo as credenciais de login do usuário.
     * @return Em caso de sucesso, retorna um {@link DadosTokenJWT} com o token gerado.
     *         Caso contrário, retorna 401 Unauthorized.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DadosLoginUsuario loginUsuario) {
        Usuario usuario = usuarioService.autenticarUsuario(loginUsuario.login(), loginUsuario.senha());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        usuarioLogRepository.inserirLoginLog(usuario.getId(), LocalDateTime.now());

        String token = tokenService.gerarToken(usuario);
        return ResponseEntity.ok(new DadosTokenJWT(token));
    }
}
