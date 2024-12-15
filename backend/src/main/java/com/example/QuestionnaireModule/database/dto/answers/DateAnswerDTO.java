package com.example.QuestionnaireModule.database.dto.answers;

import java.time.LocalDate;

public record DateAnswerDTO(Long id,
                            LocalDate answer) implements AnswerDTO { }
