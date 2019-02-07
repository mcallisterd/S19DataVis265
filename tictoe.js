
var start = function(){
  var t= document.getElementById("t1");

  for(var i=1;i<4;i++){
      var r= document.createElement("tr");

      for(var j=0; j<3;j++){
        var tableElement= document.createElement("td");
        var picture = document.createElement("img");
        picture.setAttribute("src","white_back.PNG");
        picture.setAttribute("id","picture"+j.toString()+i.toString())
        picture.setAttribute("onclick","handle()")
        picture.setAttribute("width","200");
        picture.setAttribute("height","200");
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}
