
var start = function(){
  document.getElementById("kill").removeAttribute(onclick);
  var t= document.getElementById("t1");

  for(var i=1;i<4;i++){
      var r= document.createElement("tr");

      for(var j=0; j<3;j++){
        var ID="picture"+j.toString()+i.toString();
        var tableElement= document.createElement("td");
        var picture = document.createElement("img");
        picture.setAttribute("src","white_back.PNG");
        picture.setAttribute("id",ID)
        picture.setAttribute("onclick","document.getElementById("+ID+").setAttribute('src',x.png)");
        picture.setAttribute("width","200");
        picture.setAttribute("height","200");
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}
