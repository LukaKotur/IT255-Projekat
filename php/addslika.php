<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['voziloId']) && isset($_POST['putanja'])){
   
    $voziloId = intval($_POST['voziloId']); 
    $path = $_POST['putanja'];

    addSlika($voziloId, $path);

}
?>