<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>
</head>
<body>
	<?php
		if($!isset($_SESSION['nick'])){
			?>
			<a href="./login/login.php">로그인</a>
			<a href="#">회원가입</a>
	<?php
		}else{
			?>
		<?=$_SESSION['nick']?>
		<a href="./login/logout.php">로그아웃</a>
	<?php
		}
	?>
</body>
</html>

