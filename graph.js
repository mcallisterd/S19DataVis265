
d3.csv("colors.csv").then(function(data){
  console.log(data);
  drawChart(data,"svg#CSV");
},
function(err){
  console.log(err);
});

d3.json("colors.json").then(function(data){
  drawChart(data,"svg#JSON");
},
function(err){
  console.log(err);
});

function drawChart(colorData,svgNAME){
  var width = 600;
  var height = 300;
  var barWidth = width/colorData.length -5;

  var svg = d3.select(svgNAME)
              .attr("width",width)
              .attr("height",height);
      svg.selectAll("rect")
         .data(colorData)
         .enter()
         .append("rect")
         .attr("x",function(d,i){
           return (barWidth+5)*i;
         })
         .attr("y",function(d){
           return height-d.num*20;
         })
         .attr("width",barWidth)
         .attr("height",function(d){
           return 20*d.num;
         })
         .attr("fill",function(d){
           return d.color;
         })
         .attr("id","bar");

      svg.selectAll("text")
         .data(colorData)
         .enter()
         .append("text")
         .text(function(d){
           return d.num;
         })
         .attr("x",function(d,i){
           return (barWidth+5)*i + barWidth/2 -4;
         })
         .attr("y",function(d){
           return height-d.num*20 -5;
         })
         .attr("fill","black")
         .attr("id","bar");

      svg.selectAll("rect#legend")
         .data(colorData)
         .enter()
         .append("rect")
         .attr("x",width-100)
         .attr("y",function(d,i){
           return i*20
         })
         .attr("width",15)
         .attr("height",15)
         .attr("fill",function(d){
           return d.color;
         })
         .attr("id","legend");

       svg.selectAll("text#legend")
          .data(colorData)
          .enter()
          .append("text")
          .text(function(d){
            return d.color;
          })
          .attr("x",width-80)
          .attr("y",function(d,i){
            return i*20+13;
          })
          .attr("fill","black")

      svg.selectAll("text#NAME")
         .data([svgNAME])
         .enter()
         .append("text")
         .text(function(d){
           return d.slice(4, d.length);
         })
         .attr("x",width/2-30)
         .attr("y",30)
         .attr("font-family","Trebuchet MS")
         .attr("font-size",30);
}
