import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionTuple, LogicalOperator, Rule} from "./Rule";
import {QuestionnaireManager} from "../../../pages/questionnaire-page/QuestionnaireManager";

@Component({
  selector: 'app-question-rule',
  templateUrl: './question-rule.component.html',
  styleUrls: ['./question-rule.component.css']
})
export class QuestionRuleComponent {
  protected readonly Rule = Rule;

  @Input({required: true})
  public ruleData!: Rule;

  @Output()
  public onRuleDeleteButtonClicked: EventEmitter<Rule> = new EventEmitter<Rule>();


  constructor() {}

  protected addCondition(): void {
    this.ruleData.setConditionOperator(this.ruleData.conditions.length - 1, LogicalOperator.AND);
    this.ruleData.addCondition();
  }

  protected deleteRule() {
    this.onRuleDeleteButtonClicked.emit(this.ruleData);
  }

  protected deleteCondition(condition: ConditionTuple) {
    this.ruleData.deleteCondition(condition);
  }

  protected get manager(): QuestionnaireManager {
    return this.ruleData.nextQuestion.manager;
  }
}
