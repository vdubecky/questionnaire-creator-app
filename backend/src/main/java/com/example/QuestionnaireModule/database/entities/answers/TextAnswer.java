package com.example.QuestionnaireModule.database.entities.answers;


import jakarta.persistence.Entity;


@Entity
public class TextAnswer extends AnswerEntity {
    private String answer;


    public TextAnswer() {
        super();
    }

    public TextAnswer(Long questionId, String answer) {
        super(questionId);
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
