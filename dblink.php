<?php
	$dsn='mysql:host=127.0.0.1;dbname=nasafinal;charset=utf8';
	try{
		// Connect to MySQL database
		$db = new PDO($dsn, "nasa", "nasa2017");
	} catch(PDOException $e){
		// Show error
		$error = 'Connection Unsuccessful: '.$e->getMessage();
		print_r($error);
		// close PDO
		$db=null;
	}
?>