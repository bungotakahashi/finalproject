var submitflag1=1;
var submitflag2=1;
var submitflag3=1;
var loginflag1=1;
var loginflag2=1;
var check= function(value, type){

  var req = new XMLHttpRequest();

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){

    if((this.readyState === 4) && (this.status === 200)) {
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
      }  

      else{
        if (type=="username"){
          document.getElementById("usernameError").innerHTML = "Valid username";
          submitflag1=0;
        }
        else if (type=="email"){
          document.getElementById("emailError").innerHTML = "Valid email (untaken)";
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
  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {
      var  data = this.responseText;                   
      if (data=="ok"){
        location.href = "database.php?loginform=1&username="+username+"&password="+password;
      }
      else {
        alert("login failed");
        return false;
      }
  
    }
  };
    var arg="username="+username+"&password="+password+"&login=1";
    req.open("POST","database.php");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(arg);
};


/*var check_login2= function(){
  var username=document.getElementById("username_l").value;
  var password=document.getElementById("password_l").value;
 
  var req = new XMLHttpRequest();

  if(!req){
    throw "Unable to create HttpRequest.";
  }
  if(username=="" || password==""){
    return;
  }

  req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {

      var  data = this.responseText;          
             
      if (data=="ok"){
        document.getElementById("loginError").innerHTML = "Valid combination.";
        document.getElementById("login").disabled="";
        document.getElementById("login2").disabled="";
        loginflag1=0;
       
      }
      else {
       document.getElementById("loginError").innerHTML = "Invalid combination.";
       document.getElementById("login").disabled="true";
       document.getElementById("login2").disabled="true";
       loginflag1=1;
      }
  
    }
   };
    
    var arg="username="+username+"&password="+password+"&login=1";
    req.open("POST","database.php");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(arg);
  };
*/



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
  if (submitflag1==1 || submitflag2==1){
    return false;
  }
  else {
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
function initialize(a) {
  var isbn="ISBN:"+a;
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load(isbn, notfound);
};
//google.setOnLoadCallback(initialize);

function notfound(){
  alert("This book is not available now. Probably this book is very new.");
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var originalList = [];

var fetchData= function(){
//alert("haha");
  var req = new XMLHttpRequest();
   if(!req){
    throw "Unable to create HttpRequest.";
  }
  
  var month = document.getElementById("month").value;
  var date=new Date();
  if (month<1 || month >date.getMonth()+1){
    var message = "It's "+(1+date.getMonth().valueOf())+"/"+date.getDate()+" today. "+"Month needs to be between 1 and "+(1+date.getMonth().valueOf());
    alert(message);
    return 0;
  }
  
  //var url = 'https://www.googleapis.com/books/v1/volumes?q=michael jackson&key=AIzaSyCmDNAHOYXdSZ__qZFSUHEXuQ4qehCB81s';
  //var url  = "https://books.google.com/books?bibkeys=ISBN:0451526538&jscmd=viewapi";
  //var url = "http://api.usatoday.com/open/bestsellers/books/thisweek?count=50&api_key=kpzxsbapdfnuae4r8xa7q35f";
  var url = "http://api.usatoday.com/open/bestsellers/books/booklists/2015/"+month+"?&api_key=kpzxsbapdfnuae4r8xa7q35f";
  //var url = "http://api.usatoday.com/open/bestsellers/books/booklists/2010/08?&api_key=kpzxsbapdfnuae4r8xa7q35f";
 
  
  var list = document.getElementById("box1");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  var mon_str=month_string(month);
  document.getElementById("title").innerHTML="Best Sellers in 2015: " + mon_str;

  req.onreadystatechange = function (){
      if((this.readyState === 4) && (this.status === 200)) {
        if (! (originalList = JSON.parse(this.responseText))){
          alert("no");
        }
        console.log(originalList);
        if (originalList.BookLists.length==0){
          var tbl0 = document.createElement("table");
          var none = document.createElement("div");
          none.innerHTML = "No data for this month. It will be available in a week at most.";
          tbl0.appendChild(none);
          document.getElementById("box1").appendChild(tbl0); 
        }
        for (var i=0; i< originalList.BookLists[0].BookListEntries.length; i++){
          var book = originalList.BookLists[0].BookListEntries[i];
          generateHtml(book);
        }
    }
  };
  req.open('GET',url);
  req.send();
};


var month_string = function(month){
  var str="";
  switch (month) {
   
    case '1':
          str = "January";
          break;
    case '2':
          str = "February";
          break;
    case '3':
          str = "March";
          break;
    case '4':
          str = "April";
          break;
    case '5':
          str = "May";
          break;
    case '6':
          str = "June";
          break;
    case '7':
          str = "July";
          break;
    case '8':
          str = "August";
          break;
    case '9':
          str = "September";
          break;
    case '10':
          str = "October";
          break;
    case '11':
          str = "November";
          break;
    case '12':
          str = "December";
          break;
  }
  return str;
};


var generateHtml= function(book){

  var box1 = document.getElementById("box1");
  var tbl1     = document.createElement("table");
  var tblBody1 = document.createElement("tbody");
  var row1 = document.createElement("tr");
  var cell1 = document.createElement("td");

  
  var title = document.createElement("div");
  if (book.Title ){
    title.innerHTML = "Title: "+book.Title;
  }

  else{
    title.innerHTML = "NO Title";
  }
var author = document.createElement("div");
  if (book.Author ){
    author.innerHTML = "Author: "+book.Author;
  }

  else{
    author.innerHTML = "NO Author";
  }

  var url = document.createElement("a");
  if (book.ASIN){ 
     var x="http://www.amazon.com/o/ASIN/"+book.ASIN;
     url.setAttribute("href", x);
     newText = document.createTextNode(""+x);
     url.appendChild(newText);

  }

  else{
    var x="";
    url.setAttribute("href", x);
    newText = document.createTextNode(""+x);
    url.appendChild(newText);
    
  }
  
  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "Add to Wish List";
  fbutton.setAttribute("bookId", book.TitleAPIUrl);
  fbutton.setAttribute("id", "buttonA");

  fbutton.onclick = function(){
     var bookId = this.getAttribute("bookId");
     //alert(bookId);
     var toBeFavoredbook = findById(bookId);
     //favoriteList.push(toBeFavoredbook);
     favorites(toBeFavoredbook);
     moving_row(book);
     box1.removeChild(tbl1);

  };

  var fbutton2 = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton2.innerHTML = "Preview";
  fbutton2.setAttribute("bookId", book.TitleAPIUrl);
  fbutton2.setAttribute("id", "buttonB");

  fbutton2.onclick = function(){
      initialize(book.ISBN); 
  };


 
  cell1.appendChild(fbutton);
  cell1.appendChild(fbutton2);
  cell1.appendChild(title);
  cell1.appendChild(author);
  cell1.appendChild(url);
  
  row1.appendChild(cell1);
  tblBody1.appendChild(row1);
  tbl1.appendChild(tblBody1);
  box1.appendChild(tbl1);
  tbl1.style.border = "thin solid black";
};


var findById = function(id) {
  for (var i=0; i < originalList.BookLists[0].BookListEntries.length; i++){
    if (originalList.BookLists[0].BookListEntries[i].TitleAPIUrl == id){
      return originalList.BookLists[0].BookListEntries[i];
    }
  }

  return undefined;
};


var favorites = function(book) {
  var author=book.Author;
  var title=book.Title;
  var id=book.TitleAPIUrl;
  var isbn=book.ISBN;
  var amazon= "http://www.amazon.com/o/ASIN/"+book.ASIN;
  var req = new XMLHttpRequest();
  var url = "database.php?favorite=1&name="+title+"&author="+author+"&amazon="+amazon+"&isbn="+isbn;

  if(!req){
    throw "Unable to create HttpRequest.";
  }
  
  /*req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {
    }
  };*/
    
  req.open("GET",url);
  req.send();
};


var load = function(){

  var req = new XMLHttpRequest();
  var url = "database.php?favorite=2";
 
  if(!req){
    throw "Unable to create HttpRequest.";
  }
  
  req.onreadystatechange = function (){
    if((this.readyState === 4) && (this.status === 200)) {
      var fav = JSON.parse(this.responseText);
      //console.log(fav);
      for (var i=0; i<fav.length; i++){
        favlist(fav[i]);
      }
    }
  };
    
  req.open("GET",url);
  req.send();

}; 

window.onload=load;


var favlist = function(book){

  var box2 = document.getElementById("box2");
  var tbl2     = document.createElement("table");
  var tblBody2 = document.createElement("tbody");
  var row2 = document.createElement("tr");
  var cell2 = document.createElement("td");

  
  var title = document.createElement("div");
  if (book.name){
    title.innerHTML = "Title: "+book.name;
  }

  else{
    title.innerHTML = "NO Title";
  }

  var author = document.createElement("div");
  if (book.author){
    author.innerHTML = "Author: "+book.author;
  }

  else{
    author.innerHTML = "NO Author";
  }

  var amazon = document.createElement("a");
  if (book.amazon){ 
     amazon.setAttribute("href", book.amazon);
     newText = document.createTextNode(""+book.amazon);
     amazon.appendChild(newText);

  }

  else{
    var x="";
    amazon.setAttribute("href", x);
    newText = document.createTextNode(""+x);
    amazon.appendChild(newText);
    
  }

  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.setAttribute("id", "buttonC");
  fbutton.innerHTML = "Delete";
  

  fbutton.onclick = function(){
    if (confirm("Do you really want to delete this book from your Wish List?") == false) {
        return 0;
    }
     box2.removeChild(tbl2);
     var req = new XMLHttpRequest();
     var url = "database.php?favorite=3&name="+book.name;
     if(!req){
       throw "Unable to create HttpRequest.";
     }
        
     req.onreadystatechange = function (){
       if((this.readyState === 4) && (this.status === 200)) {
       }
     };
     req.open("GET",url);
     req.send();
           
  };

  var fbutton2 = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton2.innerHTML = "Preview";
  fbutton2.setAttribute("bookId", book.TitleAPIUrl);
  fbutton2.setAttribute("id", "buttonD");

  fbutton2.onclick = function(){
     initialize(book.isbn); 
  };

  cell2.appendChild(fbutton);
  cell2.appendChild(fbutton2);
  cell2.appendChild(title);
  cell2.appendChild(author);
  cell2.appendChild(amazon);
  
  row2.appendChild(cell2);
  tblBody2.appendChild(row2);
  tbl2.appendChild(tblBody2);
  box2.appendChild(tbl2);
  tbl2.style.border = "thin solid black";
};



var moving_row = function(book){
  var box2 = document.getElementById("box2");
  var tbl2     = document.createElement("table");
  var tblBody2 = document.createElement("tbody");
  var row2 = document.createElement("tr");
  var cell2 = document.createElement("td");

  
  var title = document.createElement("div");
  if (book.Title){
    title.innerHTML = "Title: "+book.Title;
  }

  else{
    title.innerHTML = "NO Title";
  }

  var author = document.createElement("div");
  if (book.Author){
    author.innerHTML = "Author: "+book.Author;
  }

  else{
    author.innerHTML = "NO Author";
  }

var url = document.createElement("a");
  if (book.ASIN){ 
     var x="http://www.amazon.com/o/ASIN/"+book.ASIN;
     url.setAttribute("href", x);
     newText = document.createTextNode(""+x);
     url.appendChild(newText);

  }

  else{
    var x="";
    url.setAttribute("href", x);
    newText = document.createTextNode(""+x);
    url.appendChild(newText);
    
  }

  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "Delete";
  fbutton.setAttribute("id", "buttonC");

  

  fbutton.onclick = function(){
    if (confirm("Do you really want to delete this book from your Wish List?") == false) {
        return 0;
    }
     box2.removeChild(tbl2);
     var req = new XMLHttpRequest();
     var url = "database.php?favorite=3&name="+book.Title;
     if(!req){
       throw "Unable to create HttpRequest.";
     }
        
     req.onreadystatechange = function (){
       if((this.readyState === 4) && (this.status === 200)) {
       }
     };
     req.open("GET",url);
     req.send();
           
  };

  var fbutton2 = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton2.innerHTML = "Preview";
  fbutton2.setAttribute("bookId", book.TitleAPIUrl);
  fbutton2.setAttribute("id", "buttonD");

  fbutton2.onclick = function(){
     initialize(book.ISBN); 
  };

  cell2.appendChild(fbutton);
  cell2.appendChild(fbutton2);
  cell2.appendChild(title);
  cell2.appendChild(author);
  cell2.appendChild(url);
  
  row2.appendChild(cell2);
  tblBody2.appendChild(row2);
  tbl2.appendChild(tblBody2);
  box2.appendChild(tbl2);
  tbl2.style.border = "thin solid black";
}



