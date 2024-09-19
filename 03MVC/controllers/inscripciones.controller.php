<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de inscripciones

require_once('../models/inscripciones.model.php');
error_reporting(0);
$inscripciones = new inscripciones;

switch ($_GET["op"]) {
        //TODO: operaciones de inscripciones

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los inscripciones
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase inscripciones.model.php
        $datos = $inscripciones->todos(); // Llamo al metodo todos de la clase inscripciones.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $inscripcion_id = $_GET["inscripcion_id"];
        $datos = array();
        $datos = $inscripciones->uno($inscripcion_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un miembro en la base de datos
    case 'insertar':       
        $estado = $_POST["estado"];
        $fecha_inscripcion = $_POST["fecha_inscripcion"];
        $valor_inscripcion = $_POST["valor_inscripcion"];
        $cupos = $_POST["cupos"];
        $talleres_taller_id = $_POST["talleres_taller_id"];
        $participantes_participante_id = $_POST["participantes_participante_id"];
        $datos = array();
        $datos = $inscripciones->insertar($estado, $fecha_inscripcion, $valor_inscripcion, $cupos, $talleres_taller_id, $participantes_participante_id);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un miembro en la base de datos
    case 'actualizar':
        $inscripcion_id = $_POST["inscripcion_id"];
        $estado = $_POST["estado"];
        $fecha_inscripcion = $_POST["fecha_inscripcion"];
        $valor_inscripcion = $_POST["valor_inscripcion"];
        $cupos = $_POST["cupos"];
        $talleres_taller_id = $_POST["talleres_taller_id"];
        $participantes_participante_id = $_POST["participantes_participante_id"];
        $datos = array();
        $datos = $inscripciones->actualizar($inscripcion_id, $estado, $fecha_inscripcion, $valor_inscripcion, $cupos, $talleres_taller_id, $participantes_participante_id);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un miembro en la base de datos
    case 'eliminar':
        $inscripcion_id = $_POST["inscripcion_id"];
        $datos = array();
        $datos = $inscripciones->eliminar($inscripcion_id);
        echo json_encode($datos);
        break;
}
