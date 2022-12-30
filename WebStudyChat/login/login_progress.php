<?php
	session_start();
	$connect = mysqli_connect("localhost", "root", "", "blog");
	// 주소 계정이름 비밀번호 DB이름
	$id = $_POST['id']; //login.php에서 id 받아오기
 	$pw = $_POST['pw'];
 	$sql = "SELECT * FROM users WHERE id = '$id' AND pw = '$pw'";
 	$result = mysqli_query($connect, $sql);
 	$data = mysqli_fetch_array($result);
 	if(!$data){
 		echo "<script>alert('아이디가 존재하지 않습니다.');</script>";
 		echo "<script>location.href='./login.php';</script>";
 	}
 	else{
 		$_SESSION['id'] = $data['id'];
 		$_SESSION['nick'] = $data['nick'];
 		header('location:../index.php');
 	}

 ?>	