import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextAnswerComponent } from './simple-text-answer.component';

describe('SimpleTextAnswerComponent', () => {
  let component: SimpleTextAnswerComponent;
  let fixture: ComponentFixture<SimpleTextAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleTextAnswerComponent]
    });
    fixture = TestBed.createComponent(SimpleTextAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
