package com.example.QuestionnaireModule.controllers;


import com.example.QuestionnaireModule.database.dto.ResponseDTO;
import com.example.QuestionnaireModule.database.dto.answers.AnswerDTO;
import com.example.QuestionnaireModule.database.entities.answers.AnswerEntity;
import com.example.QuestionnaireModule.services.AnswerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/answers")
public class AnswersController {
    private final AnswerService answerService;


    public AnswersController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public void saveAnswers(@RequestBody ResponseDTO responseDTO) {
        answerService.saveAnswers(responseDTO);
    }
}
