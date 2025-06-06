package com.f1.api.domain.piloto;

import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.piloto.DadosListagemPontuacao;
import com.f1.api.dto.piloto.DadosNomePiloto;
import com.f1.api.dto.piloto.DadosRelatorioResultados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de persistência e consulta da entidade {@link Piloto}.
 *
 * <p>Define consultas personalizadas usando SQL nativo para buscar informações
 * específicas do piloto, inserir registros e obter relatórios relacionados.</p>
 */
@Repository
public interface PilotoRepository extends JpaRepository<Piloto, Integer> {

    /**
     * Obtém o nome e sobrenome do piloto pelo seu ID.
     *
     * @param idPiloto ID do piloto
     * @return Optional com dados do nome do piloto, se encontrado
     */
    @Query(value = "SELECT forename, surname FROM grupo5.driver WHERE driverid = :idPiloto", nativeQuery = true)
    Optional<DadosNomePiloto> obterNomePorId(Integer idPiloto);

    /**
     * Insere um novo piloto no banco de dados.
     *
     * @param referencia referência textual do piloto
     * @param numero número do piloto
     * @param codigo código do piloto
     * @param nome nome do piloto
     * @param sobrenome sobrenome do piloto
     * @param dataNascimento data de nascimento do piloto
     * @param nacionalidade nacionalidade do piloto
     * @param url URL com mais informações sobre o piloto
     */
    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.driver (driverref, number, code, forename, surname, dateofbirth, nationality, url) 
            VALUES (:referencia, :numero, :codigo, :nome, :sobrenome, :dataNascimento, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirPiloto(String referencia, Integer numero, String codigo, String nome, String sobrenome, LocalDate dataNascimento, String nacionalidade, String url);

    /**
     * Consulta pilotos pelo sobrenome e pelo ID da escuderia associada.
     *
     * @param sobrenome sobrenome do piloto (case insensitive)
     * @param idEscuderia ID da escuderia
     * @return lista de pilotos que correspondem aos critérios
     */
    @Query(value = """
            SELECT DISTINCT d.*
            FROM grupo5.driver d
            INNER JOIN grupo5.results r
            ON UPPER(d.surname) = UPPER(:sobrenome) 
                AND d.driverid = r.driverid 
                AND r.constructorid = :idEscuderia
            """, nativeQuery = true)
    List<Piloto> consultarPorSobrenomeEIdEscuderia(String sobrenome, Integer idEscuderia);

    /**
     * Obtém o período ativo do piloto na Fórmula 1.
     *
     * @param idPiloto ID do piloto
     * @return dados do período de participação do piloto
     */
    @Query(value = "SELECT * FROM grupo5.obter_periodo_piloto(:idPiloto)", nativeQuery = true)
    DadosListagemPeriodo obterPeriodo(Integer idPiloto);

    /**
     * Obtém os resultados do piloto por ano.
     *
     * @param idPiloto ID do piloto
     * @return lista com os resultados anuais do piloto
     */
    @Query(value = "SELECT * FROM grupo5.obter_resultado_ano_piloto(:idPiloto)", nativeQuery = true)
    List<DadosRelatorioResultados> obterResultados(Integer idPiloto);

    /**
     * Obtém o relatório de pontuação do piloto.
     *
     * @param idPiloto ID do piloto
     * @return lista com dados da pontuação do piloto
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_piloto_6(:idPiloto)", nativeQuery = true)
    List<DadosListagemPontuacao> obterRelatorioPontuacao(Integer idPiloto);

    /**
     * Obtém o relatório de status do piloto.
     *
     * @param idPiloto ID do piloto
     * @return lista com dados de status do piloto
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_piloto_7(:idPiloto)", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus(Integer idPiloto);

}
