var webgazerInstance;
window.onload = async function() {
    webgazerInstance = await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
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
    resetClass("color");
    if (color == "white") {
        document.getElementById("txtSect").style.backgroundColor = "white";
        document.getElementById("txtSect").style.color = "black";
        changeClass("c1");
    }else if (color == "beige") {
        document.getElementById("txtSect").style.backgroundColor = "beige";
        document.getElementById("txtSect").style.color = "black";
        changeClass("c2");
    }else{
        document.getElementById("txtSect").style.backgroundColor = "black";
        document.getElementById("txtSect").style.color = "white";
        changeClass("c3");
    }
}

function changeSize(size) {
    resetClass("size");
    if (size == "small") {
        document.getElementById("txtSect").style.fontSize = "15px";
        changeClass("s1");
    }else if (size == "medium") {
        document.getElementById("txtSect").style.fontSize = "30px";
        changeClass("s2");
    }else{
        document.getElementById("txtSect").style.fontSize = "45px";
        changeClass("s3");
    }
}

function changeMargin(size) {
    resetClass("margin");
    if (size == "small") {
        document.getElementById("txtSect").style.padding = "2%";
        changeClass("m1");
    }else if (size == "medium") {
        document.getElementById("txtSect").style.padding = "5%";
        changeClass("m2");
    }else{
        document.getElementById("txtSect").style.padding = "10%";
        changeClass("m3");
    }
}

function changeFont(font) {
    resetClass("font")
    if (font == "arial") {
        document.getElementById("txtSect").style.fontFamily = "Arial,Helvetica,sans-serif";
        changeClass("f1");
    }else if (font == "sans") {
        document.getElementById("txtSect").style.fontFamily = " Times, 'Times New Roman', Georgia, serif";
        changeClass("f2");
    }else{
        document.getElementById("txtSect").style.fontFamily = "'Lucida Console', Courier, monospace";
        changeClass("f3");
    }
}

function changeDot(dot){
    resetClass("dot")
    if (dot == "enable"){
        webgazerInstance.showPredictionPoints(true);
        changeClass("d1");
    }else{
        webgazerInstance.showPredictionPoints(false);
        changeClass("d2");
    }
}

function changeAlign(align) {
    resetClass("align")
    if (align == "left") {
        document.getElementById("txtSect").style.textAlign = "Left";
        changeClass("a1");
    }else if (align == "center") {
        document.getElementById("txtSect").style.textAlign = "Center";
        changeClass("a2");
    }else{
        document.getElementById("txtSect").style.textAlign = "Justify";
        changeClass("a3");
    }
}

function resetClass(section){
    if (section == "color"){
        document.getElementById("c1").className = "menuButt"
        document.getElementById("c2").className = "menuButt"
        document.getElementById("c3").className = "menuButt"
    }else if(section == "size"){
        document.getElementById("s1").className = "menuButt"
        document.getElementById("s2").className = "menuButt"
        document.getElementById("s3").className = "menuButt"
    }else if(section == "margin"){
        document.getElementById("m1").className = "menuButt"
        document.getElementById("m2").className = "menuButt"
        document.getElementById("m3").className = "menuButt"
    }else if(section == "font"){
        document.getElementById("f1").className = "menuButt"
        document.getElementById("f2").className = "menuButt"
        document.getElementById("f3").className = "menuButt"
    }else if(section == "align"){
        document.getElementById("a1").className = "menuButt"
        document.getElementById("a2").className = "menuButt"
        document.getElementById("a3").className = "menuButt"
    }else{
        document.getElementById("d1").className = "menuButt"
        document.getElementById("d2").className = "menuButt"
    }
}
function changeClass(id){
    document.getElementById(id).className = "menuButtActive"
}