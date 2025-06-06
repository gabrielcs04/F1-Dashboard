package com.f1.api.domain.admin;

import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.admin.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositório JPA para consultas administrativas da aplicação.
 *
 * <p>Fornece acesso a dados consolidados, estatísticas e relatórios gerenciais
 * por meio de queries nativas.</p>
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    /**
     * Obtém visão geral com estatísticas do sistema.
     * @return dados consolidados para o dashboard do administrador
     */
    @Query(value = "SELECT * FROM grupo5.obter_visao_geral()", nativeQuery = true)
    DadosRelatorioVisaoGeral obterVisaoGeral();

    /**
     * Lista corridas realizadas em um determinado ano.
     * @param ano ano de interesse
     * @return lista de corridas
     */
    @Query(value = "SELECT * FROM grupo5.obter_corridas_ano(:ano)", nativeQuery = true)
    List<DadosListagemCorridas> obterCorridasAno(Integer ano);

    /**
     * Lista escuderias e pontuações por ano.
     * @param ano ano de interesse
     * @return lista de escuderias com pontuações
     */
    @Query(value = "SELECT * FROM grupo5.obter_escuderias_ano(:ano)", nativeQuery = true)
    List<DadosListagemPontuacaoItem> obterEscuderiasAno(Integer ano);

    /**
     * Lista pilotos e pontuações por ano.
     * @param ano ano de interesse
     * @return lista de pilotos com pontuações
     */
    @Query(value = "SELECT * FROM grupo5.obter_pilotos_ano(:ano)", nativeQuery = true)
    List<DadosListagemPontuacaoItem> obterPilotosAno(Integer ano);

    /**
     * Gera relatório geral por status.
     * @return lista de status com quantidades
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_1()", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus();

    /**
     * Gera relatório de aeroportos por cidade.
     * @param cidade nome da cidade
     * @return lista de aeroportos
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_2(:cidade)", nativeQuery = true)
    List<DadosListagemCidadeAeroporto> obterRelatorioCidadeAeroportos(String cidade);

    /**
     * Gera relação entre pilotos e escuderias.
     * @return lista com vínculo entre pilotos e escuderias
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3()", nativeQuery = true)
    List<DadosListagemPilotosEscuderias> obterRelatorioPilotosEscuderias();

    /**
     * Lista corridas agrupadas por escuderia.
     * @return lista de corridas por escuderia
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_1()", nativeQuery = true)
    List<DadosListagemCorridasEscuderias> obterRelatorioCorridasEscuderias();

    /**
     * Lista circuitos associados a uma escuderia.
     * @param nomeEscuderia nome da escuderia
     * @return lista de circuitos
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_2(:nomeEscuderia)", nativeQuery = true)
    List<DadosListagemCircuitosEscuderia> obterRelatorioCircuitosEscuderia(String nomeEscuderia);

    /**
     * Lista corridas em que a escuderia participou.
     * @param nomeEscuderia nome da escuderia
     * @return lista de corridas
     */
    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_3(:nomeEscuderia)", nativeQuery = true)
    List<DadosListagemCorridasEscuderia> obterRelatorioCorridasEscuderia(String nomeEscuderia);
}