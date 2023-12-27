import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarDepartamentosComponent } from './publicar-departamentos.component';

describe('PublicarDepartamentosComponent', () => {
  let component: PublicarDepartamentosComponent;
  let fixture: ComponentFixture<PublicarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicarDepartamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
