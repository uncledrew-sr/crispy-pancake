<?php
	session_start();
	$connect = mysqli_connect("localhost", "root", "", "blog");
 	$sql = "SELECT * FROM free";
 	$result = mysqli_query($connect, $sql);
 	$write_list = "";
 	while($row = mysqli_fetch_array($result)){
 		$write_list = $write_list."<li>".$row['num']." | ".$row['writer']." | ".$row['title']." | ".$row['text']." | ".$row['date_time']."</li>";
 	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Main</title>
</head>
<body>
	<?php
		if(!isset($_SESSION['nick'])){
	?>	
		<a href="./login/login.php">로그인</a>
		<a href="#">회원가입</a>
	<?php
		}
		else{
			$col =  "<p>".$_SESSION["nick"]."님 환영합니다.</p>";
			echo $col;
	?>
			<a href="./login/logout.php">로그아웃</a>
			<a href="./write/write.php">글쓰기</a>
	<?php
		}
	?>
	<ul>
		<?=$write_list?>
	</ul>
</body>
</html>

