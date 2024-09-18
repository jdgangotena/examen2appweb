<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de clubes

require_once('../models/clubes.model.php');
error_reporting(0);
$clubes = new clubes;

switch ($_GET["op"]) {
        //TODO: operaciones de clubes

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los clubes
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase clubes.model.php
        $datos = $clubes->todos(); // Llamo al metodo todos de la clase clubes.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $club_id = $_GET["club_id"];
        $datos = array();
        $datos = $clubes->uno($club_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un club en la base de datos
    case 'insertar':     
        $nombre = $_POST["nombre"];
        $deporte = $_POST["deporte"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $clubes->insertar($nombre, $deporte, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un club en la base de datos
    case 'actualizar':
        $club_id = $_POST["club_id"];
        $nombre = $_POST["nombre"];
        $deporte = $_POST["deporte"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $clubes->actualizar($club_id, $nombre, $deporte, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un club en la base de datos
    case 'eliminar':
        $club_id = $_POST["club_id"];
        $datos = array();
        $datos = $clubes->eliminar($club_id);
        echo json_encode($datos);
        break;
}
