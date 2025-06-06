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

/**
 * Interface de repositório para acesso e manipulação de dados da entidade Escuderia.
 *
 * <p>Fornece consultas customizadas para obter informações relacionadas às escuderias,
 * incluindo nome, quantidade de pilotos distintos, inserção de novas escuderias,
 * relatórios de vitórias, quantidade de pilotos, período ativo e status.</p>
 */
@Repository
public interface EscuderiaRepository extends JpaRepository<Escuderia, Integer> {

    /**
     * Obtém o nome da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return nome da escuderia, se existir
     */
    @Query(value = "SELECT name FROM grupo5.constructors WHERE constructorid = :idEscuderia", nativeQuery = true)
    Optional<String> obterNomePorId(Integer idEscuderia);

    /**
     * Conta a quantidade distinta de pilotos associados à escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return quantidade de pilotos distintos
     */
    @Query(value = """
        SELECT COUNT(DISTINCT driverid)
        FROM grupo5.results
        WHERE constructorid = :idEscuderia
        """, nativeQuery = true)
    Long obterQtdePilotosDistintosPorIdEscuderia(Integer idEscuderia);

    /**
     * Insere uma nova escuderia na base de dados.
     *
     * @param referencia referência da escuderia
     * @param nome nome da escuderia
     * @param nacionalidade nacionalidade da escuderia
     * @param url URL com mais informações da escuderia
     */
    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.constructors (constructorref, name, nationality, url) 
            VALUES (:referencia, :nome, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirEscuderia(String referencia, String nome, String nacionalidade, String url);

    /**
     * Obtém o total de vitórias da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return dados contendo a quantidade de vitórias
     */
    @Query(value = "SELECT * FROM grupo5.obter_vitorias_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemQuantidade obterVitorias(Integer idEscuderia);

    /**
     * Obtém a quantidade de pilotos da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return dados contendo a quantidade de pilotos
     */
    @Query(value = "SELECT * FROM grupo5.obter_qtd_pilotos_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemQuantidade obterQtdPilotos(Integer idEscuderia);

    /**
     * Obtém o período de atuação da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return dados contendo o período da escuderia
     */
    @Query(value = "SELECT * FROM grupo5.obter_periodo_escuderia(:idEscuderia)", nativeQuery = true)
    DadosListagemPeriodo obterPeriodo(Integer idEscuderia);

    /**
     * Obtém relatório das vitórias dos pilotos da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return lista com dados das vitórias por piloto
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_escuderia_4(:idEscuderia)", nativeQuery = true)
    List<DadosListagemVitoriasPiloto> obterRelatorioPilotosVitorias(Integer idEscuderia);

    /**
     * Obtém relatório de status da escuderia pelo seu ID.
     *
     * @param idEscuderia ID da escuderia
     * @return lista com dados de status da escuderia
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_escuderia_5(:idEscuderia)", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus(Integer idEscuderia);

}
