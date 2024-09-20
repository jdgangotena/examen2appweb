<?php
//TODO: Clase de talleres
require_once('../config/config.php');
class talleres
{
    //TODO: Implementar los metodos de la clase

    public function todos() //select * from talleres
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `talleres`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($taller_id) //select * from talleres where id = $id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `talleres` WHERE `taller_id`=$taller_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $descripcion, $fecha, $ubicacion) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `talleres` ( `nombre`, `descripcion`, `fecha`, `ubicacion`) VALUES ('$nombre','$descripcion', '$fecha','$ubicacion')";
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
    public function actualizar($taller_id,$nombre,$descripcion,$fecha,$ubicacion) //update talleres
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `talleres` SET `nombre`='$nombre',`descripcion`='$descripcion',`fecha`='$fecha',`ubicacion`='$ubicacion' WHERE `taller_id` = $taller_id";
            if (mysqli_query($con, $cadena)) {
                return $taller_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($taller_id) //delete from talleres where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `talleres` WHERE `taller_id`= $taller_id";
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
