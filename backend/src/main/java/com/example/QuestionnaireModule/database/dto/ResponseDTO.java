package com.example.QuestionnaireModule.database.dto;

import com.example.QuestionnaireModule.database.dto.answers.AnswerDTO;
import com.example.QuestionnaireModule.database.dto.answers.AnswerMapper;
import com.example.QuestionnaireModule.database.entities.ResponseEntity;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;


public record ResponseDTO (
        Long userId,
        Long questionnaireId,
        Long completionTime,
        List<AnswerDTO> answers
) {

    public ResponseEntity toEntity() {
        return new ResponseEntity(userId,
                questionnaireId,
                LocalDateTime.ofInstant(Instant.ofEpochMilli(completionTime), ZoneId.systemDefault()),
                answers.stream().map(AnswerMapper::toEntity).toList());
    }

    public static ResponseDTO toDto(ResponseEntity entity) {
        return new ResponseDTO(entity.getUserId(),
                entity.getQuestionnaireId(),
                entity.getCompletionTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli(),
                entity.getAnswers().stream().map(AnswerMapper::toDTO).toList());
    }
}
