package com.f1.api.domain.usuarioLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Repository
public interface UsuarioLogRepository extends JpaRepository<UsuarioLog, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO grupo5.users_log (userid, timestamp_login) VALUES (:idUsuario, :horarioLogin)", nativeQuery = true)
    void inserirLoginLog(Integer idUsuario, LocalDateTime horarioLogin);

}
