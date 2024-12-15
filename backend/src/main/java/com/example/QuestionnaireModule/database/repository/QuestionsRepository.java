package com.example.QuestionnaireModule.database.repository;

import com.example.QuestionnaireModule.database.entities.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuestionsRepository extends JpaRepository<QuestionEntity, Long> { }
