import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCliComponent } from './registrar-cli.component';

describe('RegistrarCliComponent', () => {
  let component: RegistrarCliComponent;
  let fixture: ComponentFixture<RegistrarCliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarCliComponent]
    });
    fixture = TestBed.createComponent(RegistrarCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
