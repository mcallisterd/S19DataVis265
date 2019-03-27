
d3.json("students.json").then(function(d){
  var d_prime = process(d);
  startPlot(d_prime);

},
  function(err){
    console.log(err);
  });

function process(data){
  var students = [
    {
      Name:"Kelly",
      Grades:[]
    },
    {
      Name:"Sally",
      Grades:[]
    },
    {
      Name:"Nick",
      Grades:[]
    },
    {
      Name:"Karl",
      Grades:[]
    }
  ];
  data.forEach(function(d,i){
    d.forEach(function(d_2,j){
      students[j][i]=d_2;
    });
  });
  return students;
}

function startPlot(data){

}

function update(val){

}
