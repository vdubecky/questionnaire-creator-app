import {Component} from '@angular/core';
import {SimpleAnswerRuleValue, SimpleAnswerType, SimpleTextAnswer} from "./SimpleTextAnswer";
import {AnswerComponent} from "../AnswerComponent";


@Component({
  selector: 'app-simple-text-answer',
  templateUrl: './simple-text-answer.component.html',
  styleUrls: ['./simple-text-answer.component.css']
})
export class SimpleTextAnswerComponent extends AnswerComponent<SimpleTextAnswer> {
  protected get getSimpleAnswerType() {
    return this.answerData.config.answerType;
  }

  protected get getAnswerTypeLabel() {
    switch (this.answerData.config.answerType) {
      case SimpleAnswerType.TEXT:
        return "Odpovědí je libovolný text";
      case SimpleAnswerType.NUMBER:
        return "Odpovědí je číslo";
      case SimpleAnswerType.DATE:
        return "Odpovědí je datum";
      case SimpleAnswerType.TIME:
        return "Odpovědí je čas";
      default:
        return "";
    }
  }

  protected get value(): SimpleAnswerRuleValue {
    return this.answerData.getConditionValues();
  }

  protected set value(value: SimpleAnswerRuleValue) {
    this.answerData.setConditionValues(value);
  }
}
