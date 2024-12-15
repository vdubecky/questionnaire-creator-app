import {Component} from '@angular/core';
import {GroupBoxAnswer, GroupBoxAnswerType} from "./GroupBoxAnswer";
import {GroupBoxAnswerOption} from "../group-box-answer-option/group-box-answer-option.component";
import {AnswerComponent} from "../AnswerComponent";


@Component({
  selector: 'app-group-box-answer',
  templateUrl: './group-box-answer.component.html',
  styleUrls: ['./group-box-answer.component.css']
})
export class GroupBoxAnswerComponent extends AnswerComponent<GroupBoxAnswer> {
  private readonly _id: string;


  constructor() {
    super();
    this._id = new Date().getTime().toString();
  }

  protected addOption(): void {
    this.answerData.addOption("");
  }

  protected onDeleteButtonClicked(option: GroupBoxAnswerOption): void {
    if(this.getOptions.length <= GroupBoxAnswer.MINIMUM_OPTIONS_COUNT) {
      return;
    }
    this.answerData.deleteOption(option);
  }

  protected get getOptions(): GroupBoxAnswerOption[] {
    return this.answerData.config.options;
  }

  protected get type(): GroupBoxAnswerType {
    return this.answerData.config.answerType;
  }

  protected readonly GroupBoxAnswerType = GroupBoxAnswerType;

  protected get selected(): GroupBoxAnswerOption {
    return this.getOptions.find(option => option.checked) || this.getOptions[0];
  }

  protected set selected(option: GroupBoxAnswerOption) {
    for(const op of this.getOptions) {
      op.checked = false;
    }
    option.checked = true;
  }

  protected get id(): string {
    return this._id;
  }
}
