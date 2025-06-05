package com.f1.api.domain.piloto;

import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.piloto.DadosListagemPontuacao;
import com.f1.api.dto.piloto.DadosRelatorioResultados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PilotoRepository extends JpaRepository<Piloto, Integer> {

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.driver (driverref, number, code, forename, surname, dateofbirth, nationality, url) 
            VALUES (:referencia, :numero, :codigo, :nome, :sobrenome, :dataNascimento, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirPiloto(String referencia, Integer numero, String codigo, String nome, String sobrenome, LocalDate dataNascimento, String nacionalidade, String url);

    @Query(value = """
            SELECT DISTINCT d.*
            FROM grupo5.driver d
            INNER JOIN grupo5.results r
            ON UPPER(d.surname) = UPPER(:sobrenome) 
                AND d.driverid = r.driverid 
                AND r.constructorid = :idEscuderia
            """, nativeQuery = true)
    List<Piloto> consultarPorSobrenomeEIdEscuderia(String sobrenome, Integer idEscuderia);

    @Query(value = "SELECT * FROM grupo5.obter_periodo_piloto(:idPiloto)", nativeQuery = true)
    DadosListagemPeriodo obterPeriodo(Integer idPiloto);

    @Query(value = "SELECT * FROM grupo5.obter_resultado_ano_piloto(:idPiloto)", nativeQuery = true)
    List<DadosRelatorioResultados> obterResultados(Integer idPiloto);

    @Query(value = "SELECT * FROM grupo5.relatorio_piloto_6(:idPiloto)", nativeQuery = true)
    List<DadosListagemPontuacao> obterRelatorioPontuacao(Integer idPiloto);

    @Query(value = "SELECT * FROM grupo5.relatorio_piloto_7(:idPiloto)", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus(Integer idPiloto);

}
