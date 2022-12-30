<?php
	session_start();
	//사용자 입력을 받아옴
	$id = $_POST["id"];
	$pw = $_POST["pw"];
	//DB연결 (주소, 계정이름, 비밀번호, DB이름)
	$connect = mysqli_connect("localhost", "root", "", "chat");
	$sql = "SELECT * FROM users WHERE id = '$id' AND pw = '$pw'";
	//DB에 sql문 전송
	$result = mysqli_query($connect, $sql);
	$data = mysqli_fetch_array($result);
	if(!$data){
		echo "<script>alert('아이디가 존재하지 않습니다.');</script>";
		echo "<script>location.href='.login.php';</script>";
	}
	else{
		$_SESSION['id']=$data['id'];
		$_SESSION['nick']=$data['nick'];
		header('location:../index.php');
	}
?>
