var lines;
var catNum;
var valNum;
var id;
var buttons;
var lineNumber;
var points;
function get(by, select, item){
  item = Number(item || 0);
  select = String(id);
  by = String(by);
  switch(by){
      case "id":
          return document.getElementById(select);
          break;
      case "tag":
          return document.getElementsByTagName(select)[item];
          break;
      case "class":
          return document.getElementsByClassName(select)[item];
          break;
      case "style":
          return document.querySelectorAll(select)[item];
          break;
  }
}
function timer(seconds, element) {
  var clock = setInterval(function () {
      seconds -= 0.05;
      if (seconds <= 0) {
          seconds = 0;
          clearInterval(clock);
      }
      element.innerHTML = seconds.toFixed(2);
  }, 50);
}
function backToQuestion(){
  hideElement("a");
  showElement("q");
}
function done(){
  hideElement("a");
  showElement("game");
  buttons = Array.from(document.getElementsByTagName("button"));
  buttons.forEach(checkAttribute);
  console.log(id);
  document.getElementsByTagName("button")[id].setAttribute("style", "color: #010a78; text-shadow: 5px 5px 0 #010a78");
  console.log("set the button");
}
function checkAttribute(item, index){
  if("question(" + String(catNum) + String(valNum) +")" == item.getAttribute("onclick")){
      console.log("choose the button");
      id = Number(index);
  }
}
function question(question){
  console.log("click");
  hideElement("game");
  showElement("q");
  catNum = Number(String(question).charAt(0));
  console.log(catNum);
  valNum = Number(String(question).charAt(1));
  points = valNum*100;
  console.log(valNum);
  lineNumber = lines[(10*(catNum-1))+(valNum*2)+5];
  document.getElementById("qText").innerHTML = lineNumber;
  console.log(lineNumber);
  //timer(5, "timer");
};
function answer(answer){
  hideElement("q");
  console.log("click");
  hideElement("game");
  showElement("a");
  //catNum = Number(String(answer).charAt(0));
  console.log(catNum);
  //valNum = Number(String(answer).charAt(1));
  console.log(valNum);
  lineNumber = lines[(10*(catNum-1))+(valNum*2)+6];
  document.getElementById("aText").innerHTML = lineNumber;
  console.log(lineNumber);
  document.getElementById("points").innerHTML = "$" + String(points);
};
function hideElement(ID){
  var x = document.getElementById(ID);
  x.style.display="none";
}
function showElement(ID){
  var x = document.getElementById(ID);
  x.style.display="block";
}
function showTable(ID){
  var x = document.getElementById(ID);
  x.style.display="table";
}
hideElement("a");
hideElement("game");
hideElement("q");
window.onresize = function(){
  document.getElementById("gameTable").setAttribute("width", String(window.innerWidth*0.9));
}
document.getElementById('file').onchange = function(){
  hideElement("fileSelect");

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
    console.log(this.result);

    // By lines
    lines = this.result.split('\n');
    for(var line = 0; line < lines.length; line++){
      console.log(lines[line]);
    }
    showElement("game");
    document.getElementById("gameTable").setAttribute("width", String(window.innerWidth*0.9));
    showTable("gameTable");
    console.log("game");
    for (y=1;y<7;y++){
        document.getElementById("category"+String(y)).innerHTML = lines[y];
        console.log(lines[y]);
    }
    console.log(lines[1]);
    document.getElementById("gameTitle").innerHTML = lines[0];
  };
  reader.readAsText(file);
};