package com.f1.api.domain.piloto;

import com.f1.api.dto.piloto.DadosCadastroPiloto;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

/**
 * Representa um piloto de Fórmula 1.
 *
 * <p>Mapeada para a tabela "driver" no banco de dados, contém informações
 * pessoais e profissionais do piloto, como referência, número, código, nome,
 * sobrenome, data de nascimento, nacionalidade e URL.</p>
 */
@Entity(name = "Piloto")
@Table(name = "driver")
public class Piloto {

    /**
     * Identificador único do piloto.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driverid")
    private Integer id;

    /**
     * Referência textual do piloto.
     */
    @Column(name = "driverref", nullable = false)
    private String referencia;

    /**
     * Número do piloto.
     */
    @Column(name = "number")
    private Integer numero;

    /**
     * Código do piloto.
     */
    @Column(name = "code")
    private String codigo;

    /**
     * Nome do piloto.
     */
    @Column(name = "forename", nullable = false)
    private String nome;

    /**
     * Sobrenome do piloto.
     */
    @Column(name = "surname", nullable = false)
    private String sobrenome;

    /**
     * Data de nascimento do piloto.
     */
    @Column(name = "dateofbirth")
    private LocalDate dataNascimento;

    /**
     * Nacionalidade do piloto.
     */
    @Column(name = "nationality")
    private String nacionalidade;

    /**
     * URL com mais informações sobre o piloto.
     */
    @Column(name = "url")
    private String url;

    /**
     * Construtor padrão para uso do JPA.
     */
    public Piloto() {
    }

    /**
     * Construtor para criar um piloto a partir dos dados recebidos.
     *
     * @param dados dados para cadastro do piloto
     */
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

    public String getCodigo() {
        return codigo;
    }

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
