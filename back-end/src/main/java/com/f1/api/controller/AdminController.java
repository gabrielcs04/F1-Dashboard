package com.f1.api.controller;

import com.f1.api.domain.admin.*;
import com.f1.api.domain.escuderia.Escuderia;
import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.admin.*;
import com.f1.api.dto.escuderia.DadosCadastroEscuderia;
import com.f1.api.dto.piloto.DadosCadastroPiloto;
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
    public DadosRelatorioVisaoGeral visualizarDashboardVisaoGeral() {
        return adminRepository.obterVisaoGeral();
    }

    @GetMapping("/dashboard/corridas/{ano}")
    public List<DadosListagemCorridas> visualizarDashboardCorridasAno(@PathVariable Integer ano) {
        return adminRepository.obterCorridasAno(ano);
    }

    @GetMapping("/dashboard/escuderias/{ano}")
    public List<DadosListagemPontuacaoItem> visualizarDashboardEscuderiasAno(@PathVariable Integer ano) {
        return adminRepository.obterEscuderiasAno(ano);
    }

    @GetMapping("/dashboard/pilotos/{ano}")
    public List<DadosListagemPontuacaoItem> visualizarDashboardPilotosAno(@PathVariable Integer ano) {
        return adminRepository.obterPilotosAno(ano);
    }

    @GetMapping("/relatorio/status")
    public List<DadosListagemQuantidadeItem> visualizarDashboardStatus() {
        return adminRepository.obterRelatorioStatus();
    }

    @GetMapping("/relatorio/aeroportos/{cidade}")
    public List<DadosListagemCidadeAeroporto> visualizarDashboardStatus(@PathVariable String cidade) {
        return adminRepository.obterRelatorioCidadeAeroportos(cidade);
    }

}
