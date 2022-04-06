window.saveDataAcrossSessions = true;

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
        // Add the SVG component on the top of everything.
    webgazer.setGazeListener(eyeListener);
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
	}else{
		console.log("No data");
	}
	});
}

function resetCalibration(){
    localforage.clear();
	location.reload();
}