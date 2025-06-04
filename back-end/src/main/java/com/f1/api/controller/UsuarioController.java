package com.f1.api.controller;

import com.f1.api.dto.usuario.DadosListagemUsuario;
import com.f1.api.dto.usuario.DadosLoginUsuario;
import com.f1.api.service.UsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public DadosListagemUsuario login(@RequestBody DadosLoginUsuario loginUsuario) {
        return usuarioService.autenticarUsuario(loginUsuario.login(), loginUsuario.senha());
    }

}
