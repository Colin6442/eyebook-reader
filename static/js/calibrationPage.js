window.saveDataAcrossSessions = true;
var currentCal = 1;
var coordsX = ["5", "30", "50", "70", "95"];
var coordsY = ["10", "37.5", "62.5", "90"];

// when page is stated, check if user has done calibration before 
window.onload = async function() {
	isCalibrated();
}

// Run when "Start Calibration" button is clicked
var beginCalibration = async function() {
    const webgazerInstance = await webgazer.setRegression('weightedRidge') // Set to wieghted to use running average
        .setTracker('TFFacemesh')
        .begin();
    webgazerInstance.showVideoPreview(false) // true: display video in top left corner
        .showPredictionPoints(true) // shows a circle every 100 milliseconds where current prediction is
        .applyKalmanFilter(true); // Using Kalman Filter
        
    webgazer.removeOnlyMouseMoveListeners(); // Normally webgazer uses mouse movements to influence tracking posistion, we dont want that
    webgazer.setGazeListener(eyeListener); // Send data to eyeListener function
		document.getElementById("menu").style.display = "none"; // Remove menu now that calibration has begun
		document.getElementById("calibration").style.display = "block"; // Show calibration backgound now that calibration has begun
};

// turn off webgazer before the tab is unloaded
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

// Check for previous calibration
function isCalibrated(){
	var out = localforage.getItem("webgazerGlobalData").then(data => {
	if(data != null){ // If there is data show extra options / change layout
		console.log("Has data");
		document.getElementById("calibratedText").style.display = "block";
		document.getElementById("checkBtn").style.display = "block";
		document.getElementById("contBtn").style.display = "block";
		document.getElementById("resetBtn").style.display = "block";
	}else{ // If no data then show only "Start Calibration" button
		console.log("No data");
		document.getElementById("calBtn").style.display = "block";
	}
	});
}

// Reload page 
function resetCalibration(){
  localforage.clear();
  var base_url = window.location.origin;
  base_url = base_url + "/calibration"
  location.href = base_url;
}

// Same as beginCalibration() but only loads eye tracking for user to check accuracy
var checkCalibration = async function() {
  const webgazerInstance = await webgazer.setRegression('weightedRidge') // Set to wieghted to use running average
      .setTracker('TFFacemesh')
      .begin();
  webgazerInstance.showVideoPreview(false) // true: display video in top left corner
      .showPredictionPoints(true) // shows a circle every 100 milliseconds where current prediction is
      .applyKalmanFilter(true); // Using Kalman Filter
      
  webgazer.removeOnlyMouseMoveListeners(); // Normally webgazer uses mouse movements to influence tracking posistion, we dont want that
  webgazer.setGazeListener(eyeListener); // Send data to eyeListener function
}

// Controls circles user clicks to calibrate
function clickedBtn(){
  if(currentCal < 20){
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

// If previous calibration is accurate continue to reading page with no changes made
function noChanges(){
  var base_url = window.location.origin;
    base_url = base_url + "/reading"
    location.href = base_url;
}
