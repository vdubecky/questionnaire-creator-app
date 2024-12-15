import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Answer} from "../answers/answer-component/Answer";
import {AnswerConfiguration, AnswerRuleValue, SerializedAnswerData} from "../answers/AnswerComponentsManager";
import {Question} from "./Question";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  public readonly MAX_TITLE_LENGTH: number = 100;
  public readonly MAX_DESCRIPTION_LENGTH: number = 200;

  @Output()
  public onQuestionDeleteButtonClicked: EventEmitter<Question> = new EventEmitter<Question>();

  @Input({required: true})
  public question!: Question;

  private _isExpanded: boolean = false;


  constructor() {}

  protected deleteQuestion(): void {
    this.onQuestionDeleteButtonClicked.emit(this.question);
  }

  protected onAnswerChanged(answer: Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>): void {
   this.question.answer = answer;
  }

  protected toggleExpanded(): void {
    this._isExpanded = !this._isExpanded;
  }

  protected get isExpanded(): boolean {
    return this._isExpanded;
  }
}
