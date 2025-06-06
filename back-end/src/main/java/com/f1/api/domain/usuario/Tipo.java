package com.f1.api.domain.usuario;

/**
 * Enumeração que representa os tipos de usuários no sistema.
 *
 * <p>Define os perfis de acesso e funcionalidades específicas que cada tipo de usuário possui.</p>
 *
 * <ul>
 *   <li>{@link #ADMIN} - Usuário com privilégios administrativos.</li>
 *   <li>{@link #PILOTO} - Usuário que representa um piloto de Fórmula 1.</li>
 *   <li>{@link #ESCUDERIA} - Usuário que representa uma equipe (escuderia) de Fórmula 1.</li>
 * </ul>
 */
public enum Tipo {

    ADMIN,
    PILOTO,
    ESCUDERIA

}
