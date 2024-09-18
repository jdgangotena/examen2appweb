<?php
//TODO: Clase de inscripciones
require_once('../config/config.php');
class inscripciones
{
    //TODO: Implementar los metodos de la clase

    public function todos() //select * from inscripciones
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($inscripcion_id) //select * from inscripciones where id = $id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones` WHERE `inscripcion_id`=$inscripcion_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
 
    public function insertar($estado, $fecha_inscripcion, $valor_inscripcion, $cupos, $talleres_taller_id, $participantes_participante_id) //insert into inscripciones
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `inscripciones` ( `estado`,  `fecha_inscripcion`,  `valor_inscripcion`,  `cupos`,  `talleres_taller_id`,  `participantes_participante_id`) VALUES (`$estado`,  `$fecha_inscripcion`,  `$valor_inscripcion`,  `$cupos`,  `$talleres_taller_id`,  `$participantes_participante_id`)";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($inscripcion_id, $estado, $fecha_inscripcion, $valor_inscripcion, $cupos, $talleres_taller_id, $participantes_participante_id) //update inscripciones set nombre = $nombre, direccion = $direccion, telefono = $telefono where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `inscripciones` SET `estado`='$estado',  `fecha_inscripcion`='$fecha_inscripcion',  `valor_inscripcion`='$valor_inscripcion',  `cupos`='$cupos',  `talleres_taller_id`='$talleres_taller_id',  `participantes_participante_id`='$participantes_participante_id' WHERE `inscripcion_id` = $inscripcion_id";
            if (mysqli_query($con, $cadena)) {
                return $inscripcion_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($inscripcion_id) //delete from inscripciones where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `inscripciones` WHERE `inscripcion_id`= $inscripcion_id";
            // echo $cadena;
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
