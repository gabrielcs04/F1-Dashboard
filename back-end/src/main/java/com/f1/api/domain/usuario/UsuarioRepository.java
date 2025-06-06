package com.f1.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Interface de repositório para a entidade {@link Usuario}.
 * Fornece operações CRUD padrão e métodos personalizados para acesso ao banco de dados.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    /**
     * Busca um usuário pelo seu login.
     *
     * @param login O nome de login do usuário a ser buscado.
     * @return A instância {@link Usuario} correspondente ao login informado,
     *         ou {@code null} se não existir nenhum usuário com este login.
     */
    @Query(value = "SELECT * FROM grupo5.users WHERE login = :login LIMIT 1", nativeQuery = true)
    Usuario buscarPorLogin(String login);

}
