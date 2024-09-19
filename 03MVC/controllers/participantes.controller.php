<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de participantes

require_once('../models/participantes.model.php');
error_reporting(0);
$participantes = new participantes;

switch ($_GET["op"]) {
        //TODO: operaciones de participantes

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los participantes
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase participantes.model.php
        $datos = $participantes->todos(); // Llamo al metodo todos de la clase participantes.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $participante_id = $_GET["participante_id"];
        $datos = array();
        $datos = $participantes->uno($participante_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un miembro en la base de datos
    case 'insertar':       
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        $datos = array();
        $datos = $participantes->insertar($nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un miembro en la base de datos
    case 'actualizar':
        $participante_id = $_POST["participante_id"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        $datos = array();
        $datos = $participantes->actualizar($participante_id, $nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un miembro en la base de datos
    case 'eliminar':
        $participante_id = $_POST["participante_id"];
        $datos = array();
        $datos = $participantes->eliminar($participante_id);
        echo json_encode($datos);
        break;
}
