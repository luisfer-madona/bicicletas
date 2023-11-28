import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCliComponent } from './lista-cli.component';

describe('ListaCliComponent', () => {
  let component: ListaCliComponent;
  let fixture: ComponentFixture<ListaCliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCliComponent]
    });
    fixture = TestBed.createComponent(ListaCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
