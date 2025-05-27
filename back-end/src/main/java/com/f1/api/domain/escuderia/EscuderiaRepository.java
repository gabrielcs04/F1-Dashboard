package com.f1.api.domain.escuderia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface EscuderiaRepository extends JpaRepository<Escuderia, Long> {

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO grupo5.constructors (constructorref, name, nationality, url) 
            VALUES (:referencia, :nome, :nacionalidade, :url)""",
            nativeQuery = true)
    void inserirEscuderia(String referencia, String nome, String nacionalidade, String url);

}
