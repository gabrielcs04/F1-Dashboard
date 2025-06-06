package com.f1.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicação Spring Boot que inicializa o contexto e executa o servidor.
 */
@SpringBootApplication
public class ApiApplication {

	/**
	 * Ponto de entrada da aplicação.
	 *
	 * @param args argumentos de linha de comando (não utilizados)
	 */
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
