package com.example.QuestionnaireModule.database.dto.answers;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "answerType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TextAnswerDTO.class, name = "text"),
        @JsonSubTypes.Type(value = NumberAnswerDTO.class, name = "number"),
        @JsonSubTypes.Type(value = TimeAnswerDTO.class, name = "time"),
        @JsonSubTypes.Type(value = DateAnswerDTO.class, name = "date"),
        @JsonSubTypes.Type(value = CheckBoxAnswerDTO.class, name = "checkbox"),
        @JsonSubTypes.Type(value = RadioButtonAnswerDTO.class, name = "radio"),
        @JsonSubTypes.Type(value = SliderAnswerDTO.class, name = "slider_select"),
})
public sealed interface AnswerDTO permits CheckBoxAnswerDTO, DateAnswerDTO, NumberAnswerDTO, RadioButtonAnswerDTO, SliderAnswerDTO, TextAnswerDTO, TimeAnswerDTO {
    Long id();
}
