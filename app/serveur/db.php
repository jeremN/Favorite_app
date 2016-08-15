<?php

    define("DBHOST", "jeremnehbhjeremn.mysql.db");  //ip du serveur MySQL
    define("DBUSER", "jeremnehbhjeremn"); 		//username MySQL
    define("DBPASS", "16Favapp1508");			//mot de passe MySQL
    define("DBNAME", "fav_app");    //nom de la bdd

	try {
		//crée un objet PDO
		$pdo = new PDO(
			'mysql:host='.DBHOST.';dbname='.DBNAME, 	//dsn
			DBUSER, 	//username 
			DBPASS, //mot de passe
			array(
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8", //pour communiquer en utf8 avec le serveur MySQL
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //on veut recevoir des arrays associatifs, dans les requêtes SELECT
				PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING //on veut afficher toutes les erreurs MySQL
			)
		);
	} catch (PDOException $e) {
	    echo 'Erreur de connexion : ' . $e->getMessage();
	}