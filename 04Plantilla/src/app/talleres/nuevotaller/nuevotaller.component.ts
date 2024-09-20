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
    // Obtener el ID del taller de la URL si existe
    this.idTalleres = parseInt(this.ruta.snapshot.paramMap.get('id') || '0', 10);
    this.crearFormulario();

    // Si hay un ID, se establece el modo de edición y se cargan los datos del taller
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

  // Crear el formulario
  crearFormulario() {
    this.frm_Taller = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required)
    });
  }

  // Método para grabar o actualizar el taller
  grabar() {
    // Obtiene los valores del formulario
    const nombre = this.frm_Taller.get('nombre')?.value;
    const descripcion = this.frm_Taller.get('descripcion')?.value;
    const fechaInput = this.frm_Taller.get('fecha')?.value; // Obtiene el valor de fecha como string
  
    // Convierte la fecha a formato adecuado para MySQL
    const fecha = new Date(fechaInput);
    const fechaFormatted = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} 00:00:00`;
  
    // Crea el objeto taller
    const taller: ITalleres = {
      nombre,
      descripcion,
      fecha: fechaFormatted, // Envío en formato string adecuado
      ubicacion: this.frm_Taller.get('ubicacion')?.value
    };
  
    // Si no hay ID, se inserta un nuevo taller
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
      // Si hay ID, se actualiza el taller existente
      this.tallerServicio.actualizar({ ...taller, taller_id: this.idTalleres }).subscribe((respuesta) => {
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