<?php

	require_once("db.php");

	$adress 		= $_POST['address'];
	$keyword 		= $_POST['keywords'];
	$category 		= $_POST['category'];
	$description 	= $_POST['description'];
	$favicon 		= $_POST['favicon'];

	$sql = "INSERT INTO site (cat, keywords, adress, description, favicon) 
			VALUES (:category, :keyword, :adress, :description, :favicon)";

	$statement = $pdo->prepare($sql);

	$statement->execute([
			":category" 	=> $category,
			":adress" 		=> $adress,
			":keyword" 		=> $keyword,
			":description"	=> $description,
			":favicon" 		=> $favicon
		]);