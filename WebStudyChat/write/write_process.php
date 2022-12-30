<?php
	session_start();
	$connect = mysqli_connect("localhost", "root", "", "blog");
	$title = $_POST['title'];
 	$text = $_POST['text'];
 	$nick = $_SESSION['nick'];
 	$sql = "INSERT INTO free(title, text, writer, date_time) VALUES('$title', '$text', '$nick', NOW())";
 	$result = mysqli_query($connect, $sql);
 	header("location:../index.php");
 ?>	