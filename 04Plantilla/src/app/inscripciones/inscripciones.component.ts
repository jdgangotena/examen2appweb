import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IInscripciones } from 'src/app/Interfaces/iinscripciones';
import { Router, RouterLink } from '@angular/router';
import { InscripcionService } from 'src/app/Services/inscripciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  listaInscripciones: IInscripciones[] = [];

  constructor(private inscripcionServicio: InscripcionService, private router: Router) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.inscripcionServicio.todos().subscribe(
      (data) => {
        this.listaInscripciones = data;
        console.log(this.listaInscripciones);
      },
      (error) => {
        console.error('Error cargando inscripciones', error);
      }
    );
  }

  eliminar(idInscripcion: number) {
    Swal.fire({
      title: "Eliminar Inscripción",
      text: "Está seguro que desea eliminar la inscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar Inscripción"
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscripcionServicio.eliminar(idInscripcion).subscribe(
          (data) => {
            Swal.fire({
              title: "Eliminado",
              text: "La inscripción ha sido eliminada.",
              icon: "success"
            });
            this.cargarTabla();
          },
          (error) => {
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la inscripción.",
              icon: "error"
            });
          }
        );
      }
    });
  }
}
