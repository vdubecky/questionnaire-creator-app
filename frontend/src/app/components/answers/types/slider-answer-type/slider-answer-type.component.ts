import {Component} from '@angular/core';
import {SliderAnswer} from "./SliderAnswer";
import {AnswerComponent} from "../AnswerComponent";

@Component({
  selector: 'app-slider-answer-type',
  templateUrl: './slider-answer-type.component.html',
  styleUrls: ['./slider-answer-type.component.css']
})
export class SliderAnswerTypeComponent extends AnswerComponent<SliderAnswer> {
  protected formatValue(value: number): string {
    return value.toString();
  }

  protected get value(): number {
    return this.answerData.getConditionValues();
  }

  protected set value(value: number) {
    this.answerData.setConditionValues(value);
  }
}
