import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {QuestionnaireManager} from "./QuestionnaireManager";
import {Question} from "../../components/question/Question";
import {ToastDuration, ToastService} from "../../services/toast.service";
import {QuestionnairePreviewComponent} from "../../components/questionnaire-preview/questionnaire-preview.component";
import {QuestionnairesPageComponent} from "../questionnaires-page/questionnaires-page.component";
import {DialogService} from "../../services/dialog.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {EmptyFieldException} from "../../exceptions/EmptyFieldException";
import {QuestionnaireValidator} from "./QuestionnaireValidator";

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.css']
})
export class QuestionnairePageComponent {
  protected readonly QuestionnairePreviewComponent = QuestionnairePreviewComponent;
  protected readonly QuestionnairesPageComponent = QuestionnairesPageComponent;

  public readonly MAX_DESCRIPTION_LENGTH: number = 200;
  public readonly MAX_TITLE_LENGTH: number = 100;
  public readonly MAX_TAG_LENGTH: number = 20;

  private _manager: QuestionnaireManager = new QuestionnaireManager();
  private _timeValidityEnabled: boolean = false;
  private _isQuestionsEditor: boolean = true;


  constructor(private questionnaireService: QuestionnaireService,
              private toast: ToastService,
              private dialog: DialogService,
              private router: Router,
              private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get("id") || undefined;
    this.loadQuestionnaire(id);
  }


  protected async addQuestion(): Promise<void> {
    try {
      const question = await this.questionnaireService.createNewQuestion(this.manager.header.id!, this.manager.emptyQuestion);
      this.manager.addQuestion(question);
    } catch (error) {
      console.log(error);
      this.toast.show("Nepodařilo se přidat otázku.", ToastDuration.SHORT);
    }
  }

  private async loadQuestionnaire(id?: string): Promise<void> {
    if(!id) {
      return;
    }

    try {
      this._manager = await this.questionnaireService.loadQuestionnaireById(id)
      this._timeValidityEnabled = this._manager.metadata.validFrom === null || this._manager.metadata.validTo === null;

    }catch(error) {
      this.toast.show("Dotazník nenalezen.", ToastDuration.LONG);
      await this.router.navigate(["/"]);
    }
  }

  protected get isQuestionsEditor(): boolean {
    return this._isQuestionsEditor;
  }

  /**
   * Saves the questionnaire to the server.
   * @param showToast - if true, a toast message with save result is shown.
   * @returns true if the questionnaire was saved successfully, false otherwise.
   */
  protected async saveQuestionnaire(showToast?: boolean): Promise<boolean> {
    if(this.manager.metadata.published) {
      return true;
    }

    try {
      const data = this._manager.serializedQuestionnaire;
      QuestionnaireValidator.resolveQuestionnaireFlow(data);

      await this.questionnaireService.saveQuestionnaire(data);
      this._manager = new QuestionnaireManager(data);

      if(showToast) {
        this.successfullySaved(false);
      }

      return true;
    }
    catch (error) {
      if(showToast) {
        this.unsuccessfullySaved(error);
      }

      return false;
    }
  }

  protected async onBackButtonClick(): Promise<void> {
    if(this.manager.metadata.published) {
      await this.router.navigate(["/"]);
      return;
    }

    const title = "Přejete si uložit změny?";
    const message = "Pokud změny neuložíte, budou ztraceny.";

    this.dialog.openConfirmationDialog(title, message)
      .subscribe(async (confirmed) => {
        if(!confirmed) {
          await this.router.navigate(["/"]);
          return;
        }

        const saved = await this.saveQuestionnaire(true);
        if(saved){
          await this.router.navigate(["/"]);
        }
      });
  }

  private successfullySaved(isModified: boolean): void {
    if(!isModified) {
      this.toast.show("Dotazník byl uložen.", ToastDuration.LONG);
      return;
    }

    this.toast.show("Dotazník byl uložen. Došlo k automatické úpravě pravidel na základě změn v dotazníku.", ToastDuration.LONG);
  }

  private unsuccessfullySaved(error: any): void {
    if(error instanceof EmptyFieldException) {
      this.toast.show("Vyplňte prosím všechny povinné údaje", ToastDuration.SHORT);
      return;
    }
    this.toast.show("Nepodařilo se uložit dotazník.", ToastDuration.LONG);
  }

  protected addTag(event: MatChipInputEvent): void {
    let value = (event.value || "").replaceAll(" ", "");
    if (!value) {
      return;
    }

    const metadata = this.manager.metadata;
    if(!metadata.tags) {
      metadata.tags = [];
    }

    if(!value.startsWith("#")) {
      value = "#" + value;
    }

    metadata.tags.push(value);
    event.chipInput!.clear();
  }

  protected removeTag(tagToRemove: string): void {
    const metadata = this.manager.metadata;
    if(!metadata.tags) {
      return;
    }

    metadata.tags = metadata.tags.filter(tag => tag !== tagToRemove);
  }

  protected async onConfigurationPageToggle(): Promise<void> {
    if(await this.saveQuestionnaire(true)) {
      this._isQuestionsEditor = !this._isQuestionsEditor;
    }
  }

  protected async onQuestionDeleted(question: Question): Promise<void> {
    try {
      await this.questionnaireService.deleteQuestion(this.manager.header.id!, question.data.id!);
      this.manager.deleteQuestion(question);
    }catch (error) {
      this.toast.show("Nepodařilo se smazat otázku.", ToastDuration.SHORT);
    }
  }

  protected get questionConfigButtonText(): string {
    return this.isQuestionsEditor ? "Pravidla otázek" : "Vytváření otázek";
  }

  protected get manager(): QuestionnaireManager {
    return this._manager;
  }

  protected get timeValidityEnabled(): boolean {
    return this._timeValidityEnabled;
  }

  protected set timeValidityEnabled(value: boolean) {
    if(value) {
      this.manager.metadata.validFrom = undefined;
      this.manager.metadata.validTo = undefined;
    }

    this._timeValidityEnabled = value
  }

  protected onDateChange(): void {
    if(this.manager.metadata.validFrom) {
      this.manager.metadata.validFrom = this.setDateToUTC(this.manager.metadata.validFrom);
    }

    if(this.manager.metadata.validTo) {
      this.manager.metadata.validTo = this.setDateToUTC(this.manager.metadata.validTo);
    }
  }

  protected setDateToUTC(dateStr: string): string {
    const date = new Date(dateStr);
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return utc.toISOString();
  }
}
