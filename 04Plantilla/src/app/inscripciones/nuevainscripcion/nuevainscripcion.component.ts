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
import { IInscripciones } from 'src/app/Interfaces/iinscripciones'; // Asegúrate de tener la interfaz importada

@Component({
  selector: 'app-nuevainscripcion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevainscripcion.component.html',
  styleUrls: ['./nuevainscripcion.component.scss']
})
export class NuevainscripcionComponent implements OnInit {
  // Variables
  titulo = 'Nueva Inscripción';
  listaParticipantes: IParticipantes[] = [];
  listaTalleres: ITalleres[] = [];
  totalapagar: number = 0;
  selectedParticipante: IParticipantes | null = null;
  tallerSeleccionado: ITalleres[] = [];
  
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
      fecha_inscripcion: new FormControl('', Validators.required),
      participante_id: new FormControl('', Validators.required),
      taller_id: new FormControl('', Validators.required),
      sub_total: new FormControl('', Validators.required),
      valor_iva: new FormControl('0.12', Validators.required),
      total: new FormControl('', Validators.required)
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
    const inscripcion: IInscripciones = {
      estado: 1,
      fecha_inscripcion: new Date(this.frm_inscripcion.get('fecha_inscripcion')?.value),
      valor_inscripcion: this.frm_inscripcion.get('sub_total')?.value,
      cupos: 0,
      talleres_taller_id: this.frm_inscripcion.get('taller_id')?.value,
      participantes_participante_id: this.frm_inscripcion.get('participante_id')?.value
    };

    this.inscripcionService.insertar(inscripcion).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Inscripción guardada');
        this.navegacion.navigate(['/inscripciones']);
      } else {
        alert('Error al guardar la inscripción');
      }
    });
  }

  calculos() {
    const sub_total = this.frm_inscripcion.get('sub_total')?.value || 0;
    const iva = this.frm_inscripcion.get('valor_iva')?.value || 0.12;
    const total_iva = sub_total * iva;
    this.totalapagar = parseFloat(sub_total) + total_iva;
    this.frm_inscripcion.get('total')?.setValue(this.totalapagar);
  }

  cambioParticipante(event: any) {
    this.frm_inscripcion.get('participante_id')?.setValue(event.target.value);
  }

  cambioTaller(event: any) {
    this.frm_inscripcion.get('taller_id')?.setValue(event.target.value);
  }
  cargaModal(tallerForm: any) {
    console.log('Modal cargado con el formulario:', tallerForm);
}
}
