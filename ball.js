class Ball {
  constructor(minRad = 2, maxRad = 10, minSpeed, maxSpeed) {
    this.color = color(random(255),
      random(255),
      random(255));
    this.highlightColor = color(0, 255, 0);
    this.overlapColor = color(255, 255, 255);
    this.onWallColor = color(255, 0, 0);
    this.radius = random(minRad, maxRad);
    this.diameter = this.radius * 2;
    this.x = random(canvasW);
    this.y = random(canvasH);
    let vals = [-1, 1];
    this.vel = createVector(random(minSpeed, maxSpeed) * random(vals),
      random(minSpeed, maxSpeed) * random(vals));
    this.resetAttribs();
  }
  checkWalls() {
    if (this.x > (canvasW - this.radius)) {
      this.x = canvasW - this.radius;
      this.vel.x *= -1;
      this.onWall = true;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vel.x *= -1;
      this.onWall = true;
    }
    if (this.y > (canvasH - this.radius)) {
      this.y = canvasH - this.radius;
      this.vel.y *= -1;
      this.onWall = true;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vel.y *= -1;
      this.onWall = true;
    }
  }
  draw() {
    if (this.highlighted)
      fill(this.highlightColor);
    else if (this.overlapped)
      fill(this.overlapColor);
    else if (this.onWall)
      fill(this.onWallColor);
    else
      fill(this.color);
    noStroke();
    circle(this.x, this.y, this.diameter);
  }
  overlaps(other) {
    let distSquared = (this.x - other.x) * (this.x - other.x) +
      (this.y - other.y) * (this.y - other.y);
    let radiusSumSquared = (this.radius + other.radius) *
      (this.radius + other.radius);
    this.overlapped = distSquared < radiusSumSquared;
    if (this.overlapped) other.overlapped = true;
    //this.vel.x = 0;
    //this.vel.y = 0;
    //other.vel.x = 0;
    //other.vel.y = 0;
    return this.overlapped;
  }
  resetAttribs() {
    this.highlighted = false;
    this.onWall = false;
    this.overlapped = false;
  }
  update() {
    this.resetAttribs();
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.checkWalls();
  }
}