<?php
session_start();
if(!(isset($_SESSION['correct']) && $_SESSION['correct']==1)){
    header("Location: final_main.php");
  }
if(isset($_GET['logout']) && $_GET['logout'] == '1'){  // this destroy code is also from the lecture code.
  //$_SESSION = array();
  session_destroy();  
  header("Location: final_main.php");
  die();
}

echo '<!DOCTYPE html>
<html>
<head>
  <meta charset= "UTF-8">
    <title>MYBOOKS</title>
    <link rel= "stylesheet" href="final2.css">
    <script src= "final.js"></script>
</head>
<body>';

if(session_status() == PHP_SESSION_ACTIVE){
	echo "<h1>Hello $_SESSION[username]. Your email is $_SESSION[email] </h1>";
	$logout="<a href=user.php?logout=1>here</a>";
	echo "click $logout to logout<br>";
  var_dump ($_SESSION);
}
?>
</body>
</html>