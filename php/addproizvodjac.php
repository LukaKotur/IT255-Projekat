<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");


if(isset($_POST['proizvodjacNaziv'])){
    
    $proizvodjacNaziv = $_POST['proizvodjacNaziv'];

    addProizvodjac($proizvodjacNaziv);

}
?>