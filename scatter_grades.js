var grade_data = d3.json("grades.json")
                   .then(
                     function(data){
                       makeChart(data,500,500,"svg#first");
                       makeChart(data,400,700,"svg#second");
                       makeChart(data,700,400,"svg#third");
                     },
                      function(err){
                        console.log(err);
                      });
function makeChart(data,w,h,svgName) {

  var svg = d3.select(svgName)
              .attr("width",w)
              .attr("height",h);

  var margins = {
    left:40,
    right:100,
    top:10,
    bottom:40
  }
  var width = w-margins.left - margins.right;
  var height= h-margins.top - margins.bottom;
  var xScale = d3.scaleLinear()
                 .domain([0,20])
                 .range([0,width]);
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);
  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  var plot = svg.append("g")
                .classed("plot",true)
                .attr("transform",
                "translate("+margins.left+","+margins.top+")");

  var students = plot.selectAll("g")
                     .data(data)
                     .enter()
                     .append("g")
                     .attr("fill",function(d){
                       return colors(d.name);
                     });

  students.selectAll("circle")
          .data(function(d){return d.grades;})
          .enter()
          .append("circle")
          .attr("cx",function(d,i){
            return xScale(i);
          })
          .attr("cy",function(d){
            return yScale(d);
          })
          .attr("r",10);

  var legend = svg.append("g")
                  .classed("legend",true)
                  .attr("transform",
                  "translate("+(margins.left+width)+","+margins.top+")");

  var legendLines = legend.selectAll("g")
                          .data(data)
                          .enter()
                          .append("g")
                          .classed("legendLines",true)
                          .attr("transform",function(d,i){
                            return "translate(0,"+(20*i)+")";
                          });

  legendLines.append("rect")
             .attr("x",0)
             .attr("y",0)
             .attr("width",10)
             .attr("height",10)
             .attr("fill",function(d){
               return colors(d.name);
             });

  legendLines.append("text")
             .attr("x",20)
             .attr("y",0)
             .text(function(d){
               return d.name;
             })
             .attr("transform","translate(0,10)");

  var xAxis = d3.axisBottom(xScale);
  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate("+margins.left+","+(margins.top+height+10)+")");

  var yAxis = d3.axisLeft(yScale);
  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left-10)+","+margins.top+")");
}
