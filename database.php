<?php

ini_set('display_errors', 'On');
	 $hostname = 'oniddb.cws.oregonstate.edu';
     $databaseName = 'takahasb-db';
     $username = 'takahasb-db';
     $password = '9D5KAZisXHORComp'; 

     $filePath = explode('/', $_SERVER['PHP_SELF'], -1); // this filepath technique is from the lecture code.
     $filePath = implode('/',$filePath);
	 $redirect = "http://" . $_SERVER['HTTP_HOST'] . $filePath;

     $mydata = new mysqli($hostname, $username, $password, $databaseName);
     if ($mydata->connect_errno){
       	echo "Couldn't connect to MySQL: (" . $mydata->connect_errno . ")" . $mydata->connect_error;
  	   	echo "click <a href='final_main.php'>here</a> to return to main page";      
     }



     if (isset($_GET["name"])){
        //echo "$_GET[name]";

        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE username=?"))){
          echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";      
         }
        $username = $_GET["name"];
      
        if(!$stmt->bind_param('s', $username)){
          echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";

        }

        if (!$stmt->execute()){
          echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";
        
          
        }
         $stmt->bind_result($r1, $r2, $r3, $r4);
         $stmt->fetch();
         echo $r2;
         $stmt->close();
    }

    if (isset($_GET["email"])){
        //echo "$_GET[name]";

        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE email=?"))){
          echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";      
         }
        $email = $_GET["email"];
      
        if(!$stmt->bind_param('s', $email)){
          echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";

        }

        if (!$stmt->execute()){
          echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";
        
          
        }
         $stmt->bind_result($r1, $r2, $r3, $r4);
         $stmt->fetch();
         echo $r3;
         $stmt->close();
    }

    if (isset($_POST["signupform"])){
        $usr=$_POST["username"];
        $ema=$_POST["email"];
        $pass=$_POST["password"];
        insert($usr, $ema, $pass);
        //createtable($usr);
        header("Location: final_main.php?signup=1");
        
    }

    function insert($name, $ema, $pass){
        global $mydata;
        //echo "$name, $ema, $pass";
        if (!($stmt = $mydata->prepare("INSERT INTO mybooks_users(username, email, password) VALUES (?, ?, ?)"))){
          echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";
        }
        $username = $name;
        $email = $ema;
        $password = md5($pass);
        if(!$stmt->bind_param('sss', $username, $email, $password)){
          echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";

        }
        if (!$stmt->execute()){
          echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";
        }
        $stmt->close();
        

      
  }

  if (isset($_POST["loginform"])){
        $flag=0;
        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE username=BINARY? AND password=BINARY?"))){
          echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";      
         }
        $name = $_POST["username"];
        $pass = $_POST["password"];
        $pass = md5($pass);
        if(!$stmt->bind_param('ss', $name, $pass)){
          echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";
        }
        if (!$stmt->execute()){
          echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          echo "click <a href='main.php'>here</a> to return to your inventory.";      
        }
         $stmt->bind_result($r1, $r2, $r3, $r4);
         $stmt->fetch();
         //echo ("$r1, $r2, $r3, $r4");
         if(!($r1=="")){
            $flag=1;
         }
         $stmt->close();
         if($flag==1){
            session_start();
            if(session_status() == PHP_SESSION_ACTIVE){
                $_SESSION['username'] = $r2;
                $_SESSION['email'] = $r3;
                $_SESSION['correct'] = 1;
                header("Location: user.php");
            }
            else{
                header("Location: final_main.php?login=2");
            }
        }
        else{
            header("Location: final_main.php?login=2");
        }

        
    }
    
    // $mydata->close();
?>