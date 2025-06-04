package com.f1.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query(value = "SELECT * FROM grupo5.users WHERE login = :login LIMIT 1", nativeQuery = true)
    Usuario buscarPorLogin(String login);

}
