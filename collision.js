// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = false;
//addMouseEventListeners and removeMouseEventListeners
const collisionSVG = "collisionSVG";
var force = [];
var nodes = [];

window.onload = async function() {
  if (!window.saveDataAcrossSessions) {
      var localstorageDataLabel = 'webgazerGlobalData';
      localforage.setItem(localstorageDataLabel, null);
      var localstorageSettingsLabel = 'webgazerGlobalSettings';
      localforage.setItem(localstorageSettingsLabel, null);
  }
  const webgazerInstance = await webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
    .setTracker('TFFacemesh')
    .begin();
  webgazerInstance.showVideoPreview(false) /* shows all video previews */
    .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
    .applyKalmanFilter(true); // Kalman Filter defaults to on.
    // Add the SVG component on the top of everything.
  setupCollisionSystem();
  webgazer.setGazeListener(collisionEyeListener);
};

window.onbeforeunload = function() {
  if (window.saveDataAcrossSessions) {
      webgazer.end();
  } else {
      localforage.clear();
  }
}

function setupCollisionSystem() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var numberOfNodes = 1;

  nodes = d3.range(numberOfNodes).map(function() { return {radius: Math.random() * 12 + 4}; }),
  nodes[0].radius = 0;
  nodes[0].fixed = true;

  force = d3.layout.force()
  .gravity(0.05)
  .charge(function(d, i) { return i ? 0 : -2000; })
  .nodes(nodes)
  .size([width, height])
  .start();

  var svg = d3.select("body").append("svg")
  .attr("id", collisionSVG)
  .attr("width", width)
  .attr("height", height)
  .style("top", "0px")
  .style("left","0px")
  .style("margin","0px")
  .style("position","absolute")
  .style("z-index", 100000);

  svg.append("rect")
  .attr("id","predictionSquare")
  .attr("width",15)
  .attr("height",15)
  .attr("fill","red");


  svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    nodes[0].px = p1[0];
    nodes[0].py = p1[1];
    force.resume();
  });

}

var webgazerCanvas = null;

var previewWidth = webgazer.params.videoViewerWidth;

var collisionEyeListener = async function(data, clock) {
  if(!data)
    return;

  nodes[0].px = data.x;
  nodes[0].py = data.y;
  force.resume();

  if (!webgazerCanvas) {
    webgazerCanvas = webgazer.getVideoElementCanvas();
  }

  var dot = d3.select("#predictionSquare")
            .attr("x",data.x)
            .attr("y",data.y);
}