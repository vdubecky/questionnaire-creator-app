import {QuestionData, QuestionnaireData, QuestionnaireManager} from "./QuestionnaireManager";
import {SerializedRuleData} from "../../components/rules/question-rule/Rule";
import {SerializedConditionData} from "../../components/rules/rule-condition/Condition";


export class QuestionnaireValidator {
  public static resolveQuestionnaireFlow(questionnaire: QuestionnaireData): void {
    QuestionnaireValidator.fixOtherwiseQuestionIds(questionnaire.questions);
    QuestionnaireValidator.fixRulesSettings(questionnaire.questions);
  }

  public static fixOtherwiseQuestionIds(questions: QuestionData[]): void {
    const questionsMap: Map<String, QuestionData> = new Map();
    questions.forEach(question => questionsMap.set(question.id || QuestionnaireManager.END_ID, question));

    for(let i = 0; i < questions.length - 1; i++) {
      const question = questions[i];

      const otherwiseQuestion = question.ruleConfiguration.otherwiseQuestionId;
      if(otherwiseQuestion == QuestionnaireManager.END_ID || !questionsMap.has(otherwiseQuestion)) {
        question.ruleConfiguration.otherwiseQuestionId = questions[i + 1].id || QuestionnaireManager.END_ID;
      }
    }
  }

  public static fixRulesSettings(questions: QuestionData[]) {
      const questionsMap: Map<String, QuestionData> = new Map();
      const rulesToDelete: Set<SerializedRuleData> = new Set();

      questions.forEach(question => questionsMap.set(question.id || QuestionnaireManager.END_ID, question));

      for(const question of questions) {
        for(const rule of question.ruleConfiguration.rules) {
          QuestionnaireValidator.fixQuestionRule(rule, questionsMap);

          if(rule.conditions.length == 0) {
            rulesToDelete.add(rule);
          }
        }
      }

      questions.forEach(question=>
        question.ruleConfiguration.rules = question.ruleConfiguration.rules.filter(rule => !rulesToDelete.has(rule)));
  }

  private static fixQuestionRule(rule: SerializedRuleData, questionsMap: Map<String, QuestionData>): void {
    const conditionToDelete: Set<SerializedConditionData> = new Set();

    for(const condition of rule.conditions) {
      const conditionQuestion = questionsMap.get(condition.selectedQuestionId);

      if(!conditionQuestion || !QuestionnaireValidator.hasSameType(condition, conditionQuestion)) {
        conditionToDelete.add(condition);
      }
    }

    rule.conditions = rule.conditions.filter(condition => !conditionToDelete.has(condition));
  }

  public static hasSameType(condition: SerializedConditionData, question: QuestionData): boolean {
    return condition.answerType == question.answerConfiguration.answerType;
  }
}
