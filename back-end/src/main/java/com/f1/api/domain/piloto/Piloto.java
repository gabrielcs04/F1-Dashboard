package com.f1.api.domain.piloto;

import com.f1.api.dto.piloto.DadosCadastroPiloto;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity(name = "Piloto")
@Table(name = "driver")
public class Piloto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driverid")
    private Integer id;

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

    public Integer getId() {
        return id;
    }

    public String getReferencia() {
        return referencia;
    }

    public Integer getNumero() {
        return numero;
    }

    public String getCodigo() { return codigo; }

    public String getNome() {
        return nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
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
        Piloto piloto = (Piloto) o;
        return Objects.equals(id, piloto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
