import {
  AnswerComponentsManager,
  AnswerConfiguration,
  AnswerRuleValue, AnswerType,
  ComparisonMethod,
  SerializedAnswerData
} from "../../answers/AnswerComponentsManager";
import {Question} from "../../question/Question";
import {Answer} from "../../answers/answer-component/Answer";


export type SerializedConditionData = {
  selectedQuestionId: string,
  comparisonMethod: string,
  value: AnswerRuleValue
  answerType: AnswerType
}


/**
 * Represents a single condition in a rule.
 */
export class Condition {
  private readonly _rootQuestion: Question;

  private _selectedQuestion!: Question;
  private _selectedComparisonMethod: ComparisonMethod;
  private _conditionAnswer!: Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue>;


  constructor(rootQuestion: Question, initData?: SerializedConditionData) {
    this._rootQuestion = rootQuestion;
    if(initData) {
      this._selectedQuestion = rootQuestion.manager.getQuestionById(initData.selectedQuestionId) || rootQuestion;
    } else {
      this._selectedQuestion = rootQuestion;
    }

    this._conditionAnswer = AnswerComponentsManager.createAnswerObject(this._selectedQuestion.answer.getSerializedAnswer());
    this._conditionAnswer.setConditionValues(initData?.value);

    this._selectedComparisonMethod = this._selectedQuestion
      .answer
      .getComparisonMethods()
      .find(method => method.type === initData?.comparisonMethod) || this._selectedQuestion.answer.getComparisonMethods()[0];
  }

  public get rootQuestion(): Question {
    return this._rootQuestion;
  }

  public set selectedQuestion(question: Question) {
    this._selectedQuestion = question;
    this._selectedComparisonMethod = question.answer.getComparisonMethods()[0];
    this._conditionAnswer = AnswerComponentsManager.createAnswerObject(question.answer.getSerializedAnswer());
  }

  public get selectedQuestion(): Question {
    return this._selectedQuestion;
  }

  public set selectedComparisonMethod(method: ComparisonMethod) {
    this._selectedComparisonMethod = method;
  }

  public get selectedComparisonMethod(): ComparisonMethod {
    return this._selectedComparisonMethod;
  }

  public get conditionAnswer(): Answer<AnswerConfiguration, SerializedAnswerData, AnswerRuleValue> {
    return this._conditionAnswer;
  }

  public get summary(): SerializedConditionData {
    return {
      selectedQuestionId: this._selectedQuestion.data.id || "",
      comparisonMethod: this._selectedComparisonMethod.type,
      value: this._conditionAnswer.getConditionValues(),
      answerType: this._conditionAnswer.config.answerType
    }
  }
}
