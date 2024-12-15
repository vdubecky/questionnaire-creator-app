package com.example.QuestionnaireModule.database.dto;


import java.time.LocalDateTime;


/**
 * Data transfer object for questionnaire preview.
 * @param id - id of questionnaire
 * @param name - name of questionnaire
 * @param description - description of questionnaire
 * @param published - flag indicating if questionnaire is published
 */
public record QuestionnairePreviewDTO(Long id, String name, String description, boolean published, LocalDateTime validFrom, LocalDateTime validTo) { }
