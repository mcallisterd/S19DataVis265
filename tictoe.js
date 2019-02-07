
var start = function(){
  var t= document.getElementbyId("t1");

  for(var i=1;i<4;i++){
      var r= document.createElement("tr");

      for(var j=0; j<3;j++){
        var tableElement= document.createElement("td");
        var picture = document.createElement("img");
        picture.setAttribute(src="white_back.PNG");
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}
