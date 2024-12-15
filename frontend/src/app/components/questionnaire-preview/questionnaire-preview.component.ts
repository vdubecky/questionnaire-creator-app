import {Component, EventEmitter, Input, Output} from '@angular/core';


export type QuestionnairePreview = {
  id: number;
  name: string;
  description: string;
  published: boolean;
  tags: string[];
  validFrom?: string,
  validTo?: string
}

@Component({
  selector: 'app-questionnaire-preview',
  templateUrl: './questionnaire-preview.component.html',
  styleUrls: ['./questionnaire-preview.component.css']
})
export class QuestionnairePreviewComponent {

  @Input({required: true})
  public model!: QuestionnairePreview;

  @Output()
  public onOpenQuestionnaire: EventEmitter<QuestionnairePreview> = new EventEmitter<QuestionnairePreview>();

  @Output()
  public onDeleteQuestionnaire: EventEmitter<QuestionnairePreview> = new EventEmitter<QuestionnairePreview>();

  @Output()
  public onPublishButtonClicked: EventEmitter<QuestionnairePreview> = new EventEmitter<QuestionnairePreview>();


  constructor() {}

  protected openQuestionnaire(): void {
    this.onOpenQuestionnaire.emit(this.model);
  }

  protected deleteQuestionnaire(): void {
    this.onDeleteQuestionnaire.emit(this.model);
  }

  protected async publishQuestionnaire(): Promise<void> {
    this.onPublishButtonClicked.emit(this.model);
  }
}
