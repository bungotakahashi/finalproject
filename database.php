<?php

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

     if (isset($_GET["name"]){

     }
     mysql_close($mydata);
?>