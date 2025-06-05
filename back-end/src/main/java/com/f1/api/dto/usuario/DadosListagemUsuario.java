package com.f1.api.dto.usuario;

import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.usuario.Tipo;
import com.f1.api.domain.usuario.Usuario;

import java.time.LocalDate;

public record DadosListagemUsuario(Integer id, String login, Tipo tipo, Integer idOriginal) {

    public DadosListagemUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getLogin(), usuario.getTipo(), usuario.getIdOriginal());
    }

}
