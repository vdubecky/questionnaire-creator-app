import {AnswerType, AnswerTypeGroup, ComparisonMethod, SerializedAnswerData} from "../../AnswerComponentsManager";
import {Answer} from "../../answer-component/Answer";


export const enum SliderAnswerType {
  SELECT = "slider_select"
}

export type SliderAnswerTypeConfig = SliderAnswerSettings & {
  answerType: SliderAnswerType,
}

export type SerializedSliderAnswer = SliderAnswerTypeConfig & {
  answerGroup: AnswerTypeGroup,
}

export type SliderAnswerSettings = {
  min: number,
  max: number
}

export type SliderAnswerRuleValue = number;

const COMPARISON_METHODS: Map<AnswerType, ComparisonMethod[]> = new Map([
  [SliderAnswerType.SELECT, [
    {type: "EQUAL", value: "je stejná"},
    {type: "NOT_EQUAL", value: "není stejná"},
    {type: "GREATER", value: "je větší než"},
    {type: "LESS", value: "je menší než"},
    {type: "GREATER_OR_EQUAL", value: "je větší nebo stejná"},
    {type: "LESS_OR_EQUAL", value: "je menší nebo stejná"}
  ]],
]);


export class SliderAnswer extends Answer<SliderAnswerTypeConfig, SerializedSliderAnswer, SliderAnswerRuleValue>{
  private _value: SliderAnswerRuleValue = 0;


  constructor(config: SerializedAnswerData) {
    super(config as SerializedSliderAnswer);
  }

  public override getComparisonMethods(): ComparisonMethod[] {
    return COMPARISON_METHODS.get(this.config.answerType) || [];
  }

  public override setConditionValues(values?: SliderAnswerRuleValue): void {
    this._value = values || 0;
  }

  public override getConditionValues(): SliderAnswerRuleValue {
    return this._value;
  }

  public override getSerializedAnswer(): SerializedSliderAnswer {
    return {
      answerType: this.config.answerType,
      answerGroup: this.group,
      max: this.config.max,
      min: this.config.min
    };
  }

  protected override parseSerializedData(config?: SerializedSliderAnswer): SliderAnswerTypeConfig {
    return {
      answerType: config?.answerType || SliderAnswerType.SELECT,
      min: config?.min || 0,
      max: config?.max || 100
    };
  }
}
