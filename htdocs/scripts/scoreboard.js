var cookies = new Object;
var scoreTable;
var teams = [];
var oldTeams = [];
var oldState;
scores = [];
var addButton = document.getElementById("addPoints");
var subtractButton = document.getElementById("subtractPoints");
cookies.recieve = function (name) {
    var cookie = [];
    document.cookie.split("; ").forEach(function (value, index, array) {
        if (value.split("=")[0].replace(" ", "") == String(name)) {
            cookie = value.slice(name.length + 1).split("|");
        }
    });
    //next 2 lines used for detecting when to display the score
    if (cookie[0] == "true") return true;
    if (cookie[0] == "false") return false;
    /*if (cookie.length != 1) {
         */return cookie || [""];/*
        console.log("Cookie with length of 1");
    }
    else {
        return cookie[0] || [];
    }*/
};
cookies.transmit = function (name, data) {
    data = data.join("|");
    document.cookie = String(name) + "=" + String(data);
};
window.onload = function () {
    let br = document.createElement("br");
    let scale = document.createElement("h1");
    document.body.appendChild(br);
    document.body.appendChild(scale);
};
var updateScore = setInterval(function () {
    if (cookies.recieve("start")) {
        if(!cookies.recieve("question")){
            document.getElementById
        }
        teams = cookies.recieve("teams");
        let equals = true;
        teams.forEach(function(value, index, array){
            if(value != oldTeams[index])equals = false;
        });
        if (!equals) {
            console.log("Teams Updated from " + String(oldTeams) + " to " + String(teams));
            document.getElementById("scoreTable").innerHTML = "";
            teams.forEach(function (value, index, array) {
                let row = document.createElement("tr");
                let teamName = document.createElement("td");
                teamName.innerHTML = String(value);
                let teamScore = document.createElement("td");
                teamScore.innerHTML = String(scores[index]);
                row.appendChild(teamName);
                row.appendChild(teamScore);
                document.getElementById("scoreTable").appendChild(row);
            });
        }
        oldTeams = teams;
    }
    else if (oldState != cookies.recieve("start") && !cookies.recieve("start")) {
        document.getElementById("scoreTable").innerHTML = 'Start a Jeopardy! game at <a class="link" href="http://jaredrobinson.epizy.com" target="_blank" rel="noopener noreferrer">jaredrobinson.epizy.com</a>';
    }
    oldState = cookies.recieve("start");
}, 100);