package com.example.QuestionnaireModule.database.dto.answers;


import java.time.LocalTime;


public record TimeAnswerDTO(Long id,
                            LocalTime answer) implements AnswerDTO{ }
