let canvasW, canvasH;
let backgroundColor;
let qt
let balls = [];
const minBallRadius = 2;
const maxBallRadius = 10;
const maxBallSpeed = 1;
const minBallSpeed = 0.1;
const startingBalls = 300;
const minBalls = 1;
const maxBalls = 2500;
let numBallsSlider;
let numBallsText;
let highlightRange;
let indexInRange = [];

function setup() {
  //numBallsText = createP('this is some text');
  //numBallsText.style('font-size', '16px');
  //numBallsText.position(100, 100);
  fill(0, 102, 153);
  textSize(32);
  text('word', 220, 500);
  text("This is some text", 220, 500);
  initializeCanvas();
  initializeBallSlider();
  updateBallArray(startingBalls);
  initializeHighlightRange();
  initializeQuadTree();
}

function draw() {
  updateSim();
  updateScene();
  drawScene();
  //noLoop();
}
//*************************************************
function drawBalls() {
  for (let i = 0; i < balls.length; i++)
    balls[i].draw();
}
function drawScene() {
  background(backgroundColor);
  qt.draw();
  drawBalls();
  highlightRange.draw();
  //text("text", 20, 10);
}
function findBallsIn(range) {
  // Load inRange with indexes of all balls in range.
  indexInRange = [];
  qt.findIndicesIn(range);
}
function initializeBallSlider() {
  numBallsSlider = createSlider(minBalls, maxBalls, startingBalls, 0);
  numBallsSlider.position(10, canvasH + 10);
  numBallsSlider.style('width', '180px');
}
function initializeCanvas() {
  canvasW = 600;
  canvasH = 450;
  createCanvas(canvasW, canvasH);
  backgroundColor = color(120, 130, 170, 255);
}
function initializeQuadTree() {
  let boundary = new Rectangle(canvasW / 2,
    canvasH / 2,
    canvasW,
    canvasH);
  qt = new Quad(boundary, 4);
}
function initializeHighlightRange() {
  highlightRange = new Rectangle(canvasW / 2, canvasH / 2, 153, 177);
  highlightRange.setStrokeWeight(2);
  highlightRange.setStrokeColor(0, 255, 0);
}
function updateBallArray(numBalls) {
  if (numBalls < 1) {
    console.error("Bad num balls");
    noLoop();
    return;
  }
  let currentBalls = balls.length;
  if (currentBalls == numBalls) return;
  if (currentBalls < numBalls) {
    for (let i = currentBalls; i < numBalls; i++)
      balls.push(new Ball(minBallRadius, maxBallRadius, minBallSpeed, maxBallSpeed));
    return;
  }
  //Remove excess balls
  balls = subset(balls, 0, currentBalls - numBalls);
}
function updateBalls() {
  for (let i = 0; i < balls.length; i++)
    balls[i].update();
}
function updateBallsInHighlightRange() {
  findBallsIn(highlightRange);
  //Mark balls in highlight range as highlight
  for (let i = 0; i < indexInRange.length; i++)
    balls[indexInRange[i]].highlighted = true;
}
function updateOverlappingBalls() {
  let localRange = new Rectangle();
  for (let i = 0; i < balls.length; i++) {
    //Only update non-overlapped balls
    if (balls[i].overlapped) continue;
    //Query the quadtree to get close neighbors of this ball
    //The range for close neighbors is centred on the x, y of this ball
    // with width and height of r+largestBallradius+margin.
    localRange.w = balls[i].radius + maxBallRadius + 1;
    localRange.h = localRange.w;
    localRange.x = balls[i].x;
    localRange.y = balls[i].y;
    findBallsIn(localRange);
    if (indexInRange.length < 2) continue;
    //console.log("neighbors", indexInRange.length);
    //Then, find first overlap with these close neighbors
    //Both will be marked overlapped
    for (let j = 0; j < indexInRange.length; j++){
      if(i === indexInRange[j]) continue;
      if (balls[i].overlaps(balls[indexInRange[j]])) break;
    }
  }
}
function updateQuadTree() {
  qt.clear();
  for (let i = 0; i < balls.length; i++) {
    let p = new Point(balls[i].x, balls[i].y, i);
    qt.insert(p);
  }
}
function updateScene() {
  updateBalls();
  updateQuadTree();
  updateOverlappingBalls();
  updateBallsInHighlightRange();
}
function updateSim() {
  let val = int(numBallsSlider.value());
  //console.log(val);
  updateBallArray(val);
}
function mouseDragged() {
  //console.log(mouseX, mouseY);
  if ((mouseX <= canvasW && mouseX >= 0) &&
    (mouseY <= canvasH && mouseY >= 0)) {
    highlightRange.x = mouseX;
    highlightRange.y = mouseY;
    // prevent default
    return false;
  }
}
