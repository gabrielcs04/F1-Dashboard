package com.f1.api.domain.usuario;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Representa um usuário do sistema com informações de autenticação e perfil.
 *
 * <p>Esta entidade é mapeada para a tabela {@code user} no banco de dados e contém
 * dados essenciais para login, tipo de usuário e referência ao registro original
 * vinculado a esse usuário.</p>
 *
 * @see Tipo
 */
@Entity(name = "Usuario")
@Table(name = "user")
public class Usuario {

    /** Identificador único do usuário, gerado automaticamente pelo banco. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer id;

    /**
     * Nome de login do usuário, campo obrigatório.
     */
    @Column(name = "login", nullable = false)
    private String login;

    /**
     * Senha do usuário, campo obrigatório.
     */
    @Column(name = "password", nullable = false)
    private String senha;

    /**
     * Tipo do usuário (ADMIN, PILOTO, ESCUDERIA), armazenado como string.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private Tipo tipo;

    /**
     * Identificador do registro original associado a esse usuário (piloto, escuderia, etc.).
     */
    @Column(name = "idoriginal", nullable = false)
    private Integer idOriginal;

    /**
     * Construtor padrão para uso do JPA.
     */
    public Usuario() {
    }

    public Integer getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getSenha() {
        return senha;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public Integer getIdOriginal() {
        return idOriginal;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
