import {Rule, SerializedRuleData} from "../question-rule/Rule";
import {Question} from "../../question/Question";
import {QuestionnaireManager} from "../../../pages/questionnaire-page/QuestionnaireManager";


export type SerializedRuleConfigurator = {
  rules: SerializedRuleData[],
  otherwiseQuestionId: string,
}

/**
 * Rule configurator for a single question.
 * Every question has a one rule configurator. Every rule configurator can have multiple rules.
 * Also contains a reference to the question that will be displayed if no rule is met.
 */
export class QuestionRuleConfigurator {
  private readonly _id?: string;

  private _rules: Rule[] = [];
  private _otherwiseQuestion?: Question;


  constructor(initialData?: SerializedRuleConfigurator, question?: Question) {
    if(initialData && question) {
      this._rules = initialData.rules.map(ruleData => new Rule(question, ruleData));
      this._otherwiseQuestion = question.manager.getQuestionById(initialData.otherwiseQuestionId);
    }
  }

  public addRule(rule: Rule): void {
    this._rules.push(rule);
  }

  public deleteRule(ruleToDelete: Rule): void {
    this._rules = this._rules.filter(rule => rule !== ruleToDelete);
  }

  public get rules(): Rule[] {
    return this._rules;
  }

  /**
   * Returns the question that will be displayed if no rule is met.
   */
  public get otherwiseQuestion(): Question | undefined {
    return this._otherwiseQuestion;
  }

  /**
   * Sets the question that will be displayed if no rule is met.
   * @param question
   */
  public set otherwiseQuestion(question: Question | undefined) {
    this._otherwiseQuestion = question;
  }


  public getSerializedRules(): SerializedRuleConfigurator {
    return {
      rules: this._rules.map(rule => rule.summary),
      otherwiseQuestionId: this._otherwiseQuestion?.data.id || QuestionnaireManager.END_ID,
    }
  }
}
