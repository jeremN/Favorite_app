<?php
	require("db.php"); 

	$count = $_GET['value'];

	$sql = "SELECT COUNT(DISTINCT cat) AS 'val'
			FROM site WHERE cat=:key ";

	$statement = $pdo->prepare($sql);
	$statement->execute([
			":key" => $count
		]);


	$values = $statement->fetchAll();


?>
