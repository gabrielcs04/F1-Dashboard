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

/**
 * Controlador responsável por gerenciar as operações relacionadas aos pilotos.
 * Fornece endpoints para o cadastro de pilotos, visualização de dashboards e geração de relatórios.
 */
@RestController
@RequestMapping("pilotos")
public class PilotoController {

    private final PilotoRepository pilotoRepository;

    /**
     * Construtor que injeta o repositório de pilotos.
     *
     * @param pilotoRepository Repositório de acesso aos dados dos pilotos.
     */
    public PilotoController(PilotoRepository pilotoRepository) {
        this.pilotoRepository = pilotoRepository;
    }

    /**
     * Endpoint para cadastro de um novo piloto.
     * Recebe os dados de cadastro do piloto, instancia o objeto correspondente e o persiste.
     *
     * @param dados Dados para o cadastro do piloto.
     */
    @PostMapping()
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroPiloto dados) {
        var piloto = new Piloto(dados);
        pilotoRepository.inserirPiloto(
                piloto.getReferencia(),
                piloto.getNumero(),
                piloto.getCodigo(),
                piloto.getNome(),
                piloto.getSobrenome(),
                piloto.getDataNascimento(),
                piloto.getNacionalidade(),
                piloto.getUrl()
        );
    }

    /**
     * Endpoint para visualizar o período de atividade do piloto.
     *
     * @param id Identificador do piloto.
     * @return Dados contendo as informações do período de atividade do piloto.
     */
    @GetMapping("/{id}/dashboard/periodo")
    public ResponseEntity<DadosListagemPeriodo> visualizarDashboardPeriodo(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterPeriodo(id));
    }

    /**
     * Endpoint para visualizar os resultados obtidos pelo piloto.
     *
     * @param id Identificador do piloto.
     * @return Lista de dados com os resultados do piloto.
     */
    @GetMapping("/{id}/dashboard/resultados")
    public ResponseEntity<List<DadosRelatorioResultados>> visualizarDashboardResultados(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterResultados(id));
    }

    /**
     * Endpoint para visualizar um relatório de pontuação do piloto.
     *
     * @param id Identificador do piloto.
     * @return Lista de dados com a pontuação do piloto em diferentes corridas ou temporadas.
     */
    @GetMapping("{id}/relatorio/pontuacao")
    public ResponseEntity<List<DadosListagemPontuacao>> visualizarRelatorioPontuacao(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterRelatorioPontuacao(id));
    }

    /**
     * Endpoint para visualizar um relatório do status do piloto.
     * O relatório agrupa a quantidade de itens conforme os status relacionados ao piloto.
     *
     * @param id Identificador do piloto.
     * @return Lista de dados com a quantidade de itens por status.
     */
    @GetMapping("{id}/relatorio/status")
    public ResponseEntity<List<DadosListagemQuantidadeItem>> visualizarRelatorioStatus(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoRepository.obterRelatorioStatus(id));
    }
}
