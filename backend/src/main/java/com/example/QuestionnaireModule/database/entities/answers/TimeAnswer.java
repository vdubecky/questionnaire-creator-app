package com.example.QuestionnaireModule.database.entities.answers;

import jakarta.persistence.Entity;

import java.time.LocalDateTime;
import java.time.LocalTime;


@Entity
public class TimeAnswer extends AnswerEntity {
    private LocalTime answer;


    public TimeAnswer() {
        super();
    }

    public TimeAnswer(Long questionId, LocalTime answer) {
        super(questionId);
        this.answer = answer;
    }

    public LocalTime getAnswer() {
        return answer;
    }

    public void setAnswer(LocalTime time) {
        this.answer = time;
    }
}
