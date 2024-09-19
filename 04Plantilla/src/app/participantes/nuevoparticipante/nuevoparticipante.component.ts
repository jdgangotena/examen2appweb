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
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
    Cedula: new FormControl('', [Validators.required, this.validadorCedulaEcuador]),
    Correo: new FormControl('', [Validators.required, Validators.email])
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
        this.frm_Participante.controls['Nombre'].setValue(unParticipante.Nombre);
        this.frm_Participante.controls['Apellido'].setValue(unParticipante.Apellido);
        this.frm_Participante.controls['Telefono'].setValue(unParticipante.Telefono);
        this.frm_Participante.controls['Cedula'].setValue(unParticipante.Cedula);
        this.frm_Participante.controls['Correo'].setValue(unParticipante.Correo);

        this.titulo = 'Editar Participante';
      });
    }
  }

  grabar() {
    let participante: IParticipantes = {
      idParticipante: this.idParticipante,
      Nombre: this.frm_Participante.controls['Nombre'].value,
      Apellido: this.frm_Participante.controls['Apellido'].value,
      Telefono: this.frm_Participante.controls['Telefono'].value,
      Cedula: this.frm_Participante.controls['Cedula'].value,
      Correo: this.frm_Participante.controls['Correo'].value
    };

    Swal.fire({
      title: 'Participantes',
      text: 'Desea guardar al Participante ' + this.frm_Participante.controls['Nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
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
