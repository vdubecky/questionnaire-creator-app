package com.example.QuestionnaireModule.database.entities.answers;


import jakarta.persistence.Entity;


@Entity
public class RadioButtonAnswer extends AnswerEntity {

    private String answer;


    public RadioButtonAnswer() {
        super();
    }

    public RadioButtonAnswer(Long questionId, String answer) {
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
