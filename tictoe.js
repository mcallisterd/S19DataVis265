
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
        var clk="document.getElementById("+ID+").setAttribute('src',x.png)";
        picture.setAttribute("onclick",clk);
        picture.setAttribute("width","200");
        picture.setAttribute("height","200");
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}

var myMove = function(){
  var notYet = false;
  var strs= ["00","01","02","10","11","12","20","21","22"];
  for(var i=0;i<9;i++){
    var name = "picture"+strs[i];
    var pic= document.getElementById(name);
    if(pic.getAttribute('src')=="white_back.PNG"){
      pic.setAttribute("src","o.jpg")
      break;
    }
  }
}