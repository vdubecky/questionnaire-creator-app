import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuestionData, QuestionnaireData, QuestionnaireManager} from "../pages/questionnaire-page/QuestionnaireManager";
import {catchError, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  public static readonly QUESTIONNAIRE_API= "http://localhost:8080/api/questionnaire";
  public static readonly QUESTIONNAIRE_API_WITH_ID= "http://localhost:8080/api/questionnaire/{id}";
  public static readonly QUESTIONNAIRE_API_CREATE_QUESTION = QuestionnaireService.QUESTIONNAIRE_API_WITH_ID + "/createQuestion";
  public static readonly QUESTIONNAIRE_API_DELETE_QUESTION = QuestionnaireService.QUESTIONNAIRE_API_WITH_ID + "/deleteQuestion";


  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches questionnaire data from the server.
   * @param id - id of the questionnaire to fetch.
   * @throws error if the questionnaire is not found.
   */
  public async loadQuestionnaireById(id: string): Promise<QuestionnaireManager> {
    return new Promise<QuestionnaireManager>((resolve, reject) => {
      this.httpClient
        .get<QuestionnaireData>(QuestionnaireService.QUESTIONNAIRE_API_WITH_ID.replace("{id}", id.toString()))
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe((questionnaireData) => {
          console.log("DATA FROM SERVER: " + JSON.stringify(questionnaireData));

          if(questionnaireData == null) {
            reject("Questionnaire not found");
          }

          resolve(new QuestionnaireManager(questionnaireData));
        });
    });
  }

  public async createNewQuestionnaire(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.httpClient
        .get<number>(QuestionnaireService.QUESTIONNAIRE_API)
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe((questionnaireId) => {
          console.log("DATA FROM SERVER: " + JSON.stringify(questionnaireId));

          if(questionnaireId == null) {
            reject("Questionnaire not found");
          }

          resolve(questionnaireId);
        });
    })
  }

  public async createNewQuestion(id: string, template: QuestionData): Promise<QuestionData> {
    return new Promise<QuestionData>((resolve, reject) => {
      this.httpClient
        .post<QuestionData>(QuestionnaireService.QUESTIONNAIRE_API_CREATE_QUESTION.replace("{id}", id.toString()), template)
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe((question: QuestionData) => {
          console.log("DATA FROM SERVER: " + JSON.stringify(question));

          if(question == null) {
            reject("Questionn not found");
          }

          resolve(question);
        });
    })
  }

  public async deleteQuestion(id: string, questionId: string): Promise<void> {
    const body = { questionId }

    return new Promise<void>((resolve, reject) => {
      this.httpClient
        .delete<string>(QuestionnaireService.QUESTIONNAIRE_API_DELETE_QUESTION.replace("{id}", id.toString()), {headers: new HttpHeaders(), body})
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe(() => {
          resolve();
        });
    })
  }

  /**
   * Saves the questionnaire data to the server
   * @param data - questionnaire data to save.
   * @throws error when saving fails.
   */
  public async saveQuestionnaire(data: QuestionnaireData): Promise<void> {
    console.log("SENDING DATA: " + JSON.stringify(data));

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<QuestionnaireData>(QuestionnaireService.QUESTIONNAIRE_API_WITH_ID.replace("{id}", data.id!.toString()), data)
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe((response: QuestionnaireData) => {
          console.log("DATA FROM SERVER: " + JSON.stringify(response));
          if(response == null) {
            reject();
            return;
          }

          resolve();
        });
    });
  }

  /**
   * Deletes the questionnaire by the given id.
   * @param id - id of the questionnaire to delete.
   * @throws error when deleting fails.
   */
  public async deleteQuestionnaire(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient
        .delete(`${QuestionnaireService.QUESTIONNAIRE_API}/${id}`)
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe(() => {
          resolve();
        });
    });
  }

  /**
   * Publishes the questionnaire by the given id.
   * @param id - id of the questionnaire to publish.
   * @throws error when publishing fails.
   */
  public async publishQuestionnaire(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient
        .patch(`${QuestionnaireService.QUESTIONNAIRE_API}/${id}/publish`, null)
        .pipe(catchError((error) => {
          reject(error);
          return throwError(() => error)
        }))
        .subscribe(() => {
          resolve();
        });
    });
  }
}
