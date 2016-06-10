<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['modelId']) && isset($_POST['vrstaModelNaziv'])){
   
    $modelId = intval($_POST['modelId']); 
    $vrstaModelNaziv = $_POST['vrstaModelNaziv'];

    addVrstaModela($modelId, $vrstaModelNaziv);

}
?>