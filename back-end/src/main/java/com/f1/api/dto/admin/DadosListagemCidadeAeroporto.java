package com.f1.api.dto.admin;

/**
 * Representa os dados para listagem de informações relacionadas a cidades e aeroportos.
 *
 * @param cidade        Nome da cidade onde o aeroporto está localizado.
 * @param codigoIATA    Código IATA do aeroporto (código de três letras utilizado para identificação).
 * @param aeroporto     Nome do aeroporto.
 * @param cidadeAeroporto Nome composto que pode incluir cidade e aeroporto para identificação detalhada.
 * @param distanciaKm   Distância em quilômetros relacionada ao aeroporto ou entre aeroportos/cidades (dependendo do contexto de uso).
 * @param tipo          Tipo do aeroporto ou categoria relacionada.
 */
public record DadosListagemCidadeAeroporto(String cidade,
                                           String codigoIATA,
                                           String aeroporto,
                                           String cidadeAeroporto,
                                           Number distanciaKm,
                                           String tipo) {
}
