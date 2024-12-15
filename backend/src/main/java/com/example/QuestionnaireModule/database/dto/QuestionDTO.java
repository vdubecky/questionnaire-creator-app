package com.example.QuestionnaireModule.database.dto;

import com.example.QuestionnaireModule.database.entities.QuestionEntity;
import com.example.QuestionnaireModule.database.entities.QuestionnaireEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public record QuestionDTO(
        Long id,
        String title,
        String description,
        int position,
        Long questionnaireId,
        JsonNode answerConfiguration,
        JsonNode ruleConfiguration) {

    public QuestionEntity toEntity(QuestionnaireEntity questionnaire) {
        return new QuestionEntity(
                id,
                title,
                description,
                position,
                questionnaire,
                answerConfiguration.toString(),
                ruleConfiguration.toString());
    }

    public static QuestionDTO toDto(QuestionEntity entity) {
        return new QuestionDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getPosition(),
                entity.getQuestionnaire().getId(),
                parseJson(entity.getAnswerConfiguration()),
                parseJson(entity.getRuleConfiguration()));
    }

    private static JsonNode parseJson(String json) {
        if(json == null || json.isBlank()) {
            return null;
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readTree(json);
        } catch (Exception ex) {
            throw new RuntimeException("Error parsing JSON", ex);
        }
    }
}
