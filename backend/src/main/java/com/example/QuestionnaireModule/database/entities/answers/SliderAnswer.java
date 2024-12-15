package com.example.QuestionnaireModule.database.entities.answers;


import jakarta.persistence.Entity;


@Entity
public class SliderAnswer extends AnswerEntity {
    public int answer;


    public SliderAnswer() {
        super();
    }

    public SliderAnswer(Long questionId, int answer) {
        super(questionId);
        this.answer = answer;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }
}
