import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionnairesPageComponent} from "./pages/questionnaires-page/questionnaires-page.component";
import {QuestionnairePageComponent} from "./pages/questionnaire-page/questionnaire-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
  {path: "questionnaires", component: QuestionnairesPageComponent, title: "Dotazníky"},
  {path: "questionnaire", component: QuestionnairePageComponent, title: "Nový dotazník"},
  {path: "questionnaire/:id", component: QuestionnairePageComponent, title: "Editace dotazníku"},
  {path: "", redirectTo: "questionnaires", pathMatch: "full"},
  {path: "**", component: NotFoundPageComponent, title: "Stránka nenalezena"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
