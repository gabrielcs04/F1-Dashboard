package com.f1.api.dto.piloto;

/**
 * Representa os dados básicos de nome de um piloto.
 *
 * @param nome      Primeiro nome do piloto.
 * @param sobrenome Sobrenome do piloto.
 */
public record DadosNomePiloto(String nome,
                              String sobrenome) {
}
