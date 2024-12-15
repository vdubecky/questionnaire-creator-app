package com.example.QuestionnaireModule.controllers;

import com.example.QuestionnaireModule.database.dto.QuestionDTO;
import com.example.QuestionnaireModule.database.dto.QuestionnaireDTO;
import com.example.QuestionnaireModule.errors.ErrorMessages;
import com.example.QuestionnaireModule.services.QuestionnaireService;
import com.example.QuestionnaireModule.database.entities.QuestionEntity;
import com.example.QuestionnaireModule.database.entities.QuestionnaireEntity;
import com.example.QuestionnaireModule.requests.DeleteQuestionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/questionnaire")
public class QuestionnaireController {
    private final QuestionnaireService questionnaireService;


    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionnaireById(@PathVariable Long id) {
        Optional<QuestionnaireDTO> questionnaire = questionnaireService.getQuestionnaireById(id);

        if(questionnaire.isPresent()) {
            return ResponseEntity.ok(questionnaire.get());
        }

        return ResponseEntity.badRequest().body(ErrorMessages.QUESTIONNAIRE_WITH_ID_NOT_FOUND(id));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteQuestionnaireById(@PathVariable Long id) {
        try {
            questionnaireService.deleteQuestionnaireById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Long> createNewQuestionnaire() {
        Long id = questionnaireService.createNewQuestionnaire().getId();
        return ResponseEntity.ok(id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> saveQuestionnaire(@RequestBody QuestionnaireDTO questionnaire) {
        try {
            QuestionnaireDTO questionnaireEntity = questionnaireService.saveQuestionnaire(questionnaire);
            return ResponseEntity.ok(questionnaireEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/publish")
    private ResponseEntity<?> publishQuestionnaire(@PathVariable Long id) {
        try {
            boolean isNotEmpty = questionnaireService.questionnaireIsNotEmpty(id);

            if(!isNotEmpty) {
                return ResponseEntity.badRequest().body(ErrorMessages.EMPTY_QUESTIONNAIRE);
            }

            int changesCount = questionnaireService.setPublished(id);

            if(changesCount == 0) {
                return ResponseEntity.badRequest().body(ErrorMessages.QUESTIONNAIRE_WITH_ID_NOT_FOUND(id));
            }

            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/createQuestion")
    private ResponseEntity<?> createQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionTemplate) {
        try {
            QuestionDTO questionEntity = questionnaireService.createNewQuestion(id, questionTemplate);
            return ResponseEntity.ok(questionEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/deleteQuestion")
    private ResponseEntity<?> deleteQuestion(@PathVariable Long id, @RequestBody DeleteQuestionRequest questionId) {
        try {
            questionnaireService.deleteQuestion(questionId.questionId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

