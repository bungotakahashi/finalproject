var submitflag1=1;
var submitflag2=1;
var submitflag3=1;

var check= function(value, type){

  var req = new XMLHttpRequest();
  //alert("http://web.engr.oregonstate.edu/~takahasb/Final/database.php?name="+username);

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){

    if((this.readyState === 4) && (this.status === 200)) {
      //var dataresult=JSON.parse(this.responseText);
      //alert(this.responseText);
      //alert("a");
      if(!(this.responseText == "")){
        if (type=="username"){
          document.getElementById("usernameError").innerHTML = "This username is already taken.";
          submitflag=1;
        }
        else if (type=="email"){
          document.getElementById("emailError").innerHTML = "This email is already used.";
          submitflag2=1;

        }

        else {
          alert("error, unexpected type");
          return;
        }
       // alert("ng");
        }  

      else{
        //alert("ok");
        if (type=="username"){
          document.getElementById("usernameError").innerHTML = "Valid username";
          submitflag=0;
        }
        else if (type=="email"){
          document.getElementById("emailError").innerHTML = "Valid email";
          submitflag2=0;

        }
        else {
          alert("error, unexpected type");
          return;
        }
      }
                
    }

  };
  


  if (type=="username"){
    req.open('GET',"database.php?name="+value);
  }
  else if (type=="email"){
    req.open('GET',"database.php?email="+value);
  }
  else {
    alert("unexpected type");
    return;
  }

  req.send(null);



  };

var check_password=function(value){
  if (value.length<6){
    document.getElementById("passwordError").innerHTML = "Please make your password equal to or longer than 6 characters";
    submitflag3=1;
  }
  else {
    document.getElementById("passwordError").innerHTML = "Valid password";
    submitflag3=0;
  }
 
};

var submit_check=function(){
  var name=document.getElementById("username_s").value;
  var mail=document.getElementById("email_s").value;
  var pass=document.getElementById("password_s").value;
  
  if (name=="" || mail==""|| pass==""){
    document.getElementById("signupError").innerHTML = "Please complete the signup sheet";
    return false;
  }
  if (submitflag==1 || submitflag2==1 || submitflag3==1){
    document.getElementById("signupError").innerHTML = "Please complete the signup sheet";
    return false;
  }
  else {
    return true;
  }
};