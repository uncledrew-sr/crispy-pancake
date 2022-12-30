<?php
	session_start();
	unser($_SESSION['nick']);
	unset($_SESSION['id']);
	header("Location:../index.php");
?>