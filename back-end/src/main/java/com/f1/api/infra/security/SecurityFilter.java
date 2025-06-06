package com.f1.api.infra.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.f1.api.domain.usuario.Tipo;
import com.f1.api.domain.usuario.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Filtro de segurança que intercepta as requisições HTTP para validar o token JWT presente no cabeçalho Authorization.
 *
 * <p>Se o token for válido, configura o contexto de segurança do Spring com os dados do usuário autenticado, permitindo
 * o controle de acesso baseado no token.</p>
 *
 * <p>Este filtro é executado uma única vez por requisição (herda de {@link OncePerRequestFilter}).</p>
 *
 * @see TokenService
 * @see UsuarioRepository
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepository repository;

    /**
     * Construtor para injeção das dependências.
     *
     * @param tokenService Serviço responsável pela validação e manipulação do token JWT
     * @param repository   Repositório para acesso aos dados dos usuários (não utilizado diretamente aqui, mas pode ser usado futuramente)
     */
    public SecurityFilter(TokenService tokenService, UsuarioRepository repository) {
        this.tokenService = tokenService;
        this.repository = repository;
    }

    /**
     * Executa o filtro para cada requisição HTTP interceptada, validando o token JWT e configurando o contexto de segurança.
     *
     * @param request     objeto que representa a requisição HTTP
     * @param response    objeto que representa a resposta HTTP
     * @param filterChain cadeia de filtros para delegar a execução
     * @throws ServletException em caso de erro no processamento do filtro
     * @throws IOException      em caso de erro de I/O durante o filtro
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var tokenJWT = recuperarToken(request);

        if (tokenJWT != null) {
            DecodedJWT jwt = tokenService.validarToken(tokenJWT);
            Integer idOriginal = jwt.getClaim("idOriginal").asInt();
            String tipo = jwt.getClaim("role").asString();

            List<GrantedAuthority> autorizacoes = List.of(new SimpleGrantedAuthority("ROLE_" + Tipo.valueOf(tipo).toString()));

            var authentication = new UsernamePasswordAuthenticationToken(
                    idOriginal,
                    null,
                    autorizacoes
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Recupera o token JWT do cabeçalho Authorization da requisição HTTP.
     *
     * @param request requisição HTTP atual
     * @return token JWT extraído do cabeçalho ou null se não presente
     */
    private String recuperarToken(HttpServletRequest request) {
        var authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null) {
            return authorizationHeader.replace("Bearer ", "");
        }
        return null;
    }
}
