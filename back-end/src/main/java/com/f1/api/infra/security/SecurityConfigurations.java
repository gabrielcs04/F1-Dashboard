package com.f1.api.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Classe de configuração da segurança da aplicação, que define regras de autenticação, autorização, CORS e
 * políticas de sessão, além de fornecer beans essenciais para o funcionamento do Spring Security.
 *
 * <p>Configura:
 * <ul>
 *     <li>Filtros de segurança (incluindo filtro customizado para JWT)</li>
 *     <li>Políticas de CORS permitindo acesso do frontend (ex: localhost:3000)</li>
 *     <li>Desabilitação do CSRF para APIs REST stateless</li>
 *     <li>Gerenciamento de sessão stateless (sem estado, sem uso de sessão HTTP)</li>
 *     <li>Regras de autorização baseadas em roles para URLs específicas</li>
 *     <li>Bean para codificação de senhas com BCrypt</li>
 *     <li>Bean para gerenciar autenticação via AuthenticationManager do Spring</li>
 * </ul>
 *
 * @see SecurityFilter
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfigurations {

    private final SecurityFilter securityFilter;

    /**
     * Construtor para injeção do filtro de segurança customizado.
     *
     * @param securityFilter filtro customizado para tratamento do JWT e autenticação.
     */
    public SecurityConfigurations(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    /**
     * Configura o filtro de segurança da aplicação com as regras principais de segurança HTTP.
     *
     * @param http objeto HttpSecurity para configuração
     * @return o SecurityFilterChain configurado para ser usado pelo Spring Security
     * @throws Exception em caso de erro na configuração
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configuração CORS
                .csrf(csrf -> csrf.disable()) // Desativa CSRF pois API é stateless
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sessão stateless
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Permite acesso livre a endpoints de autenticação
                        .requestMatchers("/info-usuario").permitAll() // Permite acesso livre ao endpoint de info de usuário
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Restrito a usuários ADMIN
                        .requestMatchers("/escuderias/**").hasRole("ESCUDERIA") // Restrito a usuários ESCUDERIA
                        .requestMatchers("/pilotos/**").hasRole("PILOTO") // Restrito a usuários PILOTO
                        .anyRequest().authenticated() // Demais requisições requerem autenticação
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class); // Adiciona filtro JWT customizado antes do filtro padrão de autenticação

        return http.build();
    }

    /**
     * Define a configuração CORS permitindo requisições do frontend e configurando métodos, cabeçalhos e credenciais.
     *
     * @return fonte de configuração CORS para a aplicação
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * Bean para expor o AuthenticationManager do Spring, usado para autenticação dos usuários.
     *
     * @param configuration configuração do AuthenticationManager
     * @return AuthenticationManager configurado
     * @throws Exception em caso de erro
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Bean para codificação de senhas usando o algoritmo BCrypt.
     *
     * @return PasswordEncoder que aplica BCrypt nas senhas
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
