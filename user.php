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
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src= "final.js"></script>
</head>
<body>';

if(session_status() == PHP_SESSION_ACTIVE){
	echo "<h1>Hello $_SESSION[username].</h1>" ;
	$logout="<a href=user.php?logout=1>here</a>";
	echo "click $logout to logout<br>";
  echo '<div id="viewerCanvas" style="width: 600px; height: 500px"></div>';
  echo "<br><br>";
  echo '<input type="button" value="Best sellers" onclick="fetchData()"></input>';
  echo ' <div class= "contents">
      <div id= "books">
        <h1>BESTSELLERS</h1>
        <div id="box1" style="width: 600px; height: 500px; overflow:scroll">
        </div>

      </div>


      <div id= "favorites">
        <h1>Favorite GISTS</h1>
        <div id="box2">
          <p>favorites</p>
        </div>


      </div>';

}


?>
</body>
</html>