import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ParticipanteService } from 'src/app/Services/participantes.service';
import { IParticipantes } from 'src/app/Interfaces/iparticipantes';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevoparticipante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoparticipante.component.html',
  styleUrls: ['./nuevoparticipante.component.scss']
})
export class NuevoparticipanteComponent implements OnInit {
  frm_Participante = new FormGroup({
    // idParticipante: new FormControl(), // Uncomment if you have an ID field
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  idParticipante = 0;
  titulo = 'Nuevo Participante';
  
  constructor(
    private participanteServicio: ParticipanteService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idParticipante = parseInt(this.ruta.snapshot.paramMap.get('idParticipante'), 10);
    if (this.idParticipante > 0) {
      this.participanteServicio.uno(this.idParticipante).subscribe((unParticipante) => {
        this.frm_Participante.controls['nombre'].setValue(unParticipante.nombre);
        this.frm_Participante.controls['apellido'].setValue(unParticipante.apellido);
        this.frm_Participante.controls['telefono'].setValue(unParticipante.telefono);
        this.frm_Participante.controls['email'].setValue(unParticipante.email);

        this.titulo = 'Editar Participante';
      });
    }
  }

  grabar() {
    let participante: IParticipantes = {
      participante_id: this.idParticipante > 0 ? this.idParticipante : undefined,
      nombre: this.frm_Participante.controls['nombre'].value,
      apellido: this.frm_Participante.controls['apellido'].value,
      telefono: this.frm_Participante.controls['telefono'].value,
      email: this.frm_Participante.controls['email'].value
    };

    Swal.fire({
      title: 'Participantes',
      text: 'Desea guardar al Participante ' + this.frm_Participante.controls['nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idParticipante > 0) {
          this.participanteServicio.actualizar(participante).subscribe((res: any) => {
            Swal.fire({
              title: 'Participantes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/participantes']);
          });
        } else {
          this.participanteServicio.insertar(participante).subscribe((res: any) => {
            Swal.fire({
              title: 'Participantes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/participantes']);
          });
        }
      }
    });
  }

  validadorCedulaEcuador(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) return null;
    if (cedula.length !== 10) return { cedulaInvalida: true };
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return { provincia: true };
    const tercerDigito = parseInt(cedula.substring(2, 3), 10);
    if (tercerDigito < 0 || tercerDigito > 5) return { cedulaInvalida: true };
    const digitoVerificador = parseInt(cedula.substring(9, 10), 10);
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      const valor = parseInt(cedula.substring(i, i + 1), 10) * coeficientes[i];
      suma += valor > 9 ? valor - 9 : valor;
    }
    const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    if (resultado !== digitoVerificador) return { cedulaInvalida: true };
    return null;
  }
}
