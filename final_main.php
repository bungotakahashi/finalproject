<?php
echo '<!DOCTYPE html>
<html>
  <head>
    <meta charset= "UTF-8">
    <title>MYBOOKS</title>
    <link rel="stylesheet" href="style.css">
    <script src= "final.js"></script>
    </head>
  <body>';

include "database.php";



echo "<h1>MYBOOKS</h1>
      <p>If you are a new user click <a href='http://web.engr.oregonstate.edu/~takahasb/Final/signup.php'>here</a> to go to the sign up page.</p>
      <p>LOGIN</p>";

/*if (!$mydata->query("CREATE TABLE mybooks_users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (255) UNIQUE NOT NULL)")){
          echo 'program terminates.';
          die();
};*/

echo  '<form action= "http://web.engr.oregonstate.edu/~takahasb/Final/login.php" method= "POST">
        username:<input type= "text" name="username" onchange="check_username(this.value)"><br>
        password:<input type= "text" name="password" onchange="check_username(this.value)"><br>         
        <input type= "submit" value="Login">
      </form>';

   
          // logout function is in content1.php in my program structure.
    
  echo '</body>
</html>';
?>
