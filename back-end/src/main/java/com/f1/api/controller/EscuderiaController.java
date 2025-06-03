package com.f1.api.controller;

import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.dto.*;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.escuderia.DadosListagemVitoriasPiloto;
import com.f1.api.dto.piloto.DadosCadastroPiloto;
import com.f1.api.dto.piloto.DadosListagemPiloto;
import jakarta.validation.Valid;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("escuderias")
public class EscuderiaController {

    private final PilotoRepository pilotoRepository;

    private final EscuderiaRepository escuderiaRepository;

    public EscuderiaController(PilotoRepository pilotoRepository, EscuderiaRepository escuderiaRepository) {
        this.pilotoRepository = pilotoRepository;
        this.escuderiaRepository = escuderiaRepository;
    }

    @PostMapping("/pilotos")
    @Transactional
    public void cadastrarPiloto(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }


    @GetMapping("/{id}/pilotos")
    public List<DadosListagemPiloto> consultarPorSobrenomeEIdEscuderia(@PathVariable Integer id, @RequestParam String sobrenome) {
        return pilotoRepository.consultarPorSobrenomeEIdEscuderia(sobrenome, id).stream().map(DadosListagemPiloto::new).collect(Collectors.toList());
    }

    @GetMapping("/{id}/dashboard/vitorias")
    public DadosListagemQuantidade visualizarDashboardVitorias(@PathVariable Integer id) {
        return escuderiaRepository.obterVitorias(id);
    }

    @GetMapping("/{id}/dashboard/pilotos")
    public DadosListagemQuantidade visualizarDashboardQtdPilotos(@PathVariable Integer id) {
        return escuderiaRepository.obterQtdPilotos(id);
    }

    @GetMapping("/{id}/dashboard/periodo")
    public DadosListagemPeriodo visualizarDashboardPeriodo(@PathVariable Integer id) {
        return escuderiaRepository.obterPeriodo(id);
    }

    @GetMapping("{id}/relatorio/vitorias-pilotos")
    public List<DadosListagemVitoriasPiloto> visualizarRelatorioVitoriasPilotos(@PathVariable Integer id) {
        return escuderiaRepository.obterRelatorioPilotosVitorias(id);
    }

    @GetMapping("{id}/relatorio/status")
    public List<DadosListagemQuantidadeItem> visualizarRelatorioStatus(@PathVariable Integer id) {
        return escuderiaRepository.obterRelatorioStatus(id);
    }
}
