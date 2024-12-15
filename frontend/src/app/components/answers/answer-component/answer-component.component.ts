import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  AnswerComponentsManager,
  AnswerConfiguration,
  SerializedAnswerData,
  AnswerType,
  AnswerTypeGroup,
  AnswerRuleValue
} from "../AnswerComponentsManager";
import {Answer} from "./Answer";
import {GroupBoxAnswer} from "../types/group-box-answer/GroupBoxAnswer";
import {SimpleTextAnswer} from "../types/simple-text-answer/SimpleTextAnswer";
import {SliderAnswer} from "../types/slider-answer-type/SliderAnswer";


@Component({
  selector: 'app-answer-component',
  templateUrl: './answer-component.component.html',
  styleUrls: ['./answer-component.component.css']
})
export class AnswerComponentComponent {
  protected readonly AnswerComponentsManager = AnswerComponentsManager;
  protected readonly AnswerTypeGroup = AnswerTypeGroup;

  @Input({required: true})
  public answer!: Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>

  @Input()
  public isConditionPreview: boolean = false;

  @Input()
  public editable: boolean = true;

  @Output()
  public onAnswerChanged: EventEmitter<Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>> = new EventEmitter<Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>>();


  constructor() {}


  protected get answerType(): AnswerType {
    return this.answer.config.answerType;
  }

  protected set answerType(type: AnswerType) {
    this.answer = AnswerComponentsManager.createEmptyAnswerObject(type);
    this.onAnswerChanged.emit(this.answer);
  }

  protected get groupAnswer(): GroupBoxAnswer {
    return this.answer as GroupBoxAnswer
  }

  protected get textAnswer(): SimpleTextAnswer {
    return this.answer as SimpleTextAnswer;
  }

  protected get sliderAnswer(): SliderAnswer {
    return this.answer as SliderAnswer;
  }
}
