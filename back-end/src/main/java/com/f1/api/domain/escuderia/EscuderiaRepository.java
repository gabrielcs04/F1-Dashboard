package com.f1.api.domain.escuderia;

import com.f1.api.dto.DadosListagemQuantidade;
import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.admin.DadosListagemCidadeAeroporto;
import com.f1.api.dto.escuderia.DadosListagemVitoriasPiloto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface EscuderiaRepository extends JpaRepository<Escuderia, Integer> {

    @Query(value = "SELECT name FROM grupo5.constructors WHERE constructorid = :idEscuderia", nativeQuery = true)
    Optional<String> obterNomePorId(Integer idEscuderia);

    @Query(value = """
        SELECT COUNT(DISTINCT driverid)
        FROM grupo5.results
        WHERE constructorid = :idEscuderia
        """, nativeQuery = true)
    Long obterQtdePilotosDistintosPorIdEscuderia(Integer idEscuderia);

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.constructors (constructorref, name, nationality, url) 
            VALUES (:referencia, :nome, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirEscuderia(String referencia, String nome, String nacionalidade, String url);

    @Query(value = "SELECT * FROM grupo5.obter_vitorias_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemQuantidade obterVitorias(Integer idEscuderia);

    @Query(value = "SELECT * FROM grupo5.obter_qtd_pilotos_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemQuantidade obterQtdPilotos(Integer idEscuderia);

    @Query(value = "SELECT * FROM grupo5.obter_periodo_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemPeriodo obterPeriodo(Integer idEscuderia);

    @Query(value = "SELECT * FROM grupo5.relatorio_escuderia_4(:idEscuderia)", nativeQuery = true)
    List<DadosListagemVitoriasPiloto> obterRelatorioPilotosVitorias(Integer idEscuderia);

    @Query(value = "SELECT * FROM grupo5.relatorio_escuderia_5(:idEscuderia)", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus(Integer idEscuderia);

}
