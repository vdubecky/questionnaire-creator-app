package com.example.QuestionnaireModule.services;

import com.example.QuestionnaireModule.database.dto.QuestionDTO;
import com.example.QuestionnaireModule.database.dto.QuestionnaireDTO;
import com.example.QuestionnaireModule.database.entities.QuestionEntity;
import com.example.QuestionnaireModule.database.entities.QuestionnaireEntity;
import com.example.QuestionnaireModule.database.repository.QuestionnairesRepository;
import com.example.QuestionnaireModule.database.repository.QuestionsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
public class QuestionnaireService {
    private final QuestionnairesRepository questionnairesRepository;
    private final QuestionsRepository questionsRepository;


    public QuestionnaireService(QuestionnairesRepository questionnairesRepository, QuestionsRepository questionsRepository) {
        this.questionnairesRepository = questionnairesRepository;
        this.questionsRepository = questionsRepository;
    }

    /**
     * Creates and save new empty questionnaire
     * @return empty questionnaire
     */
    public QuestionnaireEntity createNewQuestionnaire() {
        QuestionnaireEntity questionnaire = new QuestionnaireEntity("Nový dotazník", "");
        return questionnairesRepository.save(questionnaire);
    }

    public QuestionDTO createNewQuestion(Long questionnaireId, QuestionDTO questionTemplate) {
        QuestionnaireEntity questionnaire = questionnairesRepository.findQuestionnaireEntityById(questionnaireId);
        QuestionEntity question = questionTemplate.toEntity(questionnaire);

        return QuestionDTO.toDto(questionsRepository.save(question));
    }

    public void deleteQuestion(Long questionId) {
        questionsRepository.deleteById(questionId);
    }

    public QuestionnaireDTO saveQuestionnaire(QuestionnaireDTO questionnaireEntity) {
        QuestionnaireEntity questionnaire = questionnairesRepository.findQuestionnaireEntityById(questionnaireEntity.id());
        QuestionnaireEntity entity = questionnaireEntity.toEntity(questionnaire);

        return  QuestionnaireDTO.toDto(questionnairesRepository.save(entity));
    }

    public Optional<QuestionnaireDTO> getQuestionnaireById(Long id) {
        Optional<QuestionnaireEntity> entity = questionnairesRepository.getQuestionnaireEntityById(id);
        return entity.map(QuestionnaireDTO::toDto);
    }

    public void deleteQuestionnaireById(Long id) {
        questionnairesRepository.deleteById(id);
    }

    public int setPublished(Long id) {
        return questionnairesRepository.setPublished(id);
    }

    /**
     * Checks if questionnaire is not empty
     * @param id - id of questionnaire
     * @return true if questionnaire is not empty
     */
    public boolean questionnaireIsNotEmpty(Long id) {
        return questionnairesRepository.questionnaireIsNotEmpty(id);
    }
}
