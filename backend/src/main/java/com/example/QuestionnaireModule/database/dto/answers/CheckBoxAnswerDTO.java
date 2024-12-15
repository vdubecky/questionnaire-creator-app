package com.example.QuestionnaireModule.database.dto.answers;

import java.util.List;

public record CheckBoxAnswerDTO(Long id,
                                List<String> answer) implements AnswerDTO {
}
