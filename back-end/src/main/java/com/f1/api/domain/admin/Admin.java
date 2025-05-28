package com.f1.api.domain.admin;

import com.f1.api.domain.escuderia.DadosCadastroEscuderia;
import jakarta.persistence.*;

import java.util.Objects;

@Entity(name = "Admin")
public class Admin {

    @Id
    private Long id = 1L;

}
