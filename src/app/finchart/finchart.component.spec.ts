import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinchartComponent } from './finchart.component';

describe('FinchartComponent', () => {
  let component: FinchartComponent;
  let fixture: ComponentFixture<FinchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinchartComponent]
    });
    fixture = TestBed.createComponent(FinchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
