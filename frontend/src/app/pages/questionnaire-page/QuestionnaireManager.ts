import {SerializedAnswerData, AnswerTypeGroup} from "../../components/answers/AnswerComponentsManager";
import {SimpleAnswerType} from "../../components/answers/types/simple-text-answer/SimpleTextAnswer";
import {Question} from "../../components/question/Question";
import {SerializedRuleConfigurator} from "../../components/rules/question-rule-configurator/QuestionRuleConfigurator";
import {EmptyFieldException} from "../../exceptions/EmptyFieldException";


export type Header = {
  id?: string,
  title: string,
  description: string,
}

export type QuestionnaireMetadata = {
  published: boolean,
  validFrom?: string,
  validTo?: string,
  tags?: string[]
}

export type QuestionnaireData = Header & QuestionnaireMetadata & {
  questions: QuestionData[]
}

export type QuestionTemplate<TAnswerConfig, TRuleConfig> = Header & {
  position: number,
  answerConfiguration: TAnswerConfig,
  ruleConfiguration: TRuleConfig
}

export type QuestionData = QuestionTemplate<SerializedAnswerData, SerializedRuleConfigurator>

/**
 * Manages opened questionnaire data and provides methods for adding, deleting and editing questions
 */
export class QuestionnaireManager {
  /**
   * ID of the hypothetical question that cause END of the questionnaire.
   */
  public static readonly END_ID = "-1";

  private readonly _questionnaireHeader: Header;
  private readonly _questions: Question[];
  private readonly _metadata: QuestionnaireMetadata;


  constructor(inputData?: QuestionnaireData) {
    this._questionnaireHeader = { id: inputData?.id, title: inputData?.title || "", description: inputData?.description || "" };

    this._metadata = {
      published: inputData?.published || false,
      validFrom: inputData?.validFrom,
      validTo: inputData?.validTo,
      tags: inputData?.tags
    }

    if(!inputData) {
      this._questions = [];
      return;
    }

    this._questions = inputData.questions.map(questionData => new Question(questionData, this, !inputData.published)) || [];

    for(let i = 0; i < inputData.questions.length; i++) {
      this._questions[i].loadRuleConfigurator(inputData.questions[i].ruleConfiguration);
    }
  }

  public get questions(): readonly Question[] {
    return this._questions;
  }

  public get header(): Header {
    return this._questionnaireHeader;
  }

  /**
   * Adds an empty question to the questionnaire -- {@link emptyQuestion}.
   * Question is added to the end of the questionnaire.
   */
  public addQuestion(question: QuestionData): void {
    this._questions.push(new Question(question, this, true));
  }

  /**
   * Deletes question from the questionnaire and updates the position of the following questions.
   * @param question - question to delete.
   * @returns true if the question was deleted, false if the question was not found.
   */
  public deleteQuestion(question: Question): boolean {
    const index = this._questions.indexOf(question);

    if(index == -1) {
      return false;
    }

    for(let i = index + 1; i < this._questions.length; i++) {
      this._questions[i].data.position--;
    }

    this._questions.splice(index, 1);
    return true;
  }

  public getQuestions(endQuestion?: Question): readonly Question[] {
    if(endQuestion) {
      const endIndex = this.questions.indexOf(endQuestion);
      return this._questions.slice(0, endIndex + 1);
    }
    return this._questions;
  }

  public get metadata(): QuestionnaireMetadata {
    return this._metadata;
  }

  public getQuestionById(id: string): Question | undefined {
    return this._questions.find(question => question.data.id == id);
  }

  public get serializedQuestionnaire(): QuestionnaireData {
    if(!this._questionnaireHeader.title || this._questionnaireHeader.title.trim() === "") {
      throw new EmptyFieldException("Questionnaire title cannot be empty");
    }

    return {
      id: this._questionnaireHeader.id,
      title: this._questionnaireHeader.title,
      description: this._questionnaireHeader.description,
      ...this._metadata,
      questions: this._questions.map(question => question.getSerializedData())
    }
  }

  /**
   * Returns template for an empty question.
   */
  public get emptyQuestion(): QuestionData {
    return { title: "Nová otázka",
      description: "",
      position: this._questions.length,
      answerConfiguration: {
        answerType: SimpleAnswerType.TEXT,
        answerGroup: AnswerTypeGroup.SIMPLE_TEXT
      },
      ruleConfiguration: {
        rules: [],
        otherwiseQuestionId: "END"
      }
    }
  }
}
