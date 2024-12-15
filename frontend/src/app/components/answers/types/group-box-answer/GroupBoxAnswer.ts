import {SerializedAnswerData, AnswerType, AnswerTypeGroup, ComparisonMethod} from "../../AnswerComponentsManager";
import {Answer} from "../../answer-component/Answer";
import {GroupBoxAnswerOption} from "../group-box-answer-option/group-box-answer-option.component";
import {EmptyFieldException} from "../../../../exceptions/EmptyFieldException";


export enum GroupBoxAnswerType {
  CHECKBOX = "checkbox",
  RADIO = "radio"
}

export type GroupBoxAnswerHeaderConfig = {
  answerType: GroupBoxAnswerType,
}

export type GroupBoxAnswerConfig = GroupBoxAnswerHeaderConfig & {
  options: GroupBoxAnswerOption[]
}

export type SerializedGroupBoxAnswer = GroupBoxAnswerHeaderConfig & {
  options: string[],
  answerGroup: AnswerTypeGroup,
}

export type GroupBoxAnswerRuleValue = string[];

const COMPARISON_METHODS = new Map<AnswerType, ComparisonMethod[]>([
  [GroupBoxAnswerType.CHECKBOX, [
    { type: "EQUALS", value: "je stejná" },
    { type: "NOT_EQUALS", value: "není stejná" },
  ]],
  [GroupBoxAnswerType.RADIO, [
    { type: "EQUALS", value: "je stejná" },
    { type: "NOT_EQUALS", value: "není stejná" }
  ]]
]);


export class GroupBoxAnswer extends Answer<GroupBoxAnswerConfig, SerializedGroupBoxAnswer, GroupBoxAnswerRuleValue> {
  public static readonly MINIMUM_OPTIONS_COUNT = 2;

  constructor(config: SerializedAnswerData) {
    super(config as SerializedGroupBoxAnswer);

    for(let i = this.config.options.length; i < GroupBoxAnswer.MINIMUM_OPTIONS_COUNT; i++) {
      this.addOption();
    }
  }

  public addOption(optionText: string = ""): void {
    this.config.options.push({checked: false, optionText});
  }

  public deleteOption(optionToDelete: GroupBoxAnswerOption): void {
    this.config.options = this.config.options.filter(option => option !== optionToDelete);
  }

  public override getComparisonMethods(): ComparisonMethod[] {
    return COMPARISON_METHODS.get(this.config.answerType) || [];
  }

  public override getSerializedAnswer(): SerializedGroupBoxAnswer {
    return {
      answerType: this.config.answerType,
      answerGroup: this.group,
      options: this.config.options.map(option => {
        if(!option.optionText || option.optionText.trim() === "") {
          throw new EmptyFieldException("Option text cannot be empty");
        }
        return option.optionText;
      })
    }
  }

  protected override parseSerializedData(config: SerializedGroupBoxAnswer): GroupBoxAnswerConfig {
    return {
      answerType: config.answerType,
      options: config.options.map(optionText => ({checked: false, optionText}))
    }
  }

  public override getConditionValues(): GroupBoxAnswerRuleValue {
    return this.config.options
      .filter(option => option.checked)
      .map(option => option.optionText);
  }

  public override setConditionValues(values?: GroupBoxAnswerRuleValue): void {
    if(!values) {
      return;
    }

    this.config.options.forEach(option => {
      option.checked = values.includes(option.optionText);
    });
  }
}
