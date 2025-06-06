package com.f1.api.domain.usuarioLog;

import com.f1.api.domain.usuario.Tipo;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade que representa o registro de login dos usuários.
 * Cada instância corresponde a um evento de login registrado no sistema.
 */
@Entity(name = "UsuarioLog")
@Table(name = "users_log")
public class UsuarioLog {

    /**
     * Identificador único do registro de log.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logid")
    private Integer id;

    /**
     * Identificador do usuário que efetuou o login.
     */
    @Column(name = "userid", nullable = false)
    private Integer idUsuario;

    /**
     * Data e hora em que o login foi realizado.
     */
    @Column(name = "timestamp_login", nullable = false)
    private LocalDateTime horarioLogin;

    /**
     * Construtor padrão para uso do JPA.
     */
    public UsuarioLog() {
    }

    public Integer getId() {
        return id;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public LocalDateTime getHorarioLogin() {
        return horarioLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioLog that = (UsuarioLog) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
