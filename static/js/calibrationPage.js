window.saveDataAcrossSessions = true;
var currentCal = 1;
var coordsX = ["5", "30", "50", "70", "95"];
var coordsY = ["10", "37.5", "62.5", "90"];

window.onload = async function() {
	isCalibrated();
}

var beginCalibration = async function() {
    const webgazerInstance = await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
        .setTracker('TFFacemesh')
        .begin();
    webgazerInstance.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); // Kalman Filter defaults to on.
        
    webgazer.removeOnlyMouseMoveListeners();
    webgazer.setGazeListener(eyeListener);
		document.getElementById("menu").style.display = "none";
		document.getElementById("calibration").style.display = "block";
};

window.onbeforeunload = function() {
	webgazer.end();
}

var webgazerCanvas = null;

var eyeListener = async function(data, clock) {
  if(!data)
    return;
  if (!webgazerCanvas) {
    webgazerCanvas = webgazer.getVideoElementCanvas();
  }
//   console.log(data.x + " - " + data.y)
  
}

function isCalibrated(){
	var out = localforage.getItem("webgazerGlobalData").then(data => {
	if(data != null){
		console.log("Has data");
		document.getElementById("calibratedText").style.display = "block";
		document.getElementById("checkBtn").style.display = "block";
		document.getElementById("contBtn").style.display = "block";
		document.getElementById("resetBtn").style.display = "block";
	}else{
		console.log("No data");
		document.getElementById("calBtn").style.display = "block";
	}
	});
}

function resetCalibration(){
  localforage.clear();
	location.reload();
}

var checkCalibration = async function() {
  // document.getElementById("calibration").style.display = "block";
  // document.getElementById("menu").style.display = "none";
  const webgazerInstance = await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
    .setTracker('TFFacemesh')
    .begin();
  webgazerInstance.showVideoPreview(false) /* shows all video previews */
    .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
    .applyKalmanFilter(true); // Kalman Filter defaults to on.
  webgazer.removeOnlyMouseMoveListeners();
  webgazer.setGazeListener(eyeListener);
}

function clickedBtn(){
  if(currentCal < 21){
    var x, y;
    x = currentCal % 5;
    y = Math.floor(currentCal/5);
    document.getElementById("calibrationBtn").style.marginTop = "calc(" + coordsY[y] + "vh - 25px)";
    document.getElementById("calibrationBtn").style.marginLeft = "calc(" + coordsX[x] + "vw - 25px)";
    currentCal++;
  }else{
    var base_url = window.location.origin;
    base_url = base_url + "/reading"
    location.href = base_url;
  }
}

function finishCalibration(){
  var base_url = window.location.origin;
    base_url = base_url + "/reading"
    location.href = base_url;
}