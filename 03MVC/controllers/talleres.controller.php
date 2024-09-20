<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de talleres

require_once('../models/talleres.model.php');
error_reporting(0);
$talleres = new talleres;

switch ($_GET["op"]) {
        //TODO: operaciones de talleres

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los talleres
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase talleres.model.php
        $datos = $talleres->todos(); // Llamo al metodo todos de la clase talleres.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $taller_id = $_GET["taller_id"];
        $datos = array();
        $datos = $talleres->uno($taller_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un club en la base de datos
    case 'insertar':     
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha = $_POST["fecha"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $talleres->insertar($nombre, $descripcion, $fecha, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un club en la base de datos
    case 'actualizar':
        $taller_id = $_POST["taller_id"];
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha = $_POST["fecha"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $talleres->actualizar($taller_id, $nombre, $descripcion, $fecha, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un club en la base de datos
    case 'eliminar':
        $taller_id = $_POST["taller_id"];
        $datos = array();
        $datos = $talleres->eliminar($taller_id);
        echo json_encode($datos);
        break;
}
