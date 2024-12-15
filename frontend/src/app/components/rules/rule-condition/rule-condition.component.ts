import {Component, Input} from '@angular/core';
import {Condition} from "./Condition";
import {QuestionnaireManager} from "../../../pages/questionnaire-page/QuestionnaireManager";
import {AnswerComponentsManager} from "../../answers/AnswerComponentsManager";
import {Question} from "../../question/Question";


@Component({
  selector: 'app-rule-condition',
  templateUrl: './rule-condition.component.html',
  styleUrls: ['./rule-condition.component.css']
})
export class RuleConditionComponent {
  protected readonly AnswerComponentsManager = AnswerComponentsManager;

  @Input({required: true})
  public data!: Condition;


  constructor() {}

  protected get condition(): Condition {
    return this.data;
  }

  protected get manager(): QuestionnaireManager {
    return this.data.rootQuestion.manager;
  }

  protected get selectedQuestion(): Question {
    return this.data.selectedQuestion;
  }

  protected set selectedQuestion(question: Question) {
    this.data.selectedQuestion = question;
  }
}
