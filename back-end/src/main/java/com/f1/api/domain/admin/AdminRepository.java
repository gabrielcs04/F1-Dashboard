package com.f1.api.domain.admin;

import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.admin.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    @Query(value = "SELECT * FROM grupo5.obter_visao_geral()", nativeQuery = true)
    DadosRelatorioVisaoGeral obterVisaoGeral();

    @Query(value = "SELECT * FROM grupo5.obter_corridas_ano(:ano)", nativeQuery = true)
    List<DadosListagemCorridas> obterCorridasAno(Integer ano);

    @Query(value = "SELECT * FROM grupo5.obter_escuderias_ano(:ano)", nativeQuery = true)
    List<DadosListagemPontuacaoItem> obterEscuderiasAno(Integer ano);

    @Query(value = "SELECT * FROM grupo5.obter_pilotos_ano(:ano)", nativeQuery = true)
    List<DadosListagemPontuacaoItem> obterPilotosAno(Integer ano);

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_1()", nativeQuery = true)
    List<DadosListagemQuantidadeItem> obterRelatorioStatus();

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_2(:cidade)", nativeQuery = true)
    List<DadosListagemCidadeAeroporto> obterRelatorioCidadeAeroportos(String cidade);

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3()", nativeQuery = true)
    List<DadosListagemPilotosEscuderias> obterRelatorioPilotosEscuderias();

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_1()", nativeQuery = true)
    List<DadosListagemCorridasEscuderias> obterRelatorioCorridasEscuderias();

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_2(:nomeEscuderia)", nativeQuery = true)
    List<DadosListagemCircuitosEscuderia> obterRelatorioCircuitosEscuderia(String nomeEscuderia);

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_3(:nomeEscuderia)", nativeQuery = true)
    List<DadosListagemCorridasEscuderia> obterRelatorioCorridasEscuderia(String nomeEscuderia);

}
