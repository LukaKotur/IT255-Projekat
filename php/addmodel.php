<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['proizvodjacId']) && isset($_POST['modelNaziv']) && isset($_POST['vrsta'])){
   
    $proizvodjacId = intval($_POST['proizvodjacId']); 
    $modelNaziv = $_POST['modelNaziv'];
    $vrsta = $_POST['vrsta'];

    addModel($proizvodjacId, $modelNaziv, $vrsta);

}
?>