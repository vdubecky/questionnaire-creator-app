import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesPageComponent } from './questionnaires-page.component';

describe('QuestionnairesPageComponent', () => {
  let component: QuestionnairesPageComponent;
  let fixture: ComponentFixture<QuestionnairesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnairesPageComponent]
    });
    fixture = TestBed.createComponent(QuestionnairesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
