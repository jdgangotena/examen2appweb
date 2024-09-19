import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { ITalleres } from '../Interfaces/italleres';
import { TallerService } from '../Services/talleres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talleres',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.scss']
})
export class TalleresComponent implements OnInit {
  listaTalleres: ITalleres[] = [];

  constructor(private tallerServicio: TallerService) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  cargarTalleres() {
    this.tallerServicio.todos().subscribe((data) => {
      this.listaTalleres = data;
      console.log(data);
    });
  }

  eliminar(idTalleres: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el taller',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tallerServicio.eliminar(idTalleres).subscribe((data) => {
          this.cargarTalleres();
          Swal.fire('Eliminado', 'El taller ha sido eliminado', 'success');
        });
      } else {
        Swal.fire('Error', 'Ocurrió un error', 'error');
      }
    });
  }


trackByFn(index: number, item: ITalleres): number | undefined {
  return item.taller_id; // Devuelve el ID del taller para rastrear los elementos
}
}