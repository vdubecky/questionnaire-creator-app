package com.example.QuestionnaireModule.database.entities.answers;


import jakarta.persistence.Entity;


@Entity
public class NumberAnswer extends AnswerEntity {
    private double answer;


    public NumberAnswer() {
        super();
    }

    public NumberAnswer(Long questionId, double answer) {
        super(questionId);
        this.answer = answer;
    }

    public double getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }
}
