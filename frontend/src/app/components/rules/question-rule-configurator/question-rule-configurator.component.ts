import {Component, Input} from '@angular/core';
import {Rule} from "../question-rule/Rule";
import {QuestionRuleConfigurator} from "./QuestionRuleConfigurator";
import {Question} from "../../question/Question";

@Component({
  selector: 'app-question-rule-configurator',
  templateUrl: './question-rule-configurator.component.html',
  styleUrls: ['./question-rule-configurator.component.css']
})
export class QuestionRuleConfiguratorComponent {
  private _questionRuleConfigurator!: QuestionRuleConfigurator;
  private _question!: Question;
  private _isExpanded: boolean = false;


  constructor() {}

  @Input({required: true})
  public set question(question: Question) {
    this._questionRuleConfigurator = question.ruleConfigurator;
    this._questionRuleConfigurator.otherwiseQuestion = question.ruleConfigurator.otherwiseQuestion;
    this._question = question;
  };

  public get question(): Question {
    return this._question;
  }

  protected addRule(): void {
    this._questionRuleConfigurator.addRule(new Rule(this._question));
  }

  protected get rules(): Rule[] {
    return this._questionRuleConfigurator.rules;
  }

  protected onRuleDeleted(rule: Rule) {
    this._questionRuleConfigurator.deleteRule(rule);
  }

  protected get configurator(): QuestionRuleConfigurator {
    return this._questionRuleConfigurator;
  }

  protected get getHideButtonIcon() {
    return this._isExpanded ? "expand_less" : "expand_more";
  }

  protected toggleExpanded(): void {
    this._isExpanded = !this._isExpanded;
  }

  protected get isExpanded(): boolean {
    return this._isExpanded;
  }
}
