import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoxAnswerOptionComponent } from './group-box-answer-option.component';

describe('GroupBoxAnswerOptionComponent', () => {
  let component: GroupBoxAnswerOptionComponent;
  let fixture: ComponentFixture<GroupBoxAnswerOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupBoxAnswerOptionComponent]
    });
    fixture = TestBed.createComponent(GroupBoxAnswerOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
