import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoxAnswerComponent } from './group-box-answer.component';

describe('GroupBoxAnswerComponent', () => {
  let component: GroupBoxAnswerComponent;
  let fixture: ComponentFixture<GroupBoxAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupBoxAnswerComponent]
    });
    fixture = TestBed.createComponent(GroupBoxAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
