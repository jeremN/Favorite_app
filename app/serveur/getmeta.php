<?php

 	header("Access-Control-Allow-Origin: *");

	$url = $_GET['metaUrl'];

	$tags = get_meta_tags($url);

	echo $tags['description'];