import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IParticipantes } from '../Interfaces/iparticipantes';
import { ParticipanteService } from '../Services/participantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent implements OnInit {
  listaParticipantes: IParticipantes[] = [];
  
  constructor(private participantesServicio: ParticipanteService) {}

  ngOnInit() {
    this.cargarTabla();
  }

  cargarTabla() {
    this.participantesServicio.todos().subscribe((data) => {
      console.log(data);
      this.listaParticipantes = data;
    });
  }

  eliminar(idParticipante: number) {
    Swal.fire({
      title: 'Participantes',
      text: '¿Está seguro que desea eliminar el participante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Participante'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participantesServicio.eliminar(idParticipante).subscribe((data) => {
          Swal.fire('Participantes', 'El participante ha sido eliminado.', 'success');
          this.cargarTabla();
        });
      }
    });
  }
}
