<?php
	require("db.php"); 

	$count = $_GET['value'];

	$sql = "SELECT COUNT(cat) AS 'val'
			FROM site WHERE cat=:key";

	$statement = $pdo->prepare($sql);
	$statement->execute([
			":key" => $count
		]);


	$values = $statement->fetchAll();

	foreach($values as $value){
?>

	<img src="app/img/element/folder.png" alt="" width="43" height="36">
	<p><?=$value['val']?></p>

<?php
	}
?>
