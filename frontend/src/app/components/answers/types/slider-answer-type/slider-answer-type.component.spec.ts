import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAnswerTypeComponent } from './slider-answer-type.component';

describe('SliderAnswerTypeComponent', () => {
  let component: SliderAnswerTypeComponent;
  let fixture: ComponentFixture<SliderAnswerTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderAnswerTypeComponent]
    });
    fixture = TestBed.createComponent(SliderAnswerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
