<?php
include("config.php");

function checkIfLoggedIn(){
	global $conn;
	if(isset($_SERVER['HTTP_TOKEN'])){
		$token = $_SERVER['HTTP_TOKEN'];
		$result = $conn->prepare("SELECT * FROM users WHERE token=?");
		$result->bind_param("s",$token);
		$result->execute();
		$result->store_result();
		$num_rows = $result->num_rows;
		if($num_rows > 0)
		{
			return true;
		}
		else{	
			return false;
		}
	}
	else{
		return false;
	}
}

function login($username, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($username,$password)){
		$id = sha1(uniqid());
		$result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
		$result2->bind_param("ss",$id,$username);
		$result2->execute();
		$rarray['token'] = $id;
	} else{
		header('HTTP/1.1 401 Unauthorized');
		$rarray['error'] = "Invalid username/password";
	}
	return json_encode($rarray);
}

function checkLogin($username, $password){
	global $conn;
	$password = md5($password);
	$result = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
	$result->bind_param("ss",$username,$password);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}

function register($username, $password, $firstname, $lastname){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfUserExists($username)){
		$errors .= "Username already exists\r\n";
	}
	if(strlen($username) < 5){
		$errors .= "Username must have at least 5 characters\r\n";
	}
	if(strlen($password) < 5){
		$errors .= "Password must have at least 5 characters\r\n";
	}
	if(strlen($firstname) < 3){
		$errors .= "First name must have at least 3 characters\r\n";
	}
	if(strlen($lastname) < 3){
		$errors .= "Last name must have at least 3 characters\r\n";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)");
		$pass =md5($password);
		$stmt->bind_param("ssss", $firstname, $lastname, $username, $pass);
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
			$result2->bind_param("ss",$id,$username);
			$result2->execute();
			$rarray['token'] = $id;
		}else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = "Database connection error";
		}
	} else{
		header('HTTP/1.1 400 Bad request');
		$rarray['error'] = json_encode($errors);
	}
	
	return json_encode($rarray);
}

function checkIfUserExists($username){
	global $conn;
	$result = $conn->prepare("SELECT * FROM users WHERE username=?");
	$result->bind_param("s",$username);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}


function addProizvodjac($proizvodjacNaziv){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO proizvodjac (naziv) VALUE (?)");
	$stmt->bind_param("s", $proizvodjacNaziv);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);	
}

function addSlika($voziloId, $path){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO slika (vozilo_id, putanja) VALUE (?, ?)");
	$stmt->bind_param("is", $voziloId, $path);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);	
}

function addModel($proizvodjacId,$modelNaziv, $vrsta){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO model (proizvodjac_id, naziv, vrsta) VALUES (?, ?, ?)");
	$stmt->bind_param("iss", $proizvodjacId, $modelNaziv, $vrsta);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);
}


function addServiser($imeServisa,$brojTelefona){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO serviser (ime_servisa, broj_telefona) VALUES (?, ?)");
	$stmt->bind_param("ss", $imeServisa, $brojTelefona);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);
}

function addServis($serviserId,$voziloId,$datum,$brojKilometara,$opis,$cena){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO servis (serviser_id, vozilo_id, datum, predjenih_kilometara, opis, cena) VALUES (?,?,?,?,?,?)");
	$stmt->bind_param("iissss", $serviserId, $voziloId, $datum,$brojKilometara,$opis,$cena);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);
}

function addVozilo($proizvodjacId, $modelId, $brojSasije, $registracija, $kubikaza, $kilometraza, $kategorija, $cena) {
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO vozilo (proizvodjac_id, model_id, broj_sasije, registracija, kubikaza, kilometraza, kategorija, cena) VALUES (?,?,?,?,?,?,?,?)");
	$stmt->bind_param("iiisssss",$proizvodjacId, $modelId, $brojSasije, $registracija, $kubikaza, $kilometraza, $kategorija, $cena);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);
}


function updateRoom($roomName, $hasTV, $beds, $id){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$stmt = $conn->prepare("UPDATE rooms SET roomname=?, tv=?, beds=? WHERE id=?");
		$stmt->bind_param("sssi", $roomName, $hasTV, $beds,$id);
		if($stmt->execute()){
			$rarray['success'] = "updated";
		}else{
			$rarray['error'] = "Database connection error";
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
	}
	return json_encode($rarray);
}


function getRoomWithId($id){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$id = $conn->real_escape_string($id);
		$result = $conn->query("SELECT * FROM rooms WHERE id=".$id);
		$num_rows = $result->num_rows;
		$rooms = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM rooms WHERE id=".$id);
			while($row = $result2->fetch_assoc()) {
				$rooms = $row;
			}
		}
		$rarray = $rooms;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getVehicleWithId($registracija){
	global $conn;
	$rarray = array();
	$result = $conn->query("SELECT registracija, godiste, kubikaza from vozilo where registracija =".$registracija);
	$num_rows = $result->num_rows;
	$vozilo = array();
	if($num_rows > 0)
	{
		$result2 = $conn->query("SELECT registracija, godiste, kubikaza from vozilo where registracija =".$registracija);
		while($row = $result2->fetch_assoc()) {
			$one_veh = array();
			$one_veh['registracija'] = $row['registracija'];
			$one_veh['godiste'] = $row['godiste'];
			$one_veh['kubikaza'] = $row['kubikaza'];
			array_push($vozilo,$one_veh);
		}
	}
	$rarray['vozilo'] = $vozilo;
	return json_encode($rarray);
}




function deleteVehicle($id){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->prepare("DELETE FROM vozilo WHERE vozilo_id=?");
		$result->bind_param("i",$id);
		$result->execute();
		$rarray['success'] = "Deleted successfully";
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
	}
	return json_encode($rarray);
}



function deleteServis($id){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->prepare("DELETE FROM servis WHERE servis_id=?");
		$result->bind_param("i",$id);
		$result->execute();
		$rarray['success'] = "Deleted successfully";
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
	}
	return json_encode($rarray);
}

function getVehicles(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT slika.putanja as slika, proizvodjac.NAZIV as proizvodjac_naziv, model.NAZIV as model_naziv, model.vrsta as vrsta, vozilo.vozilo_id, vozilo.broj_sasije, vozilo.registracija, vozilo.kilometraza, vozilo.kategorija, vozilo.cena FROM vozilo join model  on vozilo.MODEL_ID = model.MODEL_ID join proizvodjac on model.PROIZVODJAC_ID = proizvodjac.PROIZVODJAC_ID join slika on slika.vozilo_id = vozilo.vozilo_id");
		$num_rows = $result->num_rows;
		$vehicles = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT slika.putanja as slika, proizvodjac.NAZIV as proizvodjac_naziv, model.NAZIV as model_naziv, model.vrsta as vrsta, vozilo.vozilo_id, vozilo.broj_sasije, vozilo.registracija, vozilo.kilometraza, vozilo.kategorija, vozilo.cena FROM vozilo join model  on vozilo.MODEL_ID = model.MODEL_ID join proizvodjac on model.PROIZVODJAC_ID = proizvodjac.PROIZVODJAC_ID join slika on slika.vozilo_id = vozilo.vozilo_id");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['slika'] = $row['slika'];
				$one_veh['proizvodjac_naziv'] = $row['proizvodjac_naziv'];
				$one_veh['model_naziv'] = $row['model_naziv'];
				$one_veh['vrsta'] = $row['vrsta'];
				$one_veh['vozilo_id'] = $row['vozilo_id'];
				$one_veh['broj_sasije'] = $row['broj_sasije'];
				$one_veh['registracija'] = $row['registracija'];
				$one_veh['kilometraza'] = $row['kilometraza'];
				$one_veh['kategorija'] = $row['kategorija'];
				$one_veh['cena'] = $row['cena'];
				array_push($vehicles,$one_veh);
			}
		}
		$rarray['vehicles'] = $vehicles;
		return json_encode($rarray);
}


function getVehiclesTable(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT proizvodjac.NAZIV as proizvodjac_naziv, model.NAZIV as model_naziv, model.vrsta as vrsta, vozilo.vozilo_id, vozilo.broj_sasije, vozilo.registracija, vozilo.kilometraza, vozilo.kategorija, vozilo.cena FROM vozilo  join model  on vozilo.MODEL_ID = model.MODEL_ID join proizvodjac on model.PROIZVODJAC_ID = proizvodjac.PROIZVODJAC_ID");
		$num_rows = $result->num_rows;
		$vehicles = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT proizvodjac.NAZIV as proizvodjac_naziv, model.NAZIV as model_naziv, model.vrsta as vrsta, vozilo.vozilo_id, vozilo.broj_sasije, vozilo.registracija, vozilo.kilometraza, vozilo.kategorija, vozilo.cena FROM vozilo  join model  on vozilo.MODEL_ID = model.MODEL_ID join proizvodjac on model.PROIZVODJAC_ID = proizvodjac.PROIZVODJAC_ID");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['proizvodjac_naziv'] = $row['proizvodjac_naziv'];
				$one_veh['model_naziv'] = $row['model_naziv'];
				$one_veh['vrsta'] = $row['vrsta'];
				$one_veh['vozilo_id'] = $row['vozilo_id'];
				$one_veh['broj_sasije'] = $row['broj_sasije'];
				$one_veh['registracija'] = $row['registracija'];
				$one_veh['kilometraza'] = $row['kilometraza'];
				$one_veh['kategorija'] = $row['kategorija'];
				$one_veh['cena'] = $row['cena'];
				array_push($vehicles,$one_veh);
			}
		}
		$rarray['vehiclestable'] = $vehicles;
		return json_encode($rarray);
}


function getProizvodjaci(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT proizvodjac_id, naziv from proizvodjac");
		$num_rows = $result->num_rows;
		$proizvodjaci = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT proizvodjac_id, naziv FROM proizvodjac");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['proizvodjac_id'] = $row['proizvodjac_id'];
				$one_veh['naziv'] = $row['naziv'];
				array_push($proizvodjaci,$one_veh);
			}
		}
		$rarray['proizvodjaci'] = $proizvodjaci;
		return json_encode($rarray);
}

function getModel(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT model_id, naziv, vrsta from model");
		$num_rows = $result->num_rows;
		$modeli = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT model_id, naziv, vrsta FROM model");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['model_id'] = $row['model_id'];
				$one_veh['naziv'] = $row['naziv'];
				$one_veh['vrsta'] = $row['vrsta'];
				array_push($modeli,$one_veh);
			}
		}
		$rarray['modeli'] = $modeli;
		return json_encode($rarray);
}


function getServisById($id){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT serviser.IME_SERVISA, serviser.BROJ_TELEFONA, servis.DATUM, servis.PREDJENIH_KILOMETARA, servis.OPIS, servis.CENA  from servis join serviser on servis.SERVISER_ID = servis.SERVISER_ID  WHERE vozilo_id=".$id);
		$num_rows = $result->num_rows;
		$serviser = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT serviser.IME_SERVISA as ime_servisa, serviser.BROJ_TELEFONA as broj_telefona, servis.DATUM, servis.PREDJENIH_KILOMETARA, servis.OPIS, servis.CENA  from servis join serviser on servis.SERVISER_ID = servis.SERVISER_ID  WHERE vozilo_id=".$id);
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['ime_servisa'] = $row['ime_servisa'];
				$one_veh['broj_telefona'] = $row['broj_telefona'];
				$one_veh['datum'] = $row['datum'];
				$one_veh['predjenih_kilometara'] = $row['predjenih_kilometara'];
				$one_veh['opis'] = $row['opis'];
				$one_veh['cena'] = $row['cena'];
				array_push($serviser,$one_veh);
			}
		}
		$rarray['servis'] = $serviser;
		return json_encode($rarray);
}

function getServis(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT serviser.IME_SERVISA as ime_servisa, serviser.BROJ_TELEFONA as broj_telefona, vozilo.registracija, servis.servis_id,servis.datum, servis.predjenih_kilometara, servis.opis, servis.cena  from servis join serviser on serviser.SERVISER_ID = servis.SERVISER_ID join vozilo on servis.vozilo_id=vozilo.vozilo_id");
		$num_rows = $result->num_rows;
		$serviser = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT serviser.IME_SERVISA as ime_servisa, serviser.BROJ_TELEFONA as broj_telefona, vozilo.registracija as registracija, servis.servis_id, servis.datum, servis.predjenih_kilometara, servis.opis, servis.cena  from servis join serviser on serviser.SERVISER_ID = servis.SERVISER_ID join vozilo on servis.vozilo_id=vozilo.vozilo_id");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['ime_servisa'] = $row['ime_servisa'];
				$one_veh['broj_telefona'] = $row['broj_telefona'];
				$one_veh['servis_id'] = $row['servis_id'];
				$one_veh['registracija'] = $row['registracija'];
				$one_veh['datum'] = $row['datum'];
				$one_veh['predjenih_kilometara'] = $row['predjenih_kilometara'];
				$one_veh['opis'] = $row['opis'];
				$one_veh['cena'] = $row['cena'];
				array_push($serviser,$one_veh);
			}
		}
		$rarray['servis'] = $serviser;
		return json_encode($rarray);
}

function getServiser(){
	global $conn;
	$rarray = array();
		$result = $conn->query("SELECT serviser_id, ime_servisa from serviser");
		$num_rows = $result->num_rows;
		$serviser = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT serviser_id, ime_servisa from serviser");
			while($row = $result2->fetch_assoc()) {
				$one_veh = array();
				$one_veh['serviser_id'] = $row['serviser_id'];
				$one_veh['ime_servisa'] = $row['ime_servisa'];
				array_push($serviser,$one_veh);
			}
		}
		$rarray['serviser'] = $serviser;
		return json_encode($rarray);
}

?>
