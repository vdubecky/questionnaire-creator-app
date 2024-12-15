import {Answer} from "./answer-component/Answer";
import {
  SerializedSimpleAnswer, SimpleAnswerRuleValue,
  SimpleAnswerType,
  SimpleAnswerTypeConfig,
  SimpleTextAnswer
} from "./types/simple-text-answer/SimpleTextAnswer";
import {
  GroupBoxAnswer,
  GroupBoxAnswerType,
  GroupBoxAnswerConfig,
  SerializedGroupBoxAnswer,
  GroupBoxAnswerRuleValue
} from "./types/group-box-answer/GroupBoxAnswer";
import {
  SerializedSliderAnswer,
  SliderAnswer, SliderAnswerRuleValue,
  SliderAnswerType,
  SliderAnswerTypeConfig
} from "./types/slider-answer-type/SliderAnswer";


export type AnswerType = SimpleAnswerType | GroupBoxAnswerType | SliderAnswerType;
export type AnswerConfiguration = SimpleAnswerTypeConfig | GroupBoxAnswerConfig | SliderAnswerTypeConfig;
export type AnswerRuleValue = SimpleAnswerRuleValue | GroupBoxAnswerRuleValue | SliderAnswerRuleValue;
export type SerializedAnswerData =  SerializedSimpleAnswer | SerializedGroupBoxAnswer | SerializedSliderAnswer;

export type ComparisonMethod = {
  value: string,
  type: string
}

export enum AnswerTypeGroup {
  SIMPLE_TEXT,
  GROUP_BOX,
  SLIDER
}

/**
 * Label defines how the answer type will be displayed in the UI.
 */
export type AnswerTypeSelect = {
  type: AnswerType,
  label: string
}

const GROUP_MAPPER = {
  [SimpleAnswerType.TEXT]: SimpleTextAnswer,
  [SimpleAnswerType.NUMBER]: SimpleTextAnswer,
  [SimpleAnswerType.DATE]: SimpleTextAnswer,
  [SimpleAnswerType.TIME]: SimpleTextAnswer,
  [GroupBoxAnswerType.CHECKBOX]: GroupBoxAnswer,
  [GroupBoxAnswerType.RADIO]: GroupBoxAnswer,
  [SliderAnswerType.SELECT]: SliderAnswer
}

const ANSWER_TYPE_STRINGS: AnswerTypeSelect[] = [
  {type: SimpleAnswerType.TEXT, label: "Libovolný text"},
  {type: SimpleAnswerType.NUMBER, label: "Číslo"},
  {type: SimpleAnswerType.DATE, label: "Datum"},
  {type: SimpleAnswerType.TIME, label: "Čas"},
  {type: GroupBoxAnswerType.CHECKBOX, label: "Více možností"},
  {type: GroupBoxAnswerType.RADIO, label: "Právě jedna možnost"},
  {type: SliderAnswerType.SELECT, label: "Posuvník"}
]


/**
 * Manages answer components.
 *
 * For adding a new answer types, add them to the {@link GROUP_MAPPER} and {@link ANSWER_TYPE_STRINGS} and also check
 * the {@link AnswerConfiguration} and {@link AnswerRuleValue} types. Also, every AnswerType should implement the {@link Answer}.
 *
 * AnswerType selector is implemented in the {@link src/app/components/answers/answer-component} component.
 *
 * UI components are implemented in the {@link src/app/components/answers/types} directory.
 */
export class AnswerComponentsManager {

  /**
   * Creates an answer object based on the provided configuration.
   * @param config Serialized answer data
   */
  public static createAnswerObject(config: SerializedAnswerData): Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue> {
    return new GROUP_MAPPER[config.answerType](config);
  }

  /**
   * Creates an empty answer object based on the provided type.
   * @param type Answer type
   * @throws Error if the provided type is unknown
   */
  public static createEmptyAnswerObject(type: AnswerType): Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue> {
    const answer = GROUP_MAPPER[type];
    switch (answer.prototype) {
      case SimpleTextAnswer.prototype:
        return new SimpleTextAnswer({answerType: type as SimpleAnswerType, answerGroup: AnswerTypeGroup.SIMPLE_TEXT});
      case GroupBoxAnswer.prototype:
        return new GroupBoxAnswer({answerType: type as GroupBoxAnswerType, answerGroup: AnswerTypeGroup.GROUP_BOX, options: []});
      case SliderAnswer.prototype:
        return  new SliderAnswer({answerType: type as SliderAnswerType, answerGroup: AnswerTypeGroup.SLIDER, min: 0, max: 100});
      default:
        throw new Error("Unknown answer type");
    }
  }

  /**
   * Every answer type is represented by an object with a type and a label
   * @returns Array of answer types
   */
  public static getAnswerTypeStrings(): AnswerTypeSelect[] {
    return ANSWER_TYPE_STRINGS;
  }
}
