package com.f1.api.controller;

import com.f1.api.domain.admin.*;
import com.f1.api.domain.escuderia.DadosCadastroEscuderia;
import com.f1.api.domain.escuderia.Escuderia;
import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.DadosCadastroPiloto;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.domain.temporada.TemporadaRepository;
import jakarta.validation.Valid;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController {

    private final EscuderiaRepository escuderiaRepository;
    private final PilotoRepository pilotoRepository;
    private final AdminRepository adminRepository;

    public AdminController(EscuderiaRepository escuderiaRepository, PilotoRepository pilotoRepository, AdminRepository adminRepository) {
        this.escuderiaRepository = escuderiaRepository;
        this.pilotoRepository = pilotoRepository;
        this.adminRepository = adminRepository;
    }


    @PostMapping("/escuderias")
    @Transactional
    public void cadastrarEscuderia(@RequestBody @Valid DadosCadastroEscuderia dados) {
        var escuderia = new Escuderia(dados);
        escuderiaRepository.inserirEscuderia(escuderia.getReferencia(), escuderia.getNome(), escuderia.getNacionalidade(), escuderia.getUrl());
    }

    @PostMapping("/pilotos")
    @Transactional
    public void cadastrarPiloto(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

    @GetMapping("/dashboard/visao-geral")
    public DadosRelatorioVisaoGeral visualizarRelatorioVisaoGeral() {
        return adminRepository.obterRelatorioAdminVisaoGeral();
    }

    @GetMapping("/dashboard/corridas/{ano}")
    public List<DadosRelatorioCorridasAno> visualizarRelatorioCorridasAno(@PathVariable Integer ano) {
        return adminRepository.obterRelatorioAdminCorridasAno(ano);
    }

    @GetMapping("/dashboard/escuderias/{ano}")
    public List<DadosRelatorioEscuderiasAno> visualizarRelatorioEscuderiasAno(@PathVariable Integer ano) {
        return adminRepository.obterRelatorioAdminEscuderiasAno(ano);
    }

    @GetMapping("/dashboard/pilotos/{ano}")
    public List<DadosRelatorioPilotosAno> visualizarRelatorioPilotosAno(@PathVariable Integer ano) {
        return adminRepository.obterRelatorioAdminPilotosAno(ano);
    }

}
