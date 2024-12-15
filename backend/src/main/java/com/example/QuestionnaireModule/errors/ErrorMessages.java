package com.example.QuestionnaireModule.errors;

public class ErrorMessages {
    public static final String EMPTY_QUESTIONNAIRE = "EMPTY QUESTIONNAIRE";

    public static String QUESTIONNAIRE_WITH_ID_NOT_FOUND(Long id) {
        return "Questionnaire with given id not found: " + id;
    }
}
