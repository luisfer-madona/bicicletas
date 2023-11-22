import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProComponent } from './registrar-pro.component';

describe('RegistrarProComponent', () => {
  let component: RegistrarProComponent;
  let fixture: ComponentFixture<RegistrarProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarProComponent]
    });
    fixture = TestBed.createComponent(RegistrarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
