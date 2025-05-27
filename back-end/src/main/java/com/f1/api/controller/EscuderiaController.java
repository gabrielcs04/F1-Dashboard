package com.f1.api.controller;

import com.f1.api.domain.escuderia.DadosCadastroEscuderia;
import com.f1.api.domain.escuderia.Escuderia;
import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.DadosListagemPiloto;
import com.f1.api.domain.piloto.PilotoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("escuderias")
public class EscuderiaController {

    @Autowired
    private EscuderiaRepository escuderiaRepository;

    @Autowired
    private PilotoRepository pilotoRepository;

    @PostMapping()
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroEscuderia dados) {
        var escuderia = new Escuderia(dados);
        escuderiaRepository.inserirEscuderia(escuderia.getReferencia(), escuderia.getNome(), escuderia.getNacionalidade(), escuderia.getUrl());
    }


    @GetMapping("/{id}/pilotos")
    public List<DadosListagemPiloto> consultarPorSobrenomeEIdEscuderia(@PathVariable Long id, @RequestParam String sobrenome) {
        return pilotoRepository.consultarPorSobrenomeEIdEscuderia(sobrenome, id).stream().map(DadosListagemPiloto::new).collect(Collectors.toList());
    }
}
