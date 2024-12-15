package com.example.QuestionnaireModule.services;


import com.example.QuestionnaireModule.database.dto.QuestionnairePreviewDTO;
import com.example.QuestionnaireModule.database.repository.QuestionnairesRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class QuestionnairesService {
    private final QuestionnairesRepository questionnairesRepository;


    public QuestionnairesService(QuestionnairesRepository questionnairesRepository) {
        this.questionnairesRepository = questionnairesRepository;
    }

    /**
     * @return list of all questionnaires
     */
    public List<QuestionnairePreviewDTO> getQuestionnairePreviews() {
        return questionnairesRepository.getQuestionnairePreviews();
    }

    /**
     * @return list of published and valid questionnaires
     */
    public List<QuestionnairePreviewDTO> getPublishedQuestionnairesPreviews() {
        return questionnairesRepository.getPublishedQuestionnairePreviews();
    }
}
