import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupBoxAnswerType} from "../group-box-answer/GroupBoxAnswer";


export type GroupBoxAnswerOption = {
  checked: boolean,
  optionText: string,
};

@Component({
  selector: 'app-group-box-answer-option',
  templateUrl: './group-box-answer-option.component.html',
  styleUrls: ['./group-box-answer-option.component.css']
})
export class GroupBoxAnswerOptionComponent {
  public readonly MAX_OPTION_TEXT_LENGTH: number = 50;
  protected readonly GroupBoxAnswerType = GroupBoxAnswerType;

  @Input({required: true})
  public option!: GroupBoxAnswerOption;

  @Input({required: true})
  public optionType!: GroupBoxAnswerType;

  @Input()
  public isConditionPreview: boolean = false;

  @Input()
  public editable: boolean = true;

  @Output()
  public onDeleteButtonClicked: EventEmitter<GroupBoxAnswerOption>;


  constructor() {
    this.onDeleteButtonClicked = new EventEmitter<GroupBoxAnswerOption>();
  }

  protected deleteOption(): void {
    this.onDeleteButtonClicked.emit(this.option);
  }
}
