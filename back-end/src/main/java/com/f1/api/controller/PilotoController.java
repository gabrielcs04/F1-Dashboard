package com.f1.api.controller;

import com.f1.api.dto.piloto.DadosCadastroPiloto;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.piloto.DadosRelatorioResultados;
import jakarta.validation.Valid;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pilotos")
public class PilotoController {

    private final PilotoRepository repository;
    private final PilotoRepository pilotoRepository;

    public PilotoController(PilotoRepository repository, PilotoRepository pilotoRepository) {
        this.repository = repository;
        this.pilotoRepository = pilotoRepository;
    }

    @PostMapping()
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        System.out.println(dados);
        repository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

    @GetMapping("/{id}/dashboard/periodo")
    public DadosListagemPeriodo visualizarDashboardPeriodo(@PathVariable Integer id) {
        return pilotoRepository.obterPeriodo(id);
    }

    @GetMapping("/{id}/dashboard/resultados")
    public List<DadosRelatorioResultados> visualizarDashboardResultados(@PathVariable Integer id) {
        return pilotoRepository.obterResultados(id);
    }

}
