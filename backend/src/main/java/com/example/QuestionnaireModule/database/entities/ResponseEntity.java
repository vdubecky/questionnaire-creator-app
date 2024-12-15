package com.example.QuestionnaireModule.database.entities;


import com.example.QuestionnaireModule.database.entities.answers.AnswerEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
public class ResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long questionnaireId;

    private LocalDateTime completionTime;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "response_id")
    private List<AnswerEntity> answers;


    public ResponseEntity() {}

    public ResponseEntity(Long userId, Long questionnaireId, LocalDateTime completionTime, List<AnswerEntity> answers) {
        this.userId = userId;
        this.questionnaireId = questionnaireId;
        this.completionTime = completionTime;
        this.answers = answers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDateTime getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(LocalDateTime completionTime) {
        this.completionTime = completionTime;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(Long questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public List<AnswerEntity> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerEntity> answers) {
        this.answers = answers;
    }
}
