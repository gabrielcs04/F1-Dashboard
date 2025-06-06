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

/**
 * Controlador responsável pelas ações administrativas do sistema,
 * como o cadastro de escuderias e pilotos, bem como a visualização de relatórios e dashboards.
 */
@RestController
@RequestMapping("admin")
public class AdminController {

    private final EscuderiaRepository escuderiaRepository;
    private final PilotoRepository pilotoRepository;
    private final AdminRepository adminRepository;

    /**
     * Construtor para injeção de dependências dos repositórios.
     *
     * @param escuderiaRepository Repositório de escuderias.
     * @param pilotoRepository    Repositório de pilotos.
     * @param adminRepository     Repositório de funções administrativas.
     */
    public AdminController(EscuderiaRepository escuderiaRepository, PilotoRepository pilotoRepository, AdminRepository adminRepository) {
        this.escuderiaRepository = escuderiaRepository;
        this.pilotoRepository = pilotoRepository;
        this.adminRepository = adminRepository;
    }

    /**
     * Cadastra uma nova escuderia no sistema.
     *
     * @param dados Dados da escuderia a ser cadastrada.
     */
    @PostMapping("/escuderias")
    @Transactional
    public void cadastrarEscuderia(@RequestBody @Valid DadosCadastroEscuderia dados) {
        var escuderia = new Escuderia(dados);
        escuderiaRepository.inserirEscuderia(escuderia.getReferencia(), escuderia.getNome(), escuderia.getNacionalidade(), escuderia.getUrl());
    }

    /**
     * Cadastra um novo piloto no sistema.
     *
     * @param dados Dados do piloto a ser cadastrado.
     */
    @PostMapping("/pilotos")
    @Transactional
    public void cadastrarPiloto(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(piloto.getReferencia(), piloto.getNumero(), piloto.getCodigo(), piloto.getNome(), piloto.getSobrenome(), piloto.getDataNascimento(), piloto.getNacionalidade(), piloto.getUrl());
    }

    /**
     * Retorna um resumo geral para o dashboard administrativo.
     *
     * @return Dados de visão geral da administração.
     */
    @GetMapping("/dashboard/visao-geral")
    public ResponseEntity<DadosRelatorioVisaoGeral> visualizarDashboardVisaoGeral() {
        return ResponseEntity.ok(adminRepository.obterVisaoGeral());
    }

    /**
     * Retorna os dados das corridas de um ano específico.
     *
     * @param ano Ano desejado.
     * @return Lista de corridas realizadas no ano informado.
     */
    @GetMapping("/dashboard/corridas/{ano}")
    public ResponseEntity<List<DadosListagemCorridas>> visualizarDashboardCorridasAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterCorridasAno(ano));
    }

    /**
     * Retorna o desempenho das escuderias em um ano específico.
     *
     * @param ano Ano desejado.
     * @return Lista de escuderias com suas pontuações.
     */
    @GetMapping("/dashboard/escuderias/{ano}")
    public ResponseEntity<List<DadosListagemPontuacaoItem>> visualizarDashboardEscuderiasAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterEscuderiasAno(ano));
    }

    /**
     * Retorna o desempenho dos pilotos em um ano específico.
     *
     * @param ano Ano desejado.
     * @return Lista de pilotos com suas pontuações.
     */
    @GetMapping("/dashboard/pilotos/{ano}")
    public ResponseEntity<List<DadosListagemPontuacaoItem>> visualizarDashboardPilotosAno(@PathVariable Integer ano) {
        return ResponseEntity.ok(adminRepository.obterPilotosAno(ano));
    }

    /**
     * Retorna um relatório com a quantidade de itens agrupados por status.
     *
     * @return Lista de quantidades por status.
     */
    @GetMapping("/relatorio/status")
    public ResponseEntity<List<DadosListagemQuantidadeItem>> visualizarRelatorioStatus() {
        return ResponseEntity.ok(adminRepository.obterRelatorioStatus());
    }

    /**
     * Retorna os aeroportos cadastrados em uma cidade específica.
     *
     * @param cidade Nome da cidade.
     * @return Lista de aeroportos da cidade.
     */
    @GetMapping("/relatorio/aeroportos/{cidade}")
    public ResponseEntity<List<DadosListagemCidadeAeroporto>> visualizarRelatorioCidadeAeroportos(@PathVariable String cidade) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCidadeAeroportos(cidade));
    }

    /**
     * Retorna uma listagem de escuderias com seus respectivos pilotos.
     *
     * @return Lista de escuderias e seus pilotos.
     */
    @GetMapping("/relatorio/escuderias/pilotos")
    public ResponseEntity<List<DadosListagemPilotosEscuderias>> visualizarRelatorioPilotosEscuderias() {
        return ResponseEntity.ok(adminRepository.obterRelatorioPilotosEscuderias());
    }

    /**
     * Retorna uma listagem das escuderias com corridas que disputaram.
     *
     * @return Lista de escuderias com suas corridas.
     */
    @GetMapping("/relatorio/escuderias/corridas")
    public ResponseEntity<List<DadosListagemCorridasEscuderias>> visualizarRelatorioCorridasEscuderias() {
        return ResponseEntity.ok(adminRepository.obterRelatorioCorridasEscuderias());
    }

    /**
     * Retorna os circuitos em que uma escuderia participou.
     *
     * @param nome Nome da escuderia.
     * @return Lista de circuitos da escuderia.
     */
    @GetMapping("/relatorio/escuderias/{nome}/circuitos")
    public ResponseEntity<List<DadosListagemCircuitosEscuderia>> visualizarRelatorioCircuitosEscuderia(@PathVariable String nome) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCircuitosEscuderia(nome));
    }

    /**
     * Retorna as corridas específicas em que uma escuderia participou.
     *
     * @param nome Nome da escuderia.
     * @return Lista de corridas da escuderia.
     */
    @GetMapping("/relatorio/escuderias/{nome}/corridas")
    public ResponseEntity<List<DadosListagemCorridasEscuderia>> visualizarRelatorioCorridasEscuderia(@PathVariable String nome) {
        return ResponseEntity.ok(adminRepository.obterRelatorioCorridasEscuderia(nome));
    }
}
