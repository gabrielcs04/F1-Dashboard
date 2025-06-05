package com.f1.api.controller;

import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.piloto.DadosCadastroPiloto;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.piloto.DadosListagemPontuacao;
import com.f1.api.dto.piloto.DadosRelatorioResultados;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pilotos")
public class PilotoController {
    ;
    private final PilotoRepository pilotoRepository;

    public PilotoController(PilotoRepository pilotoRepository) {
        this.pilotoRepository = pilotoRepository;
    }

    @PostMapping()
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

    @GetMapping("/{id}/dashboard/periodo")
    public ResponseEntity<DadosListagemPeriodo> visualizarDashboardPeriodo(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterPeriodo(id));
    }

    @GetMapping("/{id}/dashboard/resultados")
    public ResponseEntity<List<DadosRelatorioResultados>> visualizarDashboardResultados(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterResultados(id));
    }

    @GetMapping("{id}/relatorio/pontuacao")
    public ResponseEntity<List<DadosListagemPontuacao>> visualizarRelatorioPontuacao(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterRelatorioPontuacao(id));
    }

    @GetMapping("{id}/relatorio/status")
    public ResponseEntity<List<DadosListagemQuantidadeItem>> visualizarRelatorioStatus(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterRelatorioStatus(id));
    }

}
