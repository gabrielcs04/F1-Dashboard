package com.f1.api.domain.piloto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface PilotoRepository extends JpaRepository<Piloto, Long> {

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.driver (driverref, number, code, forename, surname, dateofbirth, nationality, url) 
            VALUES (:referencia, :numero, :codigo, :nome, :sobrenome, :dataNascimento, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirPiloto(String referencia, Integer numero, String codigo, String nome, String sobrenome, LocalDate dataNascimento, String nacionalidade, String url);

    @Query(value = """
            SELECT DISTINCT d.*
            FROM grupo5.driver d
            INNER JOIN grupo5.results r
            ON UPPER(d.surname) = UPPER(:sobrenome) 
                AND d.driverid = r.driverid 
                AND r.constructorid = :idEscuderia
            """, nativeQuery = true)
    List<Piloto> consultarPorSobrenomeEIdEscuderia(String sobrenome, Long idEscuderia);
}
