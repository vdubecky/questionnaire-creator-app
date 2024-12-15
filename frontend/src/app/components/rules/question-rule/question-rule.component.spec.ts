import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRuleComponent } from './question-rule.component';

describe('QuestionRuleComponent', () => {
  let component: QuestionRuleComponent;
  let fixture: ComponentFixture<QuestionRuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionRuleComponent]
    });
    fixture = TestBed.createComponent(QuestionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
