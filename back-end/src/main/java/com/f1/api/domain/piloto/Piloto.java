package com.f1.api.domain.piloto;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity(name = "Piloto")
@Table(name = "driver")
public class Piloto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driverid")
    private Long id;

    @Column(name = "driverref", nullable = false)
    private String referencia;

    @Column(name = "number")
    private Integer numero;

    @Column(name = "code")
    private String codigo;

    @Column(name = "forename", nullable = false)
    private String nome;

    @Column(name = "surname", nullable = false)
    private String sobrenome;

    @Column(name = "dateofbirth")
    private LocalDate dataNascimento;

    @Column(name = "nationality")
    private String nacionalidade;

    @Column(name = "url")
    private String url;

    public Piloto() {
    }

    public Piloto(DadosCadastroPiloto dados) {
        this.referencia = dados.referencia();
        this.numero = dados.numero();
        this.codigo = dados.codigo();
        this.nome = dados.nome();
        this.sobrenome = dados.sobrenome();
        this.dataNascimento = dados.dataNascimento();
        this.nacionalidade = dados.nacionalidade();
        this.url = dados.url();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
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
        Piloto piloto = (Piloto) o;
        return Objects.equals(id, piloto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
