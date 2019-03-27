d3.json("classData.json").then(
  function(d){
    drawButtons();
    dataByDay = betterProcess(d);
    plotting(dataByDay);
  },
  function(err){
    console.log(err);
  });



  function drawButtons(){
    var svg = d3.select("svg.first")
                .attr("height",250)
                .attr("width",550);

                console.log(d3.range(1,42));
    var groups =
    svg.selectAll("g")
       .data(d3.range(1,42))
       .enter()
       .append("g")
       .on("click",function(d){
         return update(d);
       });


    groups.append("circle")
          .attr("cx",function(d,i){
            return 25+(50*i)%500
          })
          .attr("cy",function(d,i){
            return 50*(.5+Math.floor(i/10));
          })
          .attr("r",15)
          .attr("fill","yellow")
          .on("mouseover",function(d){
            d3.select(this).attr("fill","orange");
          })
          .on("mouseout",function(d){
            d3.select(this).attr("fill","yellow");
          });
    groups.append("text")
          .text(function(d){return String(d);})
          .attr("x",function(d,i){
            return 20+(50*i)%500
          })
          .attr("y",function(d,i){
            return 52.5*(.5+Math.floor(i/10));
          });
  }

  function process(data){
    penguins=[];
    data.forEach(function(peng){
      day_list = [];
      for(var i=1;i<41;i++){day_list[i]=[];}
      attrs=["final","homework","quizes","test"];
      attrs.forEach(function(d){
        peng[d].forEach(function(grade){
          grade.type=d;
          day_list[grade.day].push(grade);
        });
      });
      penguins.push(day_list)
    })
    return penguins;
  }

  function betterProcess(data){
    day_list = [];
    for(var i=1;i<42;i++){
      day_list[i]={
        final:[],
        quizes:[],
        homework:[],
        test:[]
      };
    };
    maxes=[100,50,10,100];
    attrs=["final","homework","quizes","test"];
    data.forEach(function(peng){
      attrs.forEach(function(attribute,i){
        day_list[attribute+"OutOf"]=maxes[i];
        peng[attribute].forEach(function(grade){
          day_list[grade.day][attribute].push(grade.grade);
        });
    })
  });
    day_list.mode = "quizes"
    return day_list;
  }

  function updateOld(qBuck,tBuck,hBuck,old){
    var buckSpeak = {final:tBuck,homework:hBuck,quizes:qBuck,test:tBuck};
    var ops=["final","homework","quizes","test"];
    var empty=[]
    for(var i=0;i<24;i++){
      empty[i]=1000;
    }
    old.forEach(function(d,i){
      ops.forEach(function(cat){
        if(!(d[cat].length===0)){
          old[i][cat]=buckSpeak[cat](old[i][cat]);
        }
        else{
          old[i][cat]=buckSpeak[cat](empty);
        }
      })
    });
    return old;
  }
  function plotting(data){
    var margins={top:20,bot:20,left:30,right:20};
    var old=data;
    data = data[1]["quizes"];
    var height=500;
    var width=500;
    var xScale=d3.scaleLinear()
                 .domain([0,10])//returns [min,max]
                 .range([margins.left,width-margins.right]);

    var bucketFactory=d3.histogram()
                        .domain(xScale.domain())//steals xScale's domain
                        .thresholds(xScale.ticks(10));//equally spread array of
                                                    //values in the range of xScale
    var tScale = d3.scaleLinear().domain([0,100]).range([margins.left,width-margins.right]);
    var tBuck=d3.histogram().domain(tScale.domain()).thresholds(tScale.ticks(10));
    var hScale = d3.scaleLinear().domain([0,50]).range([margins.left,width-margins.right]);
    var hBuck=d3.histogram().domain(hScale.domain()).thresholds(hScale.ticks(10));
    var bars= bucketFactory(data);
    old = updateOld(bucketFactory,tBuck,hBuck,old);
    var yScale = d3.scaleLinear()
                   .domain([0,d3.extent(data)[1]+1])
                   .range([height-margins.top,margins.bot]);

    var svg = d3.select("svg.second")
                .attr("width",width)
                .attr("height",height)
                .attr("id","1")
                .datum(old);
    svg.selectAll("rect")
       .data(bars)
       .enter()
       .append("rect")
       .attr("x", function(x){return xScale(x.x0)})
       .attr("y", function(x){return yScale(x.length)})
       .attr("width",function(x){
         if(x.x1!=x.x0){
           return xScale(x.x1-.1) - xScale(x.x0)
         }
       })
       .attr("height", function(x){return height-margins.top - yScale(x.length)});

    var xAxis = d3.axisBottom(xScale);
    svg.append("g")
       .classed("xAxis",true)
       .call(xAxis)
       .attr("transform","translate(0,"+(height-20)+")");
    var yAxis = d3.axisLeft(yScale);
    svg.append("g")
       .classed("yAxis",true)
       .call(yAxis)
       .attr("transform","translate("+(margins.left-5)+",0)");
  }
  function findYMax(daters){
    var max=0;
    daters.forEach(function(d){
      if(d.length>max){
        max=d.length;
      }
    });
    return max;
  }

  function update(transition,type){
    var scalar = {quizes:10,homework:50,test:100,final:100};
    var capped = {quizes:"Quizzes",homework:"Homework",test:"Tests",final:"Final"};
    var svg = d3.select("svg.second");
    var svg2= svg.nodes()[0];
    if(transition<-10 && !(svg2.id==="1")){
      svg.attr("id",String(parseInt(svg2.id,10)-1));
    }
    else if (transition==-10 && !(svg2.id==="41")) {
      svg.attr("id",String(parseInt(svg2.id,10)+1));
    }
    else if(!type && transition>0){
      svg.attr("id",String(transition));
    }
    console.log(svg.data());
    if(!(svg.data()[0].mode===type) && type){
      svg.data()[0].mode=type;
    }
    var day=svg2.id;
    var mode=svg.data()[0].mode;
    var better_m = capped[mode];
    d3.select("p")
      .text("Day "+String(day)+" - "+better_m);
    // switch scales somehow
    var max = scalar[mode];
    var yMax = findYMax(svg.data()[0][day][mode]);
    var xScale=d3.scaleLinear()
                 .domain([0,max])
                 .range([20,480]);
    var yScale = d3.scaleLinear()
                   .domain([0,yMax+1])
                   .range([480,20])
                   .nice();
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    svg.select("g.xAxis")
       .transition()
       .call(xAxis);
    svg.select("g.yAxis")
       .transition()
       .call(yAxis);
    //reDraw the bars based on the data
    svg.selectAll("rect")
       .data(svg.data()[0][day][mode])
       .transition()
       .attr("y",function(d){
         return yScale(d.length);
       })
       .attr("height",function(x){
         return 480 - yScale(x.length);
       });
  }
