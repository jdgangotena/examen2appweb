import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITalleres } from 'src/app/Interfaces/italleres';
import { TallerService } from 'src/app/Services/talleres.service';

@Component({
  selector: 'app-nuevotaller',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevotaller.component.html',
  styleUrls: ['./nuevotaller.component.scss']
})
export class NuevotallerComponent implements OnInit {
  frm_Taller: FormGroup;
  idTalleres = 0;
  editar = false;

  constructor(
    private fb: FormBuilder,
    private tallerServicio: TallerService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idTalleres = parseInt(this.ruta.snapshot.paramMap.get('id') || '0', 10);
    this.crearFormulario();

    if (this.idTalleres > 0) {
      this.editar = true;
      this.tallerServicio.uno(this.idTalleres).subscribe((taller) => {
        this.frm_Taller.patchValue({
          nombre: taller.nombre,
          descripcion: taller.descripcion,
          fecha: taller.fecha,
          ubicacion: taller.ubicacion
        });
      });
    }
  }

  crearFormulario() {
    this.frm_Taller = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required)
    });
  }

  grabar() {
    const taller: ITalleres = {
      taller_id: this.idTalleres || undefined, // Se incluye solo si existe idTalleres
      nombre: this.frm_Taller.get('nombre')?.value,
      descripcion: this.frm_Taller.get('descripcion')?.value,
      fecha: new Date(this.frm_Taller.get('fecha')?.value),
      ubicacion: this.frm_Taller.get('ubicacion')?.value
    };

    if (this.idTalleres === 0 || isNaN(this.idTalleres)) {
      this.tallerServicio.insertar(taller).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Taller grabado');
          this.navegacion.navigate(['/talleres']);
        } else {
          alert('Error al grabar');
        }
      });
    } else {
      this.tallerServicio.actualizar(taller).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Actualizado con éxito');
          this.navegacion.navigate(['/talleres']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
  }
}
