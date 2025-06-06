package com.f1.api.domain.admin;

import jakarta.persistence.*;

/**
 * Representa a entidade Admin no sistema.
 *
 * <p>Utilizada para controle de autenticação e autorização de usuário administrador.</p>
 * <p>Possui ID fixo, assumindo a existência de apenas um administrador.</p>
 */
@Entity(name = "Admin")
public class Admin {

    /**
     * Identificador único do administrador.
     * Valor fixo igual a 1.
     */
    @Id
    private Integer id = 1;

}