package com.f1.api.domain.escuderia;

import com.f1.api.dto.escuderia.DadosCadastroEscuderia;
import jakarta.persistence.*;

import java.util.Objects;

/**
 * Representa uma escuderia de Fórmula 1.
 *
 * <p>Mapeada para a tabela "constructors" no banco de dados, contém informações
 * como referência, nome, nacionalidade e URL da escuderia.</p>
 */
@Entity(name = "Escuderia")
@Table(name = "constructors")
public class Escuderia {

    /**
     * Identificador único da escuderia.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "constructorid")
    private Integer id;

    /**
     * Referência da escuderia (identificador textual).
     */
    @Column(name = "constructorref", nullable = false)
    private String referencia;

    /**
     * Nome da escuderia.
     */
    @Column(name = "name", nullable = false)
    private String nome;

    /**
     * Nacionalidade da escuderia.
     */
    @Column(name = "nationality")
    private String nacionalidade;

    /**
     * URL com mais informações sobre a escuderia.
     */
    @Column(name = "url")
    private String url;

    /**
     * Construtor padrão para uso do JPA.
     */
    public Escuderia() {
    }

    /**
     * Construtor para criar uma escuderia a partir dos dados recebidos.
     *
     * @param dados dados para cadastro da escuderia
     */
    public Escuderia(DadosCadastroEscuderia dados) {
        this.referencia = dados.referencia();
        this.nome = dados.nome();
        this.nacionalidade = dados.nacionalidade();
        this.url = dados.url();
    }

    public Integer getId() {
        return id;
    }

    public String getReferencia() {
        return referencia;
    }

    public String getNome() {
        return nome;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Escuderia escuderia = (Escuderia) o;
        return Objects.equals(id, escuderia.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
