import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IParticipantes } from 'src/app/Interfaces/iparticipantes';
import { ITalleres } from 'src/app/Interfaces/italleres';
import { InscripcionService } from 'src/app/Services/inscripciones.service';
import { ParticipanteService } from 'src/app/Services/participantes.service';
import { TallerService } from 'src/app/Services/talleres.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-nuevainscripcion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevainscripcion.component.html',
  styleUrl: './nuevainscripcion.component.scss'
})
export class NuevainscripcionComponent implements OnInit {
  // Variables
  titulo = 'Nueva Inscripción';
  listaParticipantes: IParticipante[] = [];
  listaTalleres: ITaller[] = [];
  totalapagar: number = 0;
  
  // FormGroup
  frm_inscripcion: FormGroup;

  constructor(
    private participanteService: ParticipanteService,
    private tallerService: TallerService,
    private inscripcionService: InscripcionService,
    private navegacion: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_inscripcion = new FormGroup({
      Fecha: new FormControl('', Validators.required),
      Participante_id: new FormControl('', Validators.required),
      Taller_id: new FormControl('', Validators.required),
      Sub_total: new FormControl('', Validators.required),
      Valor_IVA: new FormControl('0.12', Validators.required),
      Total: new FormControl('', Validators.required)
    });

    // Cargar lista de participantes
    this.participanteService.todos().subscribe({
      next: (data) => {
        this.listaParticipantes = data;
      },
      error: (e) => console.log(e)
    });

    // Cargar lista de talleres
    this.tallerService.todos().subscribe({
      next: (data) => {
        this.listaTalleres = data;
      },
      error: (e) => console.log(e)
    });
  }

  grabar() {
    // Generar PDF con html2canvas
    const DATA: any = document.getElementById('impresion');
    html2canvas(DATA).then((canvas) => {
      const imgAncho = 208;
      const imgAlto = canvas.height * imgAncho / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, imgAncho, imgAlto);
      pdf.save('inscripcion.pdf');
    });

    // Crear nueva inscripción
    const inscripcion = {
      Fecha: this.frm_inscripcion.get('Fecha')?.value,
      Participante_id: this.frm_inscripcion.get('Participante_id')?.value,
      Taller_id: this.frm_inscripcion.get('Taller_id')?.value,
      Sub_total: this.frm_inscripcion.get('Sub_total')?.value,
      Valor_IVA: this.frm_inscripcion.get('Valor_IVA')?.value,
      Total: this.totalapagar
    };

    this.inscripcionService.insertar(inscripcion).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Inscripción guardada');
        this.navegacion.navigate(['/inscripciones']);
      }
    });
  }

  // Método para realizar cálculos del total a pagar
  calculos() {
    const sub_total = this.frm_inscripcion.get('Sub_total')?.value;
    const iva = this.frm_inscripcion.get('Valor_IVA')?.value;
    const total_iva = sub_total * iva;
    this.totalapagar = parseInt(sub_total) + total_iva;
    this.frm_inscripcion.get('Total')?.setValue(this.totalapagar);
  }

  // Cambiar valor del participante seleccionado
  cambioParticipante(event: any) {
    this.frm_inscripcion.get('Participante_id')?.setValue(event.target.value);
  }

  // Cambiar valor del taller seleccionado
  cambioTaller(event: any) {
    this.frm_inscripcion.get('Taller_id')?.setValue(event.target.value);
  }
}
