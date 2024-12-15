import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairePageComponent } from './questionnaire-page.component';

describe('QuestionnairePageComponent', () => {
  let component: QuestionnairePageComponent;
  let fixture: ComponentFixture<QuestionnairePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnairePageComponent]
    });
    fixture = TestBed.createComponent(QuestionnairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
