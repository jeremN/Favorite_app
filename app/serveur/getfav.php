<?php
	require("db.php"); 

	$category = $_GET['category'];


	$sql = "SELECT adress, favicon, description  
			FROM site WHERE cat LIKE :key";

	$statement = $pdo->prepare($sql);
	$statement->execute([
			":key" => $category
		]);

	$sites = $statement->fetchAll();

	foreach ($sites as $site) {
?>
	<li class="result-card col-lg-12">
		<div class="result-icon col-lg-2">

			<a href="https://<?= $site['adress']?>" target="_blank">
				<img src="https://<?=$site['favicon']?>">
			</a>
		</div>
		<div class="result-detail col-lg-7 col-lg-offset-1">
			<h2><?=$site['adress']?></h2>
			<p><?=$site['description']?></p>
		</div>
		<a href="https://<?=$site['adress']?>" title="View site" class="view-btn col-lg-2" target="_blank">View</a>
	</li>

<?php
	}
?>