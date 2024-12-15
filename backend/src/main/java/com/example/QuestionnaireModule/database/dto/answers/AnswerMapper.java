package com.example.QuestionnaireModule.database.dto.answers;

import com.example.QuestionnaireModule.database.entities.answers.*;
import java.util.ArrayList;
import java.util.List;


public class AnswerMapper {
    private AnswerMapper() {}


    public static AnswerDTO toDTO(AnswerEntity entity) {
        Long id = entity.getId();

        if(entity instanceof TextAnswer textAnswerEntity) {
            return new TextAnswerDTO(id, textAnswerEntity.getAnswer());
        } else if(entity instanceof SliderAnswer sliderAnswerEntity) {
            return new SliderAnswerDTO(id, sliderAnswerEntity.getAnswer());
        } else if(entity instanceof NumberAnswer numberAnswerEntity) {
            return new NumberAnswerDTO(id, numberAnswerEntity.getAnswer());
        } else if(entity instanceof RadioButtonAnswer radioButtonAnswerEntity) {
            List<String> result = new ArrayList<>();
            result.add(radioButtonAnswerEntity.getAnswer());
            return new RadioButtonAnswerDTO(id, result);
        } else if(entity instanceof CheckBoxAnswer checkBoxAnswerEntity) {
            return new CheckBoxAnswerDTO(id, checkBoxAnswerEntity.getSelectedAnswer());
        } else if(entity instanceof DateAnswer dateAnswerEntity) {
            return new DateAnswerDTO(id, dateAnswerEntity.getAnswer());
        } else if(entity instanceof TimeAnswer timeAnswerEntity) {
            return new TimeAnswerDTO(id, timeAnswerEntity.getAnswer());
        } else {
            throw new IllegalArgumentException("Unknown entity type: " + entity.getClass());
        }
    }

    public static AnswerEntity toEntity(AnswerDTO dto) {
        Long id = dto.id();

        if(dto instanceof TextAnswerDTO textAnswerDTO) {
            return new TextAnswer(id, textAnswerDTO.answer());
        } else if(dto instanceof SliderAnswerDTO sliderAnswerDTO) {
            return new SliderAnswer(id, sliderAnswerDTO.answer());
        } else if(dto instanceof NumberAnswerDTO numberAnswerDTO) {
            return new NumberAnswer(id, numberAnswerDTO.answer());
        } else if(dto instanceof RadioButtonAnswerDTO radioButtonAnswerDTO) {
            return new RadioButtonAnswer(id, radioButtonAnswerDTO.answer().get(0));
        } else if(dto instanceof CheckBoxAnswerDTO checkBoxAnswerDTO) {
            return new CheckBoxAnswer(id, checkBoxAnswerDTO.answer());
        } else if(dto instanceof DateAnswerDTO dateAnswerDTO) {
            return new DateAnswer(id, dateAnswerDTO.answer());
        } else if(dto instanceof TimeAnswerDTO timeAnswerDTO) {
            return new TimeAnswer(id, timeAnswerDTO.answer());
        } else {
            throw new IllegalArgumentException("Unknown dto type: " + dto.getClass());
        }
    }
}
