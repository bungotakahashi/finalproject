var check_username= function(username){

  var req = new XMLHttpRequest();

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){

    if((this.readyState === 4) && (this.status === 200)) {
        originalGistList = JSON.parse(this.responseText);
        for (var i=0; i< originalGistList.length; i++){
          originalGistList[i] = originalGistList [i];
          var gist = originalGistList[i];

          generateGistHtml(gist);

        }

    }

  };


  req.open("GET","database.php?name="+username);
  req.send();


};
