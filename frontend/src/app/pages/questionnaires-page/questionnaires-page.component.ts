import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {QuestionnairesService} from "../../services/questionnaires.service";
import {QuestionnairePreview} from "../../components/questionnaire-preview/questionnaire-preview.component";
import {ToastDuration, ToastService} from "../../services/toast.service";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {DialogService} from "../../services/dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BackendErrorMessages} from "../../services/BackendErrorMessages";

@Component({
  selector: 'app-questionnaires-page',
  templateUrl: './questionnaires-page.component.html',
  styleUrls: ['./questionnaires-page.component.css']
})
export class QuestionnairesPageComponent {
    private questionnaires: QuestionnairePreview[] = [];


    constructor(private router: Router,
                private questionnairesService: QuestionnairesService,
                private questionnaireService: QuestionnaireService,
                private toastService: ToastService,
                private dialogService: DialogService) {
      this.loadQuestionnaires();
    }

    protected async createQuestionnaire(): Promise<void> {
      try {
        const id = await this.questionnaireService.createNewQuestionnaire()
        await this.router.navigate(["questionnaire", id]);
      }
      catch (error) {
        this.toastService.show("Nepodařilo se vytvořit nový dotazník.", ToastDuration.SHORT);
      }
    }

    private async loadQuestionnaires(): Promise<void> {
      this.questionnaires = await this.questionnairesService.loadQuestionnaires();
    }

    public get getQuestionnaires(): QuestionnairePreview[] {
        return this.questionnaires;
    }

    protected async openQuestionnaire(questionnaire: QuestionnairePreview): Promise<void> {
      await this.router.navigate(["questionnaire", questionnaire.id]);
    }

    protected requestQuestionnairePublishing(questionnaire: QuestionnairePreview): void {
      const title = "Publikovat dotazník";
      const description = "Opravdu si přejete publikovat dotazník '" + questionnaire.name + "'? " +
        "Po publikování nebude možné dotazník upravovat.";

      this.dialogService.openConfirmationDialog(title, description)
        .subscribe(async (confirmed) => {
          if (confirmed) {
            await this.publishQuestionnaire(questionnaire);
          }
        });
    }

    private async publishQuestionnaire(questionnaire: QuestionnairePreview): Promise<void> {
      try {
        await this.questionnaireService.publishQuestionnaire(questionnaire.id);
        questionnaire.published = true;
        this.toastService.show("Dotazník byl úspěšně publikován.", ToastDuration.SHORT);
      } catch (error) {

        const errorResponse = (error as HttpErrorResponse);
        if(errorResponse.error === BackendErrorMessages.EMPTY_QUESTIONNAIRE) {
          this.toastService.show("Nelze publikovat prázdný dotazník.", ToastDuration.SHORT);
          return;
        }

        this.toastService.show("Nepodařilo se publikovat dotazník.", ToastDuration.SHORT);
      }
    }

    protected async requestQuestionnaireDeletion(questionnaire: QuestionnairePreview): Promise<void> {
      const title = "Smazat dotazník";
      const description = "Opravdu si přejete smazat dotazník '" + questionnaire.name + "'?";

      this.dialogService.openConfirmationDialog(title, description)
        .subscribe(async (confirmed) => {
          if (confirmed) {
            await this.deleteQuestionnaire(questionnaire);
          }
        });
    }

    private async deleteQuestionnaire(questionnaire: QuestionnairePreview): Promise<void> {
      try {
        await this.questionnaireService.deleteQuestionnaire(questionnaire.id);
        const index = this.questionnaires.indexOf(questionnaire);
        this.questionnaires.splice(index, 1);
        this.toastService.show("Dotazník '" + questionnaire.name + "' byl smazán.", ToastDuration.LONG);
      } catch (error) {
        console.error("Failed to delete questionnaire: " + error);
        this.toastService.show("Nepodařilo se smazat dotazník.", ToastDuration.SHORT);
      }
    }
}
