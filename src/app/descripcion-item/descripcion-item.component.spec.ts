import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionItemComponent } from './descripcion-item.component';

describe('DescripcionItemComponent', () => {
  let component: DescripcionItemComponent;
  let fixture: ComponentFixture<DescripcionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescripcionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescripcionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
