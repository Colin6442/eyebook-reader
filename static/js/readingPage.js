fetch('../../uploads/upload.txt')
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
  scrollBar.scrollTop += 100;
  if(!data)
        return;
    if (!webgazerCanvas) {
        webgazerCanvas = webgazer.getVideoElementCanvas();
    }

    if(data.y < screen.height*.1){

    }
    
    if(data.y > screen.height*.9){

    }
    
}