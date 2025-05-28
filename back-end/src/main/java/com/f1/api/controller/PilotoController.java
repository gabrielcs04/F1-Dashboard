package com.f1.api.controller;

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
@RequestMapping("pilotos")
public class PilotoController {

    private final PilotoRepository repository;

    public PilotoController(PilotoRepository repository) {
        this.repository = repository;
    }

    @PostMapping()
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        System.out.println(dados);
        repository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

}
