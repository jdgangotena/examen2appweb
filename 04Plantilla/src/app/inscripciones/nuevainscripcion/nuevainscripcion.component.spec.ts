import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevainscripcionComponent } from './nuevainscripcion.component';

describe('NuevainscripcionComponent', () => {
  let component: NuevainscripcionComponent;
  let fixture: ComponentFixture<NuevainscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevainscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevainscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
