package com.f1.api.domain.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_1_visao_geral()", nativeQuery = true)
    DadosRelatorioVisaoGeral obterRelatorioAdminVisaoGeral();

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_2_corridas_ano(:ano)", nativeQuery = true)
    List<DadosRelatorioCorridasAno> obterRelatorioAdminCorridasAno(Integer ano);

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_3_escuderias_ano(:ano)", nativeQuery = true)
    List<DadosRelatorioEscuderiasAno> obterRelatorioAdminEscuderiasAno(Integer ano);

    @Query(value = "SELECT * FROM grupo5.relatorio_admin_4_pilotos_ano(:ano)", nativeQuery = true)
    List<DadosRelatorioPilotosAno> obterRelatorioAdminPilotosAno(Integer ano);

}
