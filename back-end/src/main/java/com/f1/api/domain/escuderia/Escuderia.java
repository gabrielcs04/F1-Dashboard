package com.f1.api.domain.escuderia;

import com.f1.api.dto.escuderia.DadosCadastroEscuderia;
import jakarta.persistence.*;

import java.util.Objects;

@Entity(name = "Escuderia")
@Table(name = "constructors")
public class Escuderia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "constructorid")
    private Integer id;

    @Column(name = "constructorref", nullable = false)
    private String referencia;

    @Column(name = "name", nullable = false)
    private String nome;

    @Column(name = "nationality")
    private String nacionalidade;

    @Column(name = "url")
    private String url;

    public Escuderia() {
    }

    public Escuderia(DadosCadastroEscuderia dados) {
        this.referencia = dados.referencia();
        this.nome = dados.nome();
        this.nacionalidade = dados.nacionalidade();
        this.url = dados.url();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
