import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoparticipanteComponent } from './nuevoparticipante.component';

describe('NuevoparticipanteComponent', () => {
  let component: NuevoparticipanteComponent;
  let fixture: ComponentFixture<NuevoparticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoparticipanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoparticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
