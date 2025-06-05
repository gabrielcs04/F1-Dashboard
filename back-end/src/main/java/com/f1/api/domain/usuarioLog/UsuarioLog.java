package com.f1.api.domain.usuarioLog;

import com.f1.api.domain.usuario.Tipo;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity(name = "UsuarioLog")
@Table(name = "users_log")
public class UsuarioLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logid")
    private Integer id;

    @Column(name = "userid", nullable = false)
    private Integer idUsuario;

    @Column(name = "timestamp_login", nullable = false)
    private LocalDateTime horarioLogin;

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
