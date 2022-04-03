// window.saveDataAcrossSessions = true;
// localforage.clear();

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

// var previewWidth = webgazer.params.videoViewerWidth;

var eyeListener = async function(data, clock) {
  if(!data)
    return;
  if (!webgazerCanvas) {
    webgazerCanvas = webgazer.getVideoElementCanvas();
  }
  console.log(data.x + " - " + data.y)
  
}