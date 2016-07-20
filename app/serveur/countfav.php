<?php
	require("db.php"); 

	$count = $_GET['value'];

	$sql = "SELECT COUNT(cat) as num
			FROM site WHERE cat=:key ";

	$statement = $pdo->prepare($sql);
	$statement->execute([
			":key" => $count
		]);


	$values = $statement->fetchAll();

	foreach ($values as $value) {
?>

	<p><?=$value['num']?></p>

<?php
	}
?>