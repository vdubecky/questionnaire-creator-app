import {
  SerializedAnswerData,
  AnswerType,
  AnswerTypeGroup,
  ComparisonMethod,
} from "../../AnswerComponentsManager";
import {Answer} from "../../answer-component/Answer";


export const enum SimpleAnswerType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  TIME = "time"
}

export type SimpleAnswerTypeConfig = {
  answerType: SimpleAnswerType,
}

export type SerializedSimpleAnswer = SimpleAnswerTypeConfig & {
  answerGroup: AnswerTypeGroup
}

export type SimpleAnswerRuleValue = string;

const COMPARISON_METHODS: Map<AnswerType, ComparisonMethod[]> = new Map([
  [SimpleAnswerType.TEXT, [
    {type: "EQUALS", value: "je stejná"},
    {type: "CONTAINS", value: "obsahuje"},
    {type: "STARTS_WITH", value: "začíná"},
    {type: "ENDS_WITH", value: "končí"}
  ]],
  [SimpleAnswerType.DATE, [
    {type: "BEFORE", value: "je před"},
    {type: "AFTER", value: "je po"},
    {type: "EQUALS", value: "je stejná"},
    {type: "NOT_EQUALS", value: "není stejná"},
    {type: "BEFORE_OR_EQUALS", value: "je před nebo stejná"},
    {type: "AFTER_OR_EQUALS", value: "je po nebo stejná"}
  ]],
  [SimpleAnswerType.TIME, [
    {type: "BEFORE", value: "je před"},
    {type: "AFTER", value: "je po"},
    {type: "EQUALS", value: "je stejná"},
    {type: "NOT_EQUALS", value: "není stejná"},
    {type: "BEFORE_OR_EQUALS", value: "je před nebo stejná"},
    {type: "AFTER_OR_EQUALS", value: "je po nebo stejná"}
  ]],
  [SimpleAnswerType.NUMBER, [
    {type: "EQUAL", value: "je stejná"},
    {type: "NOT_EQUAL", value: "není stejná"},
    {type: "GREATER", value: "je větší než"},
    {type: "LESS", value: "je menší než"},
    {type: "GREATER_OR_EQUAL", value: "je větší nebo stejná"},
    {type: "LESS_OR_EQUAL", value: "je menší nebo stejná"}
  ]],
]);


export class SimpleTextAnswer extends Answer<SimpleAnswerTypeConfig, SerializedSimpleAnswer, SimpleAnswerRuleValue> {
  private _value: SimpleAnswerRuleValue = "";

  constructor(config: SerializedAnswerData) {
    super(config as SerializedSimpleAnswer);
  }

  public override getComparisonMethods(): ComparisonMethod[] {
    return COMPARISON_METHODS.get(this.config.answerType) || [];
  }

  public override getSerializedAnswer(): SerializedSimpleAnswer {
    return {
      ...this.config,
      answerGroup: this.group
    }
  }

  protected override parseSerializedData(config: SerializedSimpleAnswer): SimpleAnswerTypeConfig {
    return {
      answerType: config.answerType
    }
  }

  public override getConditionValues(): SimpleAnswerRuleValue {
    return this._value;
  }

  public override setConditionValues(values?: SimpleAnswerRuleValue): void {
    this._value = values || "";
  }
}
