package com.example.QuestionnaireModule.database.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;


@Entity
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private int position;

    @ManyToOne
    @JoinColumn(name = "questionnaire_id", foreignKey = @ForeignKey(name = "fk_questionnaire_id"))
    @JsonBackReference
    private QuestionnaireEntity questionnaire;

    @Column(columnDefinition = "TEXT")
    private String answerConfiguration;

    @Column(columnDefinition = "TEXT")
    private String ruleConfiguration;


    public QuestionEntity() {}

    public QuestionEntity(Long id, String title, String description, int position, QuestionnaireEntity questionnaire, String answer, String rule) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.position = position;
        this.questionnaire = questionnaire;
        this.answerConfiguration = answer;
        this.ruleConfiguration = rule;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getPosition() {
        return position;
    }

    public QuestionnaireEntity getQuestionnaire() {
        return questionnaire;
    }

    public String getRuleConfiguration() {
        return ruleConfiguration;
    }

    public String getAnswerConfiguration() {
        return answerConfiguration;
    }
}
