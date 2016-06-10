<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['imeServisa']) && isset($_POST['brojTelefona'])){
    
    $imeServisa = $_POST['imeServisa'];
    $brojTelefona = $_POST['brojTelefona'];

    addServiser($imeServisa,$brojTelefona);

}
?>