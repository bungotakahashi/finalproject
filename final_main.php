<?php
session_start();
if(session_status() == PHP_SESSION_ACTIVE){
  if(isset($_SESSION['correct']) && $_SESSION['correct']==1){
    header("Location: user.php");
  }

  if (isset($_SESSION))
  echo '<!DOCTYPE html>
  <html>
    <head>
      <meta charset= "UTF-8">
      <title>MYBOOKS</title>
      <link rel="stylesheet" href="final.css">
      <script src= "final.js"></script>
      </head>
    <body id = "main">';
  include "database.php";



  echo "<h1>MYBOOKS</h1>
        <p>This service shows you a list of best sellers (TOP 150) of a month, and you can preview or save books in your own wish list.</p>
        <p>If you are a new user click <a href='http://web.engr.oregonstate.edu/~takahasb/Final/signup.php'>here</a> to go to the sign-up page.</p>
        <h3>LOGIN</h3>";

  /*$que="CREATE TABLE mybooks_users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (255) UNIQUE NOT NULL, 
        password VARCHAR (255) NOT NULL)";

  if (!$mydata->query($que)){
            echo 'program terminates.';
            die();
  };*/




  echo  '<form action= "http://web.engr.oregonstate.edu/~takahasb/Final/database.php" id="login" method= "POST"  onsubmit="check_login(); return false" >
          username:<input type= "text" name="username" id="username_l"> <br>
          password:<input type= "password" name="password" id="password_l" ><br>         
          <input type= "submit" id="login2" value="Login" name="loginform" ><span id="loginError"></span><br> 
        </form>';

    if(isset($_GET["login"])){
      if($_GET["login"]==2){
      echo "<h3>LOGIN FAILED</h3>";
      }
    }
    if(isset($_GET["signup"])){
      if($_GET["signup"]==1){
      echo "<h3>Your sign-up was successful! Login and enjoy MYBOOKS!</h3>";
      }
    }
            // logout function is in content1.php in my program structure.
      
    echo '</body>
    </html>';
    }
  else {
    header("Location: final_main.php");
}
?>
