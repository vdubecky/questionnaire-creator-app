package com.example.QuestionnaireModule.database.entities.answers;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import java.time.LocalDate;


@Entity
public class DateAnswer extends AnswerEntity {
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate answer;


    public DateAnswer() {
        super();
    }

    public DateAnswer(Long questionId, LocalDate answer) {
        super(questionId);
        this.answer = answer;
    }

    public LocalDate getAnswer() {
        return answer;
    }

    public void setAnswer(LocalDate answer) {
        this.answer = answer;
    }
}
