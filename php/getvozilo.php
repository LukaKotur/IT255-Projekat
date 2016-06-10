<?php
header('Access-Control-Allow-Methods: GET');  
include("functions.php");

if(isset($_GET['registracija'])){
	echo getVehicleWithId($_GET['registracija']);
}
?>
