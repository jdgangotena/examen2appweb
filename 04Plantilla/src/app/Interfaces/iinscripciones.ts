export interface IInscripciones {
    inscripcion_id?: number;
    estado: number; // 1 = activo, 0 = inactivo
    fecha_inscripcion: Date;
    valor_inscripcion: number;
    cupos: number;
    talleres_taller_id: number;
    participantes_participante_id: number;
  }
  