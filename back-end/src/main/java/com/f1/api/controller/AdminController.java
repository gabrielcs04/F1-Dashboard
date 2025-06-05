package com.f1.api.controller;

import com.f1.api.domain.admin.AdminRepository;
import com.f1.api.domain.escuderia.Escuderia;
import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.admin.*;
import com.f1.api.dto.escuderia.DadosCadastroEscuderia;
import com.f1.api.dto.piloto.DadosCadastroPiloto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<DadosRelatorioVisaoGeral> visualizarDashboardVisaoGeral() {
        return ResponseEntity.ok(adminRepository.obterVisaoGeral());
    }

    @GetMapping("/dashboard/corridas/{ano}")
    public ResponseEntity<List<DadosListagemCorridas>> visualizarDashboardCorridasAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterCorridasAno(ano));
    }

    @GetMapping("/dashboard/escuderias/{ano}")
    public ResponseEntity<List<DadosListagemPontuacaoItem>> visualizarDashboardEscuderiasAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterEscuderiasAno(ano));
    }

    @GetMapping("/dashboard/pilotos/{ano}")
    public ResponseEntity<List<DadosListagemPontuacaoItem>> visualizarDashboardPilotosAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterPilotosAno(ano));
    }

    @GetMapping("/relatorio/status")
    public ResponseEntity<List<DadosListagemQuantidadeItem>> visualizarRelatorioStatus() {
        return ResponseEntity.ok(adminRepository.obterRelatorioStatus());
    }

    @GetMapping("/relatorio/aeroportos/{cidade}")
    public ResponseEntity<List<DadosListagemCidadeAeroporto>> visualizarRelatorioCidadeAeroportos(@PathVariable String cidade) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCidadeAeroportos(cidade));
    }

    @GetMapping("/relatorio/escuderias/pilotos")
    public ResponseEntity<List<DadosListagemPilotosEscuderias>> visualizarRelatorioPilotosEscuderias() {
        return ResponseEntity.ok(adminRepository.obterRelatorioPilotosEscuderias());
    }

    @GetMapping("/relatorio/escuderias/corridas")
    public ResponseEntity<List<DadosListagemCorridasEscuderias>> visualizarRelatorioCorridasEscuderias() {
        return ResponseEntity.ok(adminRepository.obterRelatorioCorridasEscuderias());
    }

    @GetMapping("/relatorio/escuderias/{nome}/circuitos")
    public ResponseEntity<List<DadosListagemCircuitosEscuderia>> visualizarRelatorioCircuitosEscuderia(@PathVariable String nome) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCircuitosEscuderia(nome));
    }

    @GetMapping("/relatorio/escuderias/{nome}/corridas")
    public ResponseEntity<List<DadosListagemCorridasEscuderia>> visualizarRelatorioCorridasEscuderia(@PathVariable String nome) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCorridasEscuderia(nome));
    }
}
