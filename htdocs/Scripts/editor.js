var newLines = new Array();
var lines;
var categoryLabel;
var saved = true;
function get(by, id, item) {
    item = Number(item || 0);
    id = String(id);
    by = String(by);
    switch (by) {
        case "id":
            return document.getElementById(id);
            break;
        case "tag":
            if (item >= 0) {
                return document.getElementsByTagName(id)[item];
            }
            else {
                return document.getElementsByTagName(id);
            }
            break;
        case "class":
            if (item >= 0) {
                return document.getElementsByClassName(id)[item];
            }
            else {
                return document.getElementsByClassName(id);
            }
            break;
        case "style":
            if (item >= 0) {
                return document.querySelectorAll(id)[item];
            }
            else {
                return document.querySelectorAll(id);
            }
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
function editFile(newFile) {
    console.log("edit file");
    hideElement("fileUpload");
    document.getElementById("uploadFile").value = "";
    if (newFile == false) {
        document.getElementById("editingTitle").innerHTML = "Editing \"" + String(lines[0]) + "\"";
    }
    for (var i = 1; i <= 6; i++) {
        categoryLabel = document.getElementById("catLabel" + String(i));
        console.log(categoryLabel);
        if (newFile == false && typeof lines[i] !== "undefined") {
            categoryLabel.innerHTML = String(lines[i]);
            console.log("assigning default values");
            for (var a = 0; a < 7; a++){
                if (typeof lines[a] !== "undefined") {
                    document.getElementById(String(a + 1)).setAttribute("value", lines[a]);
                }
            }
            for (var a = 7; a < 67; a++) {
                if (typeof lines[a] !== "undefined") {
                    document.getElementById(String(a + 1)).innerHTML = lines[a];
                }
            }
            /*for (var cat = 1; cat <= 6; cat++) {
                for (var val = 1; val <= 5; val++) {
                    document.getElementById("timer" + String(cat) + String(val)).value = lines[67 + ((cat - 1) * 5) + val];
                }
            }*/
        }
        else {
            document.getElementById("editingTitle").innerHTML = "Editing <i>\"Unnamed\"</i>";
            categoryLabel.innerHTML = "Category " + String(i);
        }
    }
    showElement("editFile");
}
function hideElement(ID) {
    console.log("hide");
    document.getElementById(ID).setAttribute("style", "display: none;");
}
function showElement(ID) {
    document.getElementById(ID).style.display = "block";
}
function downloadFile() {
    saved = true;
    for (var i = 1; i <= 67; i++) {
        console.log(i);
        newLines[i - 1] = document.getElementById(String(i)).value;
    }
    window.URL = window.URL || window.webkitURL;
    var fileName = String(newLines[0]);
    var fileText = String(newLines[0]);
    for (var i = 1; i < newLines.length; i++) {
        fileText = fileText + "\n" + newLines[i].replace(/\n/g, "|||");
    }
    /*for (var cat = 1; cat <= 6; cat++) {
        for (var val = 1; val <= 5; val++) {
            fileText = fileText + "\n" + String(document.getElementById("timer" + String(cat) + String(val)).value);
        }
    }*/
    console.log(fileText);
    var gameFile = new Blob([fileText], { type: "text/plain" });
    console.log(gameFile);
    var fileLink = document.createElement("a");
    console.log(fileLink);
    fileLink.setAttribute("id", "downloadLink");
    fileLink.setAttribute("href", window.URL.createObjectURL(gameFile));
    fileLink.setAttribute("download", fileName);
    fileLink.click();
    fileLink.remove();
}
function updateCategories(id) {
    saved = false;
    var catTitle = document.getElementById(id);
    var catLabel = document.getElementById("catLabel" + String(id - 1));
    if (catTitle.value == "") {
        catLabel.innerHTML = "<i>Unnamed Category</i>";
        console.log("unnamed categories");
    }
    else {
        catLabel.innerHTML = catTitle.value;
        console.log("updated categories to");
        console.log(String(catTitle.value));
    }
}
window.onload = function () {
    var x = 5;
    for (var i = 2; i <= 7; i++) {
        var labelId = document.getElementById(String(i))
        labelId.setAttribute("onchange", `updateCategories(${i})`);
    }
    hideElement("editFile");
    document.getElementById("uploadFile").onchange = function () {
        console.log(this.files[0]);
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
            console.log("reading file");
            // Entire file
            console.log(this.result);
            // By lines
            lines = this.result.split('\n');
            editFile(false);
        };
        console.log("about to read file");
        reader.readAsText(file);
        //console.log(lines[1]);
    };
    function showTable(ID) {
        var x = document.getElementById(ID);
        x.style.display = "table";
    }
    document.getElementById("1").onchange = function () {
        saved = false;
        console.log(this.value);
        if (this.value) {
            document.getElementById("editingTitle").innerHTML = "Editing \"" + String(this.value) + "\"";
        }
        else {
            console.log("unnamed");
            document.getElementById("editingTitle").innerHTML = "Editing <i>\"" + "Unnamed" + "\"</i>";
        }
    };
    /*document.getElementById("timerAll").onchange = function () {
        for (var cat = 1; cat <= 6; cat++) {
            for (var val = 1; val <= 5; val++) {
                document.getElementById("timer" + String(cat) + String(val)).value = document.getElementById("timerAll").value;
            }
        }
        document.getElementById("timerAll").value = "";
    };*/
}
window.onbeforeunload = function(){
    if(!saved){
        return true;
        return "hello there man:-)";
    }
};