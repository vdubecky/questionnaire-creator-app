import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConditionComponent } from './rule-condition.component';

describe('RuleConditionComponent', () => {
  let component: RuleConditionComponent;
  let fixture: ComponentFixture<RuleConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleConditionComponent]
    });
    fixture = TestBed.createComponent(RuleConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
