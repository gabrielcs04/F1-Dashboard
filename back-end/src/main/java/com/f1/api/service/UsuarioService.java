package com.f1.api.service;

import com.f1.api.domain.usuario.Usuario;
import com.f1.api.domain.usuario.UsuarioRepository;
import com.f1.api.dto.usuario.DadosListagemUsuario;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario autenticarUsuario(String login, String senha) {
        Usuario usuario = usuarioRepository.buscarPorLogin(login);
        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado.");
        }

        String senhaHash = gerarSha256(senha);
        if (!senhaHash.equals(usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta.");
        }

        return usuario;
    }


    private String gerarSha256(String senha) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(senha.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao gerar SHA-256", e);
        }
    }

}
