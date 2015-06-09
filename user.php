<?php
ini_set('session.save_path', '/nfs/stak/students/t/takahasb/public_html/Final/session');
session_start();
if(session_status() != PHP_SESSION_ACTIVE){
  header("Location: final_main.php?6");
}
if(!(isset($_SESSION['correct']) && $_SESSION['correct']==1)){
  //echo "<script type='text/javascript'>alert($_SESSION[correct]);</script>";
    header("Location: final_main.php?3");
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
    <title>MYBOOKS 2015</title>
    <link rel= "stylesheet" href="final2.css">
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src= "final.js"></script>
</head>
<body>';
/*echo '<script>
google.load("books", "0", {"language": "US"});
function initialize(a) {
  var isbn="ISBN:"+a;
  var viewer = new google.books.DefaultViewer(document.getElementById("viewerCanvas"));
  viewer.load(isbn, notfound);
};
function notfound(){
  alert("This book is not available now. Probably this book is very new.");
};
</script>';*/
if(session_status() == PHP_SESSION_ACTIVE){
  $x=rand (1, 3);
  $hello="";
  if ($x==1){$hello="Hello ";}
  else if ($x==2){$hello="What's up ";}
  else{$hello="How's it going, ";}
	echo "<h1 id='hello'>$hello $_SESSION[username] \(•_•)/</h1>" ;

	$logout="<button id='logout'><a href=user.php?logout=1>LOGOUT</a></button>";
	echo "$logout<br>";
 
  echo "<br><br>";
  echo "MONTH(1-12):<input type= 'number' id = 'month'>";
  echo '<input type="button" id="fetch" value="Best sellers" onclick="fetchData()"></input>';
  //echo '<input type= "submit" value="Best Sellers"><br>';
  echo '<div class= "contents">
          <div id= "books">
            <h1 id=title>Best Sellers in 2015</h1>

            <div id="box1">
            <p id = "nodata"></p>
            </div>
          </div>
          
        
          <div id="viewerCanvas" >
          <h1>Preview</h1>
          </div>

          <div id= "favorites">
            <h1>Wish List</h1>
            <div id="box2">
            </div>
          </div>
        
        </div>';

}

echo "</body>
</html>";
?>
