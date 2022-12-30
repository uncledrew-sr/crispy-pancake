<?php
	session_start();
	if(!isset($_SESSION['nick'])){
		echo "<script>alert('로그인 후 이용해주세요.');</script>";
		echo "<script>location.href='../login/login.php';</script>";
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>글쓰기</title>
</head>
<body>
	<form action="write_progress.php" method="post">
		<input type="text" name="title" placeholder="제목">
		<input type="text" name="text" placeholder="글 내용">
		<input type="submit" value="글쓰기">
	</form>
	<a href="../index.php">메인페이지로 이동</a>
</body>
</html>