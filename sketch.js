let canvasW, canvasH;
let backgroundColor;
let qt
let balls = [];
const startingBalls = 500;
const minBalls = 1;
const maxBalls = 5000;
let numBallsSlider;
let numBallsText;
let range;
let inRange = [];
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
  initializeRange();
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
  loadIndexInRange();
  let currentHighlight = 0;
  for (let i = 0; i < balls.length; i++) {
    if (i == indexInRange[currentHighlight]) {
      balls[i].highlight();
      currentHighlight++;
    }
    else balls[i].draw();
  }
}
function drawScene() {
  clear();
  background(backgroundColor);
  qt.draw();
  drawBalls();
  range.draw();
  //text("text", 20, 10);
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
function initializeRange() {
  range = new Rectangle(canvasW / 2, canvasH / 2, 153, 177);
  range.setStrokeWeight(2);
  range.setStrokeColor(0, 255, 0);
}
function loadIndexInRange() {
  // Load inRange with indexes of all balls in range.
  indexInRange = [];
  qt.findIndicesIn(range);
  //indexInRange.sort();
  indexInRange = indexInRange.sort(function (a, b) {
    return a - b;
  });
  //console.log(indexInRange);
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
      balls.push(new Ball());
    return;
  }
  //Remove excess balls
  balls = subset(balls, 0, currentBalls - numBalls);
}
function updateBalls() {
  for (let i = 0; i < balls.length; i++)
    balls[i].update();
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
    range.x = mouseX;
    range.y = mouseY;
    // prevent default
    return false;
  }
}
