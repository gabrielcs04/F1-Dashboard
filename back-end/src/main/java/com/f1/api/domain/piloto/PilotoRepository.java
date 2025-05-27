package com.f1.api.domain.piloto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface PilotoRepository extends JpaRepository<Piloto, Long> {

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.driver (driverref, number, code, forename, surname, dateofbirth, nationality, url) 
            VALUES (:referencia, :numero, :codigo, :nome, :sobrenome, :dataNascimento, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirPiloto(String referencia, Integer numero, String codigo, String nome, String sobrenome, LocalDate dataNascimento, String nacionalidade, String url);

}
