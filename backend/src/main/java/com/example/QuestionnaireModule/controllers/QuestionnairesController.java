package com.example.QuestionnaireModule.controllers;

import com.example.QuestionnaireModule.database.dto.*;
import com.example.QuestionnaireModule.services.QuestionnairesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/questionnaires")
public class QuestionnairesController {
    private final QuestionnairesService questionnairesService;


    public QuestionnairesController(QuestionnairesService questionnairesService) {
        this.questionnairesService = questionnairesService;
    }

    @GetMapping
    public ResponseEntity<List<QuestionnairePreviewDTO>> getQuestionnairesPreviews() {
        List<QuestionnairePreviewDTO> previewDTOS = questionnairesService.getQuestionnairePreviews();
        return ResponseEntity.ok(previewDTOS);
    }

    @GetMapping("/published")
    public ResponseEntity<List<QuestionnairePreviewDTO>> getPublishedQuestionnairesPreviews() {
        List<QuestionnairePreviewDTO> previewDTOS = questionnairesService.getPublishedQuestionnairesPreviews();
        return ResponseEntity.ok(previewDTOS);
    }
}
