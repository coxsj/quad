class Ball {
  constructor(minRad = 2, maxRad = 10) {
    this.color = color(random(255),
      random(255),
      random(255));
    this.highlightColor = color(0, 255, 0);
    this.overlapColor = color(255, 255, 255);
    this.radius = random(minRad, maxRad);
    this.diameter = this.radius * 2;
    this.x = random(canvasW);
    this.y = random(canvasH);
    const maxSpeed = 3;
    this.vel = createVector(random(-maxSpeed, maxSpeed),
      random(-maxSpeed, maxSpeed));
    this.overlapped = false;
    this.highlighted = false;
  }
  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.checkWalls();
    this.overlapped = false;
    this.highlighted = false;
  }
  checkWalls() {
    if ((this.x + this.radius) >= canvasW) {
      this.x = canvasW - this.radius;
      this.vel.x *= -1;
    }
    if ((this.x - this.radius) <= 0) {
      this.x = this.radius;
      this.vel.x *= -1;
    }
    if ((this.y + this.radius) > canvasH) {
      this.y = canvasH - this.radius;
      this.vel.y *= -1;
    }
    if ((this.y - this.radius) <= 0) {
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
    circle(this.x, this.y, this.radius);
  }
  overlaps(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    this.overlapped = d < (this.radius + other.radius);
    if (this.overlapped)
      other.overlapped = true;
    return this.overlapped;
  }
}