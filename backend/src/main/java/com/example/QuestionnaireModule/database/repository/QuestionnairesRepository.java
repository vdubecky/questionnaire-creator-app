package com.example.QuestionnaireModule.database.repository;

import com.example.QuestionnaireModule.database.dto.QuestionnairePreviewDTO;
import com.example.QuestionnaireModule.database.entities.QuestionnaireEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface QuestionnairesRepository extends JpaRepository<QuestionnaireEntity, Long> {

    /**
     * Gets questionnaire entity by id
     * @param id - id of questionnaire
     * @return Questionnaire entity
     */
    Optional<QuestionnaireEntity> getQuestionnaireEntityById(Long id);

    /**
     * Gets list of questionnaire previews
     * @return List of questionnaire previews {@link QuestionnairePreviewDTO}
     */
    @Transactional
    @Modifying
    @Query("SELECT new com.example.QuestionnaireModule.database.dto.QuestionnairePreviewDTO(q.id, q.title, q.description, q.published, q.validFrom, q.validTo) " +
            "FROM QuestionnaireEntity q")
    List<QuestionnairePreviewDTO> getQuestionnairePreviews();

    @Transactional
    @Modifying
    @Query("SELECT new com.example.QuestionnaireModule.database.dto.QuestionnairePreviewDTO(q.id, q.title, q.description, q.published, q.validFrom, q.validTo) " +
            "FROM QuestionnaireEntity q WHERE q.published = true AND " +
            "(q.validFrom IS NULL or q.validFrom <= CURRENT_TIMESTAMP) AND " +
            "(q.validTo IS NULL or q.validTo >= CURRENT_TIMESTAMP)")
    List<QuestionnairePreviewDTO> getPublishedQuestionnairePreviews();

    @Transactional
    @Modifying
    @Query("UPDATE QuestionnaireEntity q SET q.published = true WHERE q.id = :id")
    int setPublished(Long id);

    @Query("SELECT CASE WHEN COUNT(q) > 0 THEN true ELSE false END FROM QuestionEntity q WHERE q.questionnaire.id = :id")
    boolean questionnaireIsNotEmpty(Long id);

    QuestionnaireEntity findQuestionnaireEntityById(Long id);
}
