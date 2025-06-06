package com.f1.api.domain.usuarioLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Interface de repositório para operações de persistência da entidade {@link UsuarioLog}.
 * Extende JpaRepository para fornecer métodos CRUD básicos e define operações customizadas.
 */
@Repository
public interface UsuarioLogRepository extends JpaRepository<UsuarioLog, Integer> {

    /**
     * Insere um registro de log de login de usuário na tabela "users_log".
     *
     * @param idUsuario    Identificador do usuário que realizou o login.
     * @param horarioLogin Data e hora do login realizado.
     */
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO grupo5.users_log (userid, timestamp_login) VALUES (:idUsuario, :horarioLogin)", nativeQuery = true)
    void inserirLoginLog(Integer idUsuario, LocalDateTime horarioLogin);

}
