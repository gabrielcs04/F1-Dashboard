package com.f1.api.domain.usuario;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Serviço responsável pelas operações relacionadas a usuários, como autenticação.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Construtor para injeção do repositório de usuários.
     *
     * @param usuarioRepository repositório para acesso aos dados dos usuários
     */
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Autentica um usuário com base no login e senha fornecidos.
     *
     * @param login login do usuário
     * @param senha senha em texto plano fornecida para autenticação
     * @return usuário autenticado caso login e senha estejam corretos
     * @throws RuntimeException se o usuário não for encontrado ou se a senha estiver incorreta
     */
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

    /**
     * Gera o hash SHA-256 da senha fornecida.
     *
     * @param senha senha em texto plano
     * @return hash hexadecimal correspondente à senha
     * @throws RuntimeException se o algoritmo SHA-256 não estiver disponível
     */
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
