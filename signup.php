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




echo  '<form  action= "http://web.engr.oregonstate.edu/~takahasb/Final/database.php" method= "POST" onsubmit="return submit_check();">
        username:<input type= "text" id="username_s" name="username" onchange="check(value, name)"><span id="usernameError"></span><br>
        email:<input type= "text" id="email_s" name="email" onchange="check(value, name)"><span id="emailError"></span><br>  
        password:<input type= "text" id="password_s" name="password" onchange="check_password(value)"><span id="passwordError"></span><br>   
        Note: Make your password equal to or longer than 6 characters (numbers can be included, of course.)<br>            
        <input type= "submit" value="Signup" name="signupform" ><span id="signupError"></span><br>
      </form>';

   
          // logout function is in content1.php in my program structure.
    
  echo '</body>
</html>';
?>
