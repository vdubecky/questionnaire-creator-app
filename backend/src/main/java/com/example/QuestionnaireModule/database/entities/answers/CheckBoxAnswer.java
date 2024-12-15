package com.example.QuestionnaireModule.database.entities.answers;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import java.util.List;


@Entity
public class CheckBoxAnswer extends AnswerEntity {
    @ElementCollection
    private List<String> answer;


    public CheckBoxAnswer() {
        super();
    }

    public CheckBoxAnswer(Long questionId, List<String> answer) {
        super(questionId);
        this.answer = answer;
    }

    public List<String> getSelectedAnswer() {
        return answer;
    }

    public void setAnswer(List<String> answer) {
        this.answer = answer;
    }
}
