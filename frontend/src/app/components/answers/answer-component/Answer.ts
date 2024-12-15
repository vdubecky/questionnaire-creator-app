import {AnswerConfiguration, SerializedAnswerData, AnswerTypeGroup, ComparisonMethod, AnswerRuleValue} from "../AnswerComponentsManager";


/**
 * Abstract class for all answer types.
 *
 * Every answer type should extend this class and implement the abstract methods.
 * Contains methods for getting and setting answer condition values, parsing serialized data and getting comparison methods.
 */
export abstract class Answer<TConfig extends AnswerConfiguration,
                              TSerialized extends SerializedAnswerData,
                              TAnswerValue extends AnswerRuleValue> {
  private readonly _config: TConfig;
  private readonly _group: AnswerTypeGroup;

  protected constructor(config: TSerialized) {
    this._group = config.answerGroup;
    this._config = this.parseSerializedData(config);
  }

  public get config(): TConfig {
    return this._config;
  }

  public get group(): AnswerTypeGroup {
    return this._group;
  }

  protected abstract parseSerializedData(config?: TSerialized): TConfig;

  /**
   * Returns actual answer data in serialized form.
   */
  public abstract getSerializedAnswer(): TSerialized;

  /**
   * Returns values that will be used during condition evaluation.
   */
  public abstract getConditionValues(): TAnswerValue;

  /**
   * Sets values that will be used during condition evaluation.
   * @param values
   */
  public abstract setConditionValues(values?: TAnswerValue): void;

  /**
   * Returns comparison methods for selected answer type.
   */
  public abstract getComparisonMethods(): ComparisonMethod[];
}
