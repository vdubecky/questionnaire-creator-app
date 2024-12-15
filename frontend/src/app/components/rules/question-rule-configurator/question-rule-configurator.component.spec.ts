import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRuleConfiguratorComponent } from './question-rule-configurator.component';

describe('QuestionRuleComponent', () => {
  let component: QuestionRuleConfiguratorComponent;
  let fixture: ComponentFixture<QuestionRuleConfiguratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionRuleConfiguratorComponent]
    });
    fixture = TestBed.createComponent(QuestionRuleConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
