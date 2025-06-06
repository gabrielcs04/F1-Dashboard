package com.f1.api.dto;

/**
 * Representa um item com nome e uma quantidade total associada,
 * utilizado para listagens que envolvem agregação de dados.
 *
 * @param nome  Nome do item.
 * @param total Quantidade total associada ao item.
 */
public record DadosListagemQuantidadeItem(String nome,
                                          Number total) {
}
