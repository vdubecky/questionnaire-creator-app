import {QuestionData, QuestionnaireManager} from "../../pages/questionnaire-page/QuestionnaireManager";
import {Answer} from "../answers/answer-component/Answer";
import {AnswerComponentsManager, AnswerConfiguration, AnswerRuleValue, SerializedAnswerData} from "../answers/AnswerComponentsManager";
import {QuestionRuleConfigurator, SerializedRuleConfigurator} from "../rules/question-rule-configurator/QuestionRuleConfigurator";
import {EmptyFieldException} from "../../exceptions/EmptyFieldException";


/**
 * Class that represents a single question in the questionnaire.
 * Contains the question data, answer and rule configurator.
 */
export class Question {
  private readonly _data: QuestionData;
  private readonly _manager: QuestionnaireManager;
  private readonly _editable: boolean;

  private _answer: Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>;
  private _ruleConfigurator: QuestionRuleConfigurator;


  /**
   * Creates a new question object.
   * @param data initial data
   * @param manager questionnaire manager for current questionnaire
   * @param editable indicates whether the question is editable or not
   */
  constructor(data: QuestionData, manager: QuestionnaireManager, editable: boolean) {
    this._data = data;
    this._manager = manager;
    this._editable = editable;
    this._answer = AnswerComponentsManager.createAnswerObject(data.answerConfiguration);
    this._ruleConfigurator = new QuestionRuleConfigurator();
  }

  public loadRuleConfigurator(initialData?: SerializedRuleConfigurator): void {
    this._ruleConfigurator = new QuestionRuleConfigurator(initialData, this);
  }

  public get answer(): Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue> {
    return this._answer;
  }

  public set answer(answer: Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>) {
    this._answer = answer;
  }

  public get data(): QuestionData {
    return this._data;
  }

  public get manager(): QuestionnaireManager {
    return this._manager;
  }

  public get ruleConfigurator(): QuestionRuleConfigurator {
    return this._ruleConfigurator;
  }

  public get editable(): boolean {
    return this._editable;
  }

  public getSerializedData(): QuestionData {
    if(!this._data.title || this._data.title.trim() === "") {
      throw new EmptyFieldException("Question title cannot be empty");
    }

    return {
      id: this._data.id,
      position: this._data.position,
      title: this._data.title,
      description: this._data.description,
      answerConfiguration: this._answer.getSerializedAnswer(),
      ruleConfiguration: this._ruleConfigurator.getSerializedRules()
    }
  }
}
