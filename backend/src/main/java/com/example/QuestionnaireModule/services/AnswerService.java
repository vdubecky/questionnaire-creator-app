package com.example.QuestionnaireModule.services;

import com.example.QuestionnaireModule.database.dto.ResponseDTO;
import com.example.QuestionnaireModule.database.dto.answers.AnswerDTO;
import com.example.QuestionnaireModule.database.dto.answers.AnswerMapper;
import com.example.QuestionnaireModule.database.entities.answers.AnswerEntity;
import com.example.QuestionnaireModule.database.repository.AnswersRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;


@Service
public class AnswerService {
    private final AnswersRepository answerRepository;


    public AnswerService(AnswersRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public void saveAnswers(@RequestBody ResponseDTO responseDTO) {
        answerRepository.save(responseDTO.toEntity());
    }
}
