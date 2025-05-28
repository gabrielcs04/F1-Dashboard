package com.f1.api.controller;

import com.f1.api.domain.escuderia.DadosCadastroEscuderia;
import com.f1.api.domain.escuderia.Escuderia;
import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.DadosCadastroPiloto;
import com.f1.api.domain.piloto.DadosListagemPiloto;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("escuderia")
public class EscuderiaController {

    private final PilotoRepository pilotoRepository;

    public EscuderiaController(PilotoRepository pilotoRepository) {
        this.pilotoRepository = pilotoRepository;
    }

    @PostMapping("/pilotos")
    @Transactional
    public void cadastrarPiloto(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        System.out.println(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }


    @GetMapping("/{id}/pilotos")
    public List<DadosListagemPiloto> consultarPorSobrenomeEIdEscuderia(@PathVariable Long id, @RequestParam String sobrenome) {
        return pilotoRepository.consultarPorSobrenomeEIdEscuderia(sobrenome, id).stream().map(DadosListagemPiloto::new).collect(Collectors.toList());
    }
}
