import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInscripciones } from '../Interfaces/iinscripciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  apiurl = 'http://localhost/examen2appweb/03MVC/controllers/inscripciones.controller.php?op=';

  constructor(private lector: HttpClient) {}

  // Obtener todas las inscripciones
  todos(): Observable<IInscripciones[]> {
    return this.lector.get<IInscripciones[]>(this.apiurl + 'todos');
  }

  // Obtener una inscripción por su ID
  uno(inscripcion_id: number): Observable<IInscripciones> {
    const formData = new FormData();
    formData.append('inscripcion_id', inscripcion_id.toString());
    return this.lector.post<IInscripciones>(this.apiurl + 'uno', formData);
  }

  // Eliminar una inscripción
  eliminar(inscripcion_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('inscripcion_id', inscripcion_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar una nueva inscripción
  insertar(inscripcion: IInscripciones): Observable<string> {
    const formData = new FormData();
    formData.append('estado', inscripcion.estado.toString());
    formData.append('fecha_inscripcion', inscripcion.fecha_inscripcion.toString());
    formData.append('valor_inscripcion', inscripcion.valor_inscripcion.toString());
    formData.append('cupos', inscripcion.cupos.toString());
    formData.append('talleres_taller_id', inscripcion.talleres_taller_id.toString());
    formData.append('participantes_participante_id', inscripcion.participantes_participante_id.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar una inscripción existente
  actualizar(inscripcion: IInscripciones): Observable<string> {
    const formData = new FormData();
    formData.append('inscripcion_id', inscripcion.inscripcion_id?.toString() || '');
    formData.append('estado', inscripcion.estado.toString());
    formData.append('fecha_inscripcion', inscripcion.fecha_inscripcion.toString());
    formData.append('valor_inscripcion', inscripcion.valor_inscripcion.toString());
    formData.append('cupos', inscripcion.cupos.toString());
    formData.append('talleres_taller_id', inscripcion.talleres_taller_id.toString());
    formData.append('participantes_participante_id', inscripcion.participantes_participante_id.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
