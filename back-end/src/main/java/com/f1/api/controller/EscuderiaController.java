package com.f1.api.controller;

import com.f1.api.domain.escuderia.EscuderiaRepository;
import com.f1.api.domain.piloto.Piloto;
import com.f1.api.domain.piloto.PilotoRepository;
import com.f1.api.dto.DadosListagemPeriodo;
import com.f1.api.dto.DadosListagemQuantidade;
import com.f1.api.dto.DadosListagemQuantidadeItem;
import com.f1.api.dto.escuderia.DadosListagemVitoriasPiloto;
import com.f1.api.dto.piloto.DadosCadastroPiloto;
import com.f1.api.dto.piloto.DadosListagemPiloto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador responsável por gerenciar operações relacionadas às escuderias e seus pilotos.
 * Fornece endpoints para cadastro de pilotos, consultas e visualizações de dashboards e relatórios.
 */
@RestController
@RequestMapping("escuderias")
public class EscuderiaController {

    private final PilotoRepository pilotoRepository;
    private final EscuderiaRepository escuderiaRepository;

    /**
     * Construtor da classe que injeta os repositórios de escuderia e piloto.
     *
     * @param pilotoRepository    Repositório de acesso aos dados dos pilotos.
     * @param escuderiaRepository Repositório de acesso aos dados das escuderias.
     */
    public EscuderiaController(PilotoRepository pilotoRepository, EscuderiaRepository escuderiaRepository) {
        this.pilotoRepository = pilotoRepository;
        this.escuderiaRepository = escuderiaRepository;
    }

    /**
     * Cadastra um novo piloto no sistema.
     *
     * @param dados Objeto com os dados necessários para o cadastro do piloto.
     */
    @PostMapping("/pilotos")
    @Transactional
    public void cadastrarPiloto(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

    /**
     * Consulta pilotos de uma escuderia filtrando pelo sobrenome.
     *
     * @param id        ID da escuderia.
     * @param sobrenome Sobrenome a ser pesquisado.
     * @return Lista de pilotos que pertencem à escuderia e possuem o sobrenome informado.
     */
    @GetMapping("/{id}/pilotos")
    public ResponseEntity<List<DadosListagemPiloto>> consultarPorSobrenomeEIdEscuderia(@PathVariable Integer id, @RequestParam String sobrenome) {
        return ResponseEntity.ok(
                pilotoRepository.consultarPorSobrenomeEIdEscuderia(sobrenome, id)
                        .stream()
                        .map(DadosListagemPiloto::new)
                        .collect(Collectors.toList())
        );
    }

    /**
     * Visualiza a quantidade de vitórias de uma escuderia.
     *
     * @param id ID da escuderia.
     * @return Dados contendo a quantidade de vitórias.
     */
    @GetMapping("/{id}/dashboard/vitorias")
    public ResponseEntity<DadosListagemQuantidade> visualizarDashboardVitorias(@PathVariable Integer id) {
        return ResponseEntity.ok(escuderiaRepository.obterVitorias(id));
    }

    /**
     * Visualiza a quantidade de pilotos associados a uma escuderia.
     *
     * @param id ID da escuderia.
     * @return Dados contendo a quantidade de pilotos.
     */
    @GetMapping("/{id}/dashboard/pilotos")
    public ResponseEntity<DadosListagemQuantidade> visualizarDashboardQtdPilotos(@PathVariable Integer id) {
        return ResponseEntity.ok(escuderiaRepository.obterQtdPilotos(id));
    }

    /**
     * Visualiza o período de atividade da escuderia.
     *
     * @param id ID da escuderia.
     * @return Dados contendo o ano de início e fim da atividade.
     */
    @GetMapping("/{id}/dashboard/periodo")
    public ResponseEntity<DadosListagemPeriodo> visualizarDashboardPeriodo(@PathVariable Integer id) {
        return ResponseEntity.ok(escuderiaRepository.obterPeriodo(id));
    }

    /**
     * Visualiza um relatório com a quantidade de vitórias por piloto de uma escuderia.
     *
     * @param id ID da escuderia.
     * @return Lista de dados com o número de vitórias por piloto.
     */
    @GetMapping("{id}/relatorio/vitorias-pilotos")
    public ResponseEntity<List<DadosListagemVitoriasPiloto>> visualizarRelatorioVitoriasPilotos(@PathVariable Integer id) {
        return ResponseEntity.ok(escuderiaRepository.obterRelatorioPilotosVitorias(id));
    }

    /**
     * Visualiza um relatório com o status dos pilotos da escuderia (por exemplo: ativos, inativos, etc).
     *
     * @param id ID da escuderia.
     * @return Lista de dados com quantidade por status.
     */
    @GetMapping("{id}/relatorio/status")
    public ResponseEntity<List<DadosListagemQuantidadeItem>> visualizarRelatorioStatus(@PathVariable Integer id) {
        return ResponseEntity.ok(escuderiaRepository.obterRelatorioStatus(id));
    }
}
