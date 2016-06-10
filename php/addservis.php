<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['serviserId']) && isset($_POST['voziloId']) && isset($_POST['datum']) && isset($_POST['brojKilometara']) && isset($_POST['opis']) && isset($_POST['cena'])){
    
    $serviserId = intval($_POST['serviserId']);
    $voziloId = intval($_POST['voziloId']);
    $datum = $_POST['datum'];
    $brojKilometara = $_POST['brojKilometara'];
    $opis = $_POST['opis'];
    $cena = $_POST['cena'];

    addServis( $serviserId, $voziloId, $datum,$brojKilometara,$opis,$cena);

}
?>