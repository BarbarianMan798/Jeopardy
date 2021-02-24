var lines;
var catNum;
var valNum;
var id;
var buttons;
var lineNumber;
var timerLine;
var points;
var newPlayer;
var br;
var currentTeam;
var correctAnswer;
var players = [];
var scores = [];
var cookies = new Object;
cookies.recieve = function(name){
    var cookie;
    document.cookie.split("; ");
    document.cookie.split("; ").forEach(function(value, index, array){
        if(value.includes(name)){
            cookie = value.slice(name.length + 1).split("|");
        }
    });
    return cookie || [];
}
cookies.transmit = function (name, data) {
    console.log("sending " + String(data) + " as a cookie...");
    data = data.join("|");
    document.cookie = String(name) + "=" + String(data);
}
cookies.transmit("start", ["false"]);
//console.log(document.cookie);
var playersForm;
/*function get(by, select, item) {
    item = Number(item || 0);
    select = String(select);
    by = String(by);
    switch (by) {
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
}*/
/*function timer(seconds, element) {
  var clock = setInterval(function () {
    seconds -= 0.05;
    if (seconds <= 0) {
      seconds = 0;
      clearInterval(clock);

    }
    element.innerHTML = seconds.toFixed(2);
  }, 50);
  console.log("stop");
}*/
function backToQuestion() {
    hideElement("a");
    showElement("q");
}
function done() {
    hideElement("a");
    showElement("game");
    buttons = Array.from(document.getElementsByTagName("button"));
    buttons.forEach(checkAttribute);
    console.log(id);
    document.getElementsByTagName("button")[id].setAttribute("style", "color: #010a78; text-shadow: 5px 5px 0 #010a78");
    console.log("set the button");
}
function checkAttribute(item, index) {
    if ("question(" + String(catNum) + String(valNum) + ")" == item.getAttribute("onclick")) {
        console.log("choose the button");
        id = Number(index);
    }
}
function question(question) {
    console.log("click");
    hideElement("game");
    showElement("q");
    catNum = Number(String(question).charAt(0));
    valNum = Number(String(question).charAt(1));
    points = valNum * 100;
    cookies.transmit("question", [points]);
    console.log(valNum);
    lineNumber = lines[(10 * (catNum - 1)) + (valNum * 2) + 5];
    document.getElementById("qText").innerHTML = lineNumber;
    /*timerLine = lines[66 + ((catNum - 1) * 6) + valNum];
    console.log(timerLine);
    timer(Number(timerLine), get("id", "timer"));*/
};
function answer(answer) {
    hideElement("q");
    console.log("click");
    hideElement("game");
    showElement("a");
    //catNum = Number(String(answer).charAt(0));
    console.log(catNum);
    //valNum = Number(String(answer).charAt(1));
    console.log(valNum);
    lineNumber = lines[(10 * (catNum - 1)) + (valNum * 2) + 6];
    document.getElementById("aText").innerHTML = lineNumber;
    console.log(lineNumber);
    document.getElementById("points").innerHTML = "$" + String(points);
    cookies.transmit("question", ["false"]);
};
function hideElement(ID) {
    console.log(document.getElementById("a"));
    let x = document.getElementById(String(ID));
    x.style.display = "none";
}
function showElement(ID) {
    let x = document.getElementById(ID);
    x.style.display = "block";
}
function showTable(ID) {
    let x = document.getElementById(ID);
    x.style.display = "table";
}
window.onresize = function () {
    //document.getElementById("gameTable").setAttribute("width", String(window.innerWidth / 2));
    
    //document.getElementById("gameTable").setAttribute("height", String((window.innerWidth / 2) / 2));
};
window.onload = function () {
    //document.getElementById("gameTable").setAttribute("width", String(window.innerWidth / 2));
    //document.getElementById("scoreView").setAttribute("width", String(screen.width / 4));
    
    //document.getElementById("gameTable").setAttribute("height", String((window.innerWidth / 2) / 2));
    //document.getElementById("scoreView").setAttribute("height", String(screen.width / 2) * 0.8);
    cookies.transmit("question", ["false"]);
    console.log("loaded");
    playersForm = document.getElementById("players");
    hideElement("a");
    hideElement("game");
    hideElement("q");
    cookies.transmit("teams", []);
    document.getElementById('file').onchange = function () {
        hideElement("fileSelect");
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (progressEvent) {
            // Entire file
            console.log(this.result);

            // By lines
            lines = this.result.split('\n');
            console.log(lines.length);
            lines.forEach(function(value, index, array){
                lines[index] = lines[index].replaceAll("|||", "<br>");
            });
            //showElement("game");
            document.getElementById("gameTable").setAttribute("width", String(window.innerWidth * 0.9));
            showElement("teamSelect");
            console.log("game");
            for (y = 1; y < 7; y++) {
                document.getElementById("category" + String(y)).innerHTML = lines[y];
                console.log(lines[y]);
            }
            console.log(lines[1]);
            document.getElementById("gameTitle").innerHTML = lines[0];
        };
        reader.readAsText(file);
    };
    document.getElementById("addPlayer").onclick = function () { console.log("click"); editPlayers(true); };
    function log(text) {
        console.log("log");
        document.getElementById("log").innerHTML = String(text);
    }
    document.getElementById("startGame").onclick = function(){
        Array.from(document.getElementById("teamSelect").getElementsByTagName("input")).forEach(function(input, index, parent){console.log(input.value);players[index]=input.value;});
        if(players.length){
            hideElement("teamSelect");
            showElement("game");
            console.log(players);
            cookies.transmit("teams", players);
            console.log("cookies send function was called");
        }
        else{
            console.log("No players added");
        }
        cookies.transmit("start",["true"]);
    };
    document.getElementById("fileSelect").style.display = "block";
};
function editPlayers(add) {
    console.log("click");
    switch (add) {
        case true:
            console.log("click");
            newPlayer = document.createElement("input");
            br = document.createElement("br");
            newPlayer.setAttribute("type", "text");
            newPlayer.setAttribute("placeholder", "Participant Name");
            playersForm.appendChild(newPlayer);
            playersForm.appendChild(br);
            break;
        case false:
            playersForm.childNodes[playersForm.childNodes.length - 1].remove();
            break;
    }
}
window.onbeforeunload = closingCode;
function closingCode(){
    cookies.transmit("start", ["false"]);
    return null;
}