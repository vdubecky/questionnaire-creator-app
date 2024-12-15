import { Component } from '@angular/core';
import {QuestionnairesService} from "./services/questionnaires.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(questionnairesService: QuestionnairesService) {

  }
}
