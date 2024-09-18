import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevotallerComponent } from './nuevotaller.component';

describe('NuevotallerComponent', () => {
  let component: NuevotallerComponent;
  let fixture: ComponentFixture<NuevotallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevotallerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevotallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
