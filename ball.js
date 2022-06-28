class Ball {
  constructor(minRad = 2, maxRad = 10, maxSpeed) {
    this.color = color(random(255),
      random(255),
      random(255));
    this.highlightColor = color(0, 255, 0);
    this.overlapColor = color(255, 255, 255);
    this.radius = random(minRad, maxRad);
    this.diameter = this.radius * 2;
    this.x = random(canvasW);
    this.y = random(canvasH);
    this.maxSpeed = maxSpeed;
    this.vel = createVector(random(-this.maxSpeed, this.maxSpeed),
      random(-this.maxSpeed, this.maxSpeed));
    this.overlapped = false;
    this.highlighted = false;
  }
  checkWalls() {
    if (this.x > (canvasW - this.radius)) {
      this.x = canvasW - this.radius;
      this.vel.x *= -1;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vel.x *= -1;
    }
    if (this.y > (canvasH - this.radius)) {
      this.y = canvasH - this.radius;
      this.vel.y *= -1;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vel.y *= -1;
    }
  }
  draw() {
    if (this.highlighted)
      fill(this.highlightColor);
    else if (this.overlapped)
      fill(this.overlapColor);
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
    return this.overlapped;
  }
  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.checkWalls();
    this.overlapped = false;
    this.highlighted = false;
  }
}