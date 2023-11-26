import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProComponent } from './lista-pro.component';

describe('ListaProComponent', () => {
  let component: ListaProComponent;
  let fixture: ComponentFixture<ListaProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProComponent]
    });
    fixture = TestBed.createComponent(ListaProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
