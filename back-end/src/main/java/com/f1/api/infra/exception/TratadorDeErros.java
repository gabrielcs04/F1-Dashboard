package com.f1.api.infra.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;

/**
 * Classe responsável por tratar exceções lançadas na aplicação e
 * retornar respostas HTTP apropriadas para o cliente.
 * Utiliza anotações do Spring para interceptar exceções específicas.
 */
@RestControllerAdvice
public class TratadorDeErros {

    /**
     * Trata exceções do tipo {@link EntityNotFoundException},
     * retornando um status HTTP 404 (Not Found).
     *
     * @return ResponseEntity sem corpo com status 404
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity tratarErro404() {
        return ResponseEntity.notFound().build();
    }

    /**
     * Trata exceções de validação de argumentos de método,
     * retornando status HTTP 400 (Bad Request) com detalhes dos erros de validação.
     *
     * @param ex exceção capturada contendo os erros de validação
     * @return ResponseEntity com lista de erros de validação
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity tratarErro400(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(erros.stream().map(DadosErroValidacao::new).toList());
    }

    /**
     * Trata exceções que indicam que a mensagem HTTP não pôde ser lida,
     * retornando status HTTP 400 (Bad Request) com a mensagem de erro.
     *
     * @param ex exceção capturada
     * @return ResponseEntity com mensagem de erro
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity tratarErro400(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    /**
     * Trata exceções de credenciais inválidas,
     * retornando status HTTP 401 (Unauthorized) com mensagem apropriada.
     *
     * @return ResponseEntity com mensagem de credenciais inválidas
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity tratarErroBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    /**
     * Trata exceções de falha na autenticação,
     * retornando status HTTP 401 (Unauthorized) com mensagem apropriada.
     *
     * @return ResponseEntity com mensagem de falha na autenticação
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity tratarErroAuthentication() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação");
    }

    /**
     * Trata exceções de acesso negado,
     * retornando status HTTP 403 (Forbidden) com mensagem apropriada.
     *
     * @return ResponseEntity com mensagem de acesso negado
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity tratarErroAcessoNegado() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado");
    }

    /**
     * Trata quaisquer outras exceções não tratadas especificamente,
     * retornando status HTTP 500 (Internal Server Error) com a mensagem da exceção.
     *
     * @param ex exceção capturada
     * @return ResponseEntity com mensagem de erro genérica
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity tratarErro500(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + ex.getLocalizedMessage());
    }

    /**
     * Registro interno para representar erros de validação de campos,
     * contendo o nome do campo e a mensagem de erro correspondente.
     *
     * @param campo    Nome do campo com erro
     * @param mensagem Mensagem descritiva do erro de validação
     */
    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }

}
