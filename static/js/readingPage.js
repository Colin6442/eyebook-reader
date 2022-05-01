fetch('/uploads/upload.txt')
  .then(response => response.text())
  .then(text => document.getElementById("txtSect").innerHTML = text)

window.onload = async function() {
    const webgazerInstance = await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
        .setTracker('TFFacemesh')
        .begin();
    webgazerInstance.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); // Kalman Filter defaults to on.
        
    webgazer.removeOnlyMouseMoveListeners();
    webgazer.setGazeListener(eyeListener);

};

window.onbeforeunload = function() {
	webgazer.end();
}

var webgazerCanvas = null;
var pos = 0;
var eyeListener = async function(data, clock) {
  //do scrolling things
  var scrollBar = document.getElementById("textBox");
  if(!data)
        return;
    if (!webgazerCanvas) {
        webgazerCanvas = webgazer.getVideoElementCanvas();
    }
    var textContainer = document.getElementById('txtSect')
    if(data.y < screen.height*.1){
        textContainer.scrollTop -= 10;
    }
    
    if(data.y > screen.height*.7){
        textContainer.scrollTop += 10;
    }
    
}
function popMenu() {
    // Initial click functionality
    if (document.getElementById("popMenu").style.display == "block") {
        document.getElementById("popMenu").style.display = "none";
        document.getElementById("popMenuButt").style.borderBottomLeftRadius = "10px";
        document.getElementById("popMenuButt").style.borderBottomRightRadius = "10px";
    }else{
        document.getElementById("popMenu").style.display = "block";
        document.getElementById("popMenuButt").style.borderBottomLeftRadius = "0px";
        document.getElementById("popMenuButt").style.borderBottomRightRadius = "0px";
    }

}
function changeColor(color) {
    // Initial click functionality
    if (color == "white") {
        document.getElementById("txtSect").style.backgroundColor = "white";
        document.getElementById("txtSect").style.color = "black";
    }else if (color == "beige") {
        document.getElementById("txtSect").style.backgroundColor = "beige";
        document.getElementById("txtSect").style.color = "black";
    }else{
        document.getElementById("txtSect").style.backgroundColor = "black";
        document.getElementById("txtSect").style.color = "white";
    }
}

function changeSize(size) {
    // Initial click functionality
    if (size == "small") {
        document.getElementById("txtSect").style.fontSize = "medium";
    }else if (size == "medium") {
        document.getElementById("txtSect").style.fontSize = "large";
    }else{
        document.getElementById("txtSect").style.fontSize = "x-large";
    }
}
function changeMargin(size) {
    // Initial click functionality
    if (size == "small") {
        document.getElementById("txtSect").style.padding = "2%";
    }else if (size == "medium") {
        document.getElementById("txtSect").style.padding = "5%";
    }else{
        document.getElementById("txtSect").style.padding = "10%";
    }
}