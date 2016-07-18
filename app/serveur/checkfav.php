<?php
	require("db.php"); 

	$address = $_GET['adress'];


	$sql = "SELECT adress  
			FROM site WHERE adress = :key";

	$statement = $pdo->prepare($sql);
	$statement->execute([
			":key" => $address
		]);

if( $statement->rowCount() > 0){

	echo 'true';
}
else{
	echo 'false';
}