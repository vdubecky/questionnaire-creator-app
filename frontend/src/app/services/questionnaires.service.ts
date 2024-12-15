import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestionnairePreview} from "../components/questionnaire-preview/questionnaire-preview.component";


@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {
  public static readonly QUESTIONNAIRES_API = 'http://localhost:8080/api/questionnaires';


  constructor(private httpClient: HttpClient){}

  /**
   * Fetches all questionnaires previews from the server.
   * @throws error if the questionnaires are not found.
   */
  public async loadQuestionnaires(): Promise<QuestionnairePreview[]> {
    return new Promise<QuestionnairePreview[]>((resolve, reject) => {
      this.httpClient
        .get<QuestionnairePreview[]>(QuestionnairesService.QUESTIONNAIRES_API)
        .subscribe((questionnaires) => {
          console.log(questionnaires);
          if(questionnaires == null) {
            reject("Loading questionnaires failed");
          }
          resolve(questionnaires);
        });
    });
  }
}
