<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['proizvodjacId']) && isset($_POST['modelId']) && isset($_POST['brojSasije']) && isset($_POST['registracija']) && isset($_POST['kubikaza']) && isset($_POST['kilometraza']) && isset($_POST['kategorija']) && isset($_POST['cena'])){
    
    $proizvodjacId = intval($_POST['proizvodjacId']);
    $modelId = intval($_POST['modelId']);
    $brojSasije = intval($_POST['brojSasije']);
    $registracija = $_POST['registracija'];
    $kubikaza = $_POST['kubikaza'];
    $kilometraza = $_POST['kilometraza'];
    $kategorija = $_POST['kategorija'];
    $cena = $_POST['cena'];

    addVozilo($proizvodjacId, $modelId, $brojSasije, $registracija, $kubikaza, $kilometraza, $kategorija, $cena);

}
?>