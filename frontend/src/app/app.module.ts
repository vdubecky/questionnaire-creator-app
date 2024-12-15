import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { QuestionnairePreviewComponent } from './components/questionnaire-preview/questionnaire-preview.component';
import { QuestionnairesPageComponent } from './pages/questionnaires-page/questionnaires-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnairePageComponent } from './pages/questionnaire-page/questionnaire-page.component';
import { QuestionComponent } from './components/question/question.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { SimpleTextAnswerComponent } from './components/answers/types/simple-text-answer/simple-text-answer.component';
import { GroupBoxAnswerComponent } from './components/answers/types/group-box-answer/group-box-answer.component';
import { GroupBoxAnswerOptionComponent } from './components/answers/types/group-box-answer-option/group-box-answer-option.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import { QuestionRuleConfiguratorComponent } from './components/rules/question-rule-configurator/question-rule-configurator.component';
import { QuestionRuleComponent } from './components/rules/question-rule/question-rule.component';
import { RuleConditionComponent } from './components/rules/rule-condition/rule-condition.component';
import { AnswerComponentComponent } from './components/answers/answer-component/answer-component.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SliderAnswerTypeComponent } from './components/answers/types/slider-answer-type/slider-answer-type.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [
    AppComponent,
    QuestionnairePreviewComponent,
    QuestionnairesPageComponent,
    QuestionnairePageComponent,
    QuestionComponent,
    SimpleTextAnswerComponent,
    GroupBoxAnswerComponent,
    GroupBoxAnswerOptionComponent,
    QuestionRuleConfiguratorComponent,
    QuestionRuleComponent,
    RuleConditionComponent,
    AnswerComponentComponent,
    NotFoundPageComponent,
    ConfirmDialogComponent,
    SliderAnswerTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    MatDialogModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
