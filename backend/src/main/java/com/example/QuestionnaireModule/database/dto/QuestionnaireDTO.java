package com.example.QuestionnaireModule.database.dto;

import com.example.QuestionnaireModule.database.entities.QuestionnaireEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


public record QuestionnaireDTO (
    Long id,
    String title,
    String description,
    boolean published,
    LocalDateTime validFrom,
    LocalDateTime validTo,
    List<String> tags,
    List<QuestionDTO> questions) {


    public QuestionnaireEntity toEntity(QuestionnaireEntity questionnaire) {
        return new QuestionnaireEntity(
                id,
                title,
                description,
                published,
                validFrom,
                validTo,
                tags,
                questions.stream().map(dto -> dto.toEntity(questionnaire)).toList());
    }

    public static QuestionnaireDTO toDto(QuestionnaireEntity entity) {
        return new QuestionnaireDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.isPublished(),
                entity.getValidFrom(),
                entity.getValidTo(),
                entity.getTags(),
                entity.getQuestions().stream().map(QuestionDTO::toDto).collect(Collectors.toList()));
    }
}
