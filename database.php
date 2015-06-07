<?php
//ini_set('display_errors', 'On');
	 $hostname = 'oniddb.cws.oregonstate.edu';
     $databaseName = 'takahasb-db';
     $username = 'takahasb-db';
     $password = '9D5KAZisXHORComp'; 

     $filePath = explode('/', $_SERVER['PHP_SELF'], -1); // this filepath technique is from the lecture code.
     $filePath = implode('/',$filePath);
	 $redirect = "http://" . $_SERVER['HTTP_HOST'] . $filePath;

     $mydata = new mysqli($hostname, $username, $password, $databaseName);
     if ($mydata->connect_errno){
       	//echo "Couldn't connect to MySQL: (" . $mydata->connect_errno . ")" . $mydata->connect_error;
  	   	header("Location: final_main.php");            
     }


     if (isset($_GET["name"])){
        //echo "$_GET[name]";

        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE username=?"))){
          //echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");      
         }
        $username = $_GET["name"];
      
        if(!$stmt->bind_param('s', $username)){
          //echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");      
        }

        if (!$stmt->execute()){
          //echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");              
          
        }
         $stmt->bind_result($r1, $r2, $r3, $r4);
         $stmt->fetch();
         echo $r2;
         $stmt->close();
    }

    if (isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["login"])){
        //echo "$_GET[name]";
    //    $message = "wrong answer";
    //echo "<script type='text/javascript'>alert('$message');</script>";


        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE username=?"))){
          //echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: final_main.php");      
         }
        $username = $_POST["username"];
        $password = md5($_POST["password"]);
        if(!$stmt->bind_param('s', $username)){
          //echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: final_main.php");      
        }

        if (!$stmt->execute()){
          //echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
         header("Location: final_main.php");      
        
          
        }
         $stmt->bind_result($r1, $r2, $r3, $r4);
         $stmt->fetch();
         if ($r2==$username && $r4==$password){
            echo "ok";
         }
         else {
            echo "bad";
         }
         $stmt->close();
    }

    if (isset($_GET["email"])){
        //echo "$_GET[name]";

        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE email=?"))){
          //echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");            
         }
        $email = $_GET["email"];
      
        if(!$stmt->bind_param('s', $email)){
          //echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");      

        }

        if (!$stmt->execute()){
          //echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          header("Location: signup.php?signup=2");      
        
          
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
        $tname=$usr."_table";
        $que="CREATE TABLE $tname(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR (255) UNIQUE NOT NULL, author VARCHAR (255) NOT NULL, amazon VARCHAR (255) UNIQUE, isbn VARCHAR (255) UNIQUE NOT NULL,  wishlist BOOL NOT NULL DEFAULT 0)";
        if (!$mydata->query($que)){
          //echo "Couldn't make a table: (" . $mydata->errno . ")" . $mydata->error;
          die();
        }
        header("Location: final_main.php?signup=1");
        
    }

    function insert($name, $ema, $pass){
        global $mydata;
        //echo "$name, $ema, $pass";
        if (!($stmt = $mydata->prepare("INSERT INTO mybooks_users(username, email, password) VALUES (?, ?, ?)"))){
         // echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";
        }
        $username = $name;
        $email = $ema;
        $password = md5($pass);
        if(!$stmt->bind_param('sss', $username, $email, $password)){
         // echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";

        }
        if (!$stmt->execute()){
          //echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          echo "Error: click <a href='signup.php'>here</a> to return to sign-up page and try again.";
        }
        $stmt->close();
        

      
  }


  if (isset($_GET["loginform"])){
//$message = "wrong answer";
    // echo "<script type='text/javascript'>alert('$message');</script>";
        $flag=0;
        if (!($stmt = $mydata->prepare("SELECT * FROM mybooks_users WHERE username=BINARY? AND password=BINARY?"))){
         // echo "Prepare failed: (" . $mydata->errno . ")" . $mydata->error;
          header("Location: final_main.php");      
         }
        $name = $_GET["username"];
        $pass = $_GET["password"];
        $pass = md5($pass);
        if(!$stmt->bind_param('ss', $name, $pass)){
          //echo "Binding parameters failed: (" . $mydata->errno . ")" . $mydata->error;
         header("Location: final_main.php");      
         }
        if (!$stmt->execute()){
          //echo "execute failed :(" . $mydata->errno . ")" . $mydata->error;
          header("Location: final_main.php");      
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
                //$message = "wrong answer";
                //echo "<script type='text/javascript'>alert('$message');</script>";
                header("Location: user.php", true);
            }
            else{
                header("Location: final_main.php?login=2");
            }
        }
        else{
            header("Location: final_main.php?login=2");
        }

        
    }
 
    if(isset($_GET["favorite"]) && $_GET["favorite"]==1){
      session_start();
        if(session_status() == PHP_SESSION_ACTIVE){
            $user = $_SESSION['username'];
               
        }
        else {
          return 0;
        }
  
      $tbl=$user."_table";
      if (!($stmt = $mydata->prepare("INSERT INTO $tbl(name, author, amazon, isbn, wishlist) VALUES (?, ?, ?, ?, ?)"))){
          echo "Prepare failed";
          return 0;
      }
      $name=$_GET["name"];
      $author=$_GET["author"];
      $amazon=$_GET["amazon"];
      $isbn=$_GET["isbn"];
      $wish=1;
   
      if(!$stmt->bind_param('ssssi', $name, $author, $amazon, $isbn, $wish)){
          echo "Binding parameters failed";
          return 0;
        }
        if (!$stmt->execute()){
          echo "execute failed"; 
          return 0;
        }
        $stmt->close();      
        //header("Location: user.php");
    }

    if(isset($_GET["favorite"]) && $_GET["favorite"]==2){
      session_start();
        if(session_status() == PHP_SESSION_ACTIVE){
            $user = $_SESSION['username'];
               
        }
        else {
          return 0;
        }
            
      $tbl=$user."_table";
      if (!($stmt = $mydata->prepare("SELECT * FROM $tbl WHERE wishlist=?"))){
          echo "Prepare failed";
          return 0;      
         }
        $wish = 1;
      
        if(!$stmt->bind_param('i', $wish)){
          echo "Binding parameters failed";
          return 0;
        }

        if (!$stmt->execute()){
          echo "execute failed";
          return 0;        
          
        }
        $arr=array();
      
        $result = $stmt->get_result();
         while($row = $result->fetch_assoc()){
            $arr[]=array(
            'id'=>$row['id'],
            'name'=>$row['name'],
            'author'=>$row['author'],
            'amazon'=>$row['amazon'],
            'isbn'=>$row['isbn'],
            'wishlist'=>$row['wishlist']
            );
          }
          echo json_encode($arr);
        $stmt->close();

    }

     if(isset($_GET["favorite"]) && $_GET["favorite"]==3){
      session_start();
        if(session_status() == PHP_SESSION_ACTIVE){
            $user = $_SESSION['username'];
               
        }
        else {
          return 0;
        }
            
      $tbl=$user."_table";
      if (!($stmt = $mydata->prepare("DELETE FROM $tbl WHERE name=?"))){
          echo "Prepare failed";
          return 0;      
         }
        $name = $_GET["name"];
      
        if(!$stmt->bind_param('s', $name)){
          echo "Binding parameters failed";
          return 0;
        }

        if (!$stmt->execute()){
          echo "execute failed";
          return 0;        
          
        }
    
        
        $stmt->close();

    }

    if(isset($_GET["favorite"]) && $_GET["favorite"]==4){
      session_start();
        if(session_status() == PHP_SESSION_ACTIVE){
            $user = $_SESSION['username'];
               
        }
        else {
          return 0;
        }
            
      $tbl=$user."_table";
      if (!($stmt = $mydata->prepare("SELECT * FROM $tbl WHERE isbn=?"))){
          echo "Prepare failed";
          return 0;      
         }
        $isbn = (string)$_GET["isbn"];
      
        if(!$stmt->bind_param('s', $isbn)){
          echo "Binding parameters failed";
          return 0;
        }

        if (!$stmt->execute()){
          echo "execute failed";
          return 0;        
          
        }
        $arr=array();
      
        $result = $stmt->get_result();
         while($row = $result->fetch_assoc()){
            $arr[]=array(
            'id'=>$row['id'],
            'name'=>$row['name'],
            'author'=>$row['author'],
            'amazon'=>$row['amazon'],
            'isbn'=>$row['isbn'],
            'wishlist'=>$row['wishlist']
            );
          }
          echo json_encode($arr);
        $stmt->close();

    }


    
?>