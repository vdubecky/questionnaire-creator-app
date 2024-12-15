import {Directive, Input} from "@angular/core";

/**
 * Base class for all answer components.
 */
@Directive()
export abstract class AnswerComponent<T> {
  @Input({required: true})
  public answerData!: T;

  @Input()
  public isConditionPreview: boolean = false;

  @Input()
  public editable: boolean = true;
}
