import {Condition, SerializedConditionData} from "../rule-condition/Condition";
import {Question} from "../../question/Question";
import {SerializedRuleConfigurator} from "../question-rule-configurator/QuestionRuleConfigurator";
import {QuestionnaireManager} from "../../../pages/questionnaire-page/QuestionnaireManager";


export type ConditionTuple = {
  condition: Condition,
  operator?: LogicalOperator,
}

export enum LogicalOperator {
  AND = "AND",
  OR = "OR",
}

export type LogicalOperatorTuple = {
  operator: LogicalOperator
  operatorLabel: string
}

export type SerializedRuleData = {
  conditions: (SerializedConditionData & {
    logicalOperator?: LogicalOperator
  })[]
  thenQuestionId: string
}

/**
 * Represent a single question rule
 * Every question can have multiple rules and every rule can have multiple conditions.
 *
 * Contains a reference to the next question that will be displayed if the rules is met.
 */
export class Rule {
  public static readonly LOGICAL_OPERATORS: LogicalOperatorTuple[] = [
    {operator: LogicalOperator.AND, operatorLabel: "a zároveň"},
    {operator: LogicalOperator.OR, operatorLabel: "nebo"}
  ];

  private readonly _rootQuestion: Question;

  private _conditions: ConditionTuple[] = [];
  private _nextQuestion: Question;


  constructor(question: Question, initialData?: SerializedRuleData) {
    this._rootQuestion = question;
    this._nextQuestion = question.manager.getQuestionById(initialData?.thenQuestionId || QuestionnaireManager.END_ID) || question

    this.loadInitialConditions(initialData);
  }

  private loadInitialConditions(initialData?: SerializedRuleData): void {
    if(!initialData) {
      this._conditions.push({condition: new Condition(this._rootQuestion)});
      return;
    }

    for(const conditionData of initialData.conditions) {
      const condition = new Condition(this._rootQuestion, conditionData);
      this._conditions.push({condition, operator: conditionData.logicalOperator});
    }
  }

  public addCondition(): void {
    this._conditions.push({condition: new Condition(this._rootQuestion)});
  }

  public setConditionOperator(index: number, operator: LogicalOperator): void {
    if(index < 0 || index >= this._conditions.length) {
      return;
    }

    this._conditions[index].operator = operator;
  }

  public get conditions(): ConditionTuple[] {
    return this._conditions;
  }

  /**
   * Deletes a condition from the rule and removes the operator if the condition was the last one in the rule.
   * @param conditionToDelete
   * @returns true if the condition was deleted
   */
  public deleteCondition(conditionToDelete: ConditionTuple): boolean {
    const index = this._conditions.indexOf(conditionToDelete);

    if(index === -1) {
      return false;
    }

    if(index === this._conditions.length - 1 && index > 0) {
      this._conditions[index - 1].operator = undefined;
    }

    this._conditions.splice(index, 1);
    return true;
  }

  /**
   * Sets question that will be displayed if the rule is met.
   * @param question
   */
  public set nextQuestion(question: Question) {
    this._nextQuestion = question;
  }

  /**
   * Returns the question that will be displayed if the rule is met.
   */
  public get nextQuestion(): Question {
    return this._nextQuestion;
  }

  public get summary(): SerializedRuleData {
    return {
      conditions: this._conditions.map(condition => {
        return {
          ...condition.condition.summary,
          logicalOperator: condition.operator
        }
      }),
      thenQuestionId: this._nextQuestion.data.id || "END"
    }
  }
}
