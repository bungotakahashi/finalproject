var submitflag1=1;
var submitflag2=1;
var submitflag3=1;
var loginflag1=1;
var loginflag2=1;
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
          submitflag1=1;
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
          submitflag1=0;
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

var check_login= function(){
 var username=document.getElementById("username_l").value;
 var password=document.getElementById("password_l").value;
 if (username=="" || password==""){
    alert("You are missing login information. Please fill in the login form.");
    return false;
  }
  var req = new XMLHttpRequest();
  //alert("http://web.engr.oregonstate.edu/~takahasb/Final/database.php?name="+username);

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {

      var  data = this.responseText;          
    // alert(data);          
      if (data=="ok"){
        //alert("true");
        location.href = "database.php?loginform=1&username="+username+"&password="+password;
        /* var req2 = new XMLHttpRequest();
         if(req2){
          alert("ddd");
         }
         var arg2="username="+username+"&password="+password+"&loginform=1";
         req2.onreadystatechange = function (){
          if((this.readyState === 4) && (this.status === 200)) {
          }
        }
           // alert("here");
            req2.open("POST","database.php");
            req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req2.send(arg2);*/
      }
      else {
        alert("login failed");
        return false;
      }
  
    }
   };
    //alert("login");
    var arg="username="+username+"&password="+password+"&login=1";
    
    //alert(arg);
    req.open("POST","database.php");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(arg);
   
 


  };




var check_login2= function(){
 var username=document.getElementById("username_l").value;
 var password=document.getElementById("password_l").value;
 /*if (username=="" || password==""){
    alert("You are missing login information. Please fill in the login form.");
    return false;
  }*/
  var req = new XMLHttpRequest();
  //alert("http://web.engr.oregonstate.edu/~takahasb/Final/database.php?name="+username);

  if(!req){
    throw "Unable to create HttpRequest.";
  }
  if(username=="" || password==""){
    return;
  }

  req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {

      var  data = this.responseText;          
    // alert(data);          
      if (data=="ok"){
        //alert("OKK");
        document.getElementById("loginError").innerHTML = "Valid combination.";
        document.getElementById("login").disabled="";
        document.getElementById("login2").disabled="";
        loginflag1=0;
       
      }
      else {
       // alert("NOT OK");
       document.getElementById("loginError").innerHTML = "Invalid combination.";
       document.getElementById("login").disabled="true";
       document.getElementById("login2").disabled="true";

        loginflag1=1;
      }
  
    }
   };
    //alert("login");
    var arg="username="+username+"&password="+password+"&login=1";
    
    //alert(arg);
    req.open("POST","database.php");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(arg);
   
 


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

var submit_check2=function(){
  //alert("check2");
  if (submitflag1==1 || submitflag2==1){
    //alert("false");
    return false;
  }
  else {
    //alert("true");
   return true;
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
  if (submitflag1==1 || submitflag2==1 || submitflag3==1){
    document.getElementById("signupError").innerHTML = "Please complete the signup sheet";
  
    return false;
  }
  else {
    return true;
  }
};

var login_check=function(){
  //alert(loginflag1);
  var name=document.getElementById("username_l").value;
  var pass=document.getElementById("password_l").value;
  
  if (name=="" || pass==""){
    alert("login failed!!!");
    return false;
  }
  if (loginflag1==1){
    alert("login failed!");
  
    return false;
  }
  else {
    return true;
  }
};


google.load("books", "0", {"language": "US"});

function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('whzu2CkgLqIC', notfound);
};
google.setOnLoadCallback(initialize);

function notfound(){
  alert("We couldn't find the book");
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var originalList = [];
var favoriteList = [];



var fetchData= function(){
//alert("haha");
  var req = new XMLHttpRequest();
  //var url = 'https://www.googleapis.com/books/v1/volumes?q=michael jackson&key=AIzaSyCmDNAHOYXdSZ__qZFSUHEXuQ4qehCB81s';
  //var url  = "https://books.google.com/books?bibkeys=ISBN:0451526538&jscmd=viewapi";
  var url = "http://api.usatoday.com/open/bestsellers/books/titles?author=rowling&api_key=kpzxsbapdfnuae4r8xa7q35f"

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){
      if((this.readyState === 4) && (this.status === 200)) {
        //alert(this.responseText);

        if (! (originalList = JSON.parse(this.responseText))){
          alert("no");
        }
        //var a=this.responseText;
        //alert(originalList.Titles[0].TitleAPIUrl);
        //console.log(originalGistList);
        for (var i=0; i< originalList.Titles.length; i++){
         // originalGistList[i] = originalGistList [i];
          var book = originalList.Titles[i];

          generateHtml(book);

        }

    }

  };


  req.open('GET',url);

  req.send();


};


var generateHtml= function(book){

  var box1 = document.getElementById("box1");
  var tbl1     = document.createElement("table");
  var tblBody1 = document.createElement("tbody");
  var row1 = document.createElement("tr");
  var cell1 = document.createElement("td");

  
  var title = document.createElement("div");
  if (book.Title ){
    title.innerHTML = book.Title;
  }

  else{
    title.innerHTML = "NO Title";
  }
var author = document.createElement("div");
  if (book.Author ){
    author.innerHTML = book.Author;
  }

  else{
    author.innerHTML = "NO Author";
  }

  //var url = document.createElement("a");
  //url.setAttribute("href", gist.url);
  // newText = document.createTextNode(""+gist.url);
  // url.appendChild(newText);
  


  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "+";
  fbutton.setAttribute("bookId", book.TitleAPIUrl);

  fbutton.onclick = function(){


     var bookId = this.getAttribute("bookId");
     var toBeFavoredbook = findById(bookId);
     favoriteList.push(toBeFavoredbook);

     box1.removeChild(tbl1);
     
     
     //localStorage.clear();
     //localStorage["favoriteItems"] = JSON.stringify(favoriteList);
      //favorites(toBeFavoredbook);
     
     
  };

 
  cell1.appendChild(fbutton);
  cell1.appendChild(title);
  cell1.appendChild(author);

 // cell1.appendChild(url);

  
  row1.appendChild(cell1);
  tblBody1.appendChild(row1);
  tbl1.appendChild(tblBody1);
  box1.appendChild(tbl1);
  tbl1.style.border = "thin solid black";
};


var findById = function(id) {
  for (var i=0; i < originalList.Titles.length; i++){
    if (originalList.Titles[i].TitleAPIUrl == id){
      return originalList.Titles[i];
    }
  }

  return undefined;
};

/*var favorites = function(book) {
  
  var box = document.getElementById("box2");
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");

  var title = document.createElement("div");
  if (book.Title ){
    title.innerHTML = book.Title;
  }

  else{
    title.innerHTML = "NO Title";
  }
  var author = document.createElement("div");
  if (book.Author ){
    author.innerHTML = book.Author;
  }

  else{
    author.innerHTML = "NO author";
  }


  //var url = document.createElement("a");
  //url.setAttribute("href", gist.url);
  // newText = document.createTextNode(""+gist.url);
  // url.appendChild(newText);

   var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "-";
  fbutton.setAttribute("bookId", book.id);

  fbutton.onclick = function(){
    for (var i=0; i < favoriteList.length; i++){
      if (favoriteList[i].id == gist.id){  
        favoriteList.splice(i,1);
      }
     
    }
     box.removeChild(tbl);
     
     
     localStorage.clear();
     localStorage["favoriteItems"] = JSON.stringify(favoriteList);
     generateGistHtml(gist);
  };



  var cell = document.createElement("td");

  cell.appendChild(fbutton);
  cell.appendChild(des);
  cell.appendChild(author);

  row.appendChild(cell);
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  box.appendChild(tbl);

  
  tbl.style.border = "thin solid black";
  
  
}

var load = function(){

 if(JSON.parse(localStorage.getItem("favoriteItems"))){
    //alert('not empty');
    favoriteList = JSON.parse(localStorage.getItem("favoriteItems"));
 }

 //else{
 //   alert("empty");
 //}
  
  for (var i=0; i< favoriteList.length; i++){
    favorites(favoriteList[i]);
  }

} 

window.onload=load;

*/
