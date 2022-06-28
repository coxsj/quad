class Ball {
  constructor() {
    this.color = color(random(255), 
                       random(255), 
                       random(255));
    this.highlightColor = color(0, 255, 0);
    this.radius = random(2, 10);
    this.diameter = this.radius*2;
    this.x = random(canvasW);
    this.y = random(canvasH);
    const maxSpeed = 3;
    this.vel = createVector(random(-maxSpeed, maxSpeed),
                            random(-maxSpeed, maxSpeed));
  }
  update(){
    this.x+=this.vel.x;
    this.y+=this.vel.y;
    this.checkWalls();
  }
  checkWalls(){
    if((this.x+this.radius) >= canvasW){
      this.x = canvasW - this.radius;
      this.vel.x*=-1;
    }
    if((this.x-this.radius) <= 0) {
      this.x = this.radius;
      this.vel.x*=-1;
    }
    if((this.y+this.radius) > canvasH){
      this.y = canvasH - this.radius;
      this.vel.y*=-1;
    }
    if((this.y-this.radius) <= 0) {
      this.y = this.radius;
      this.vel.y*=-1;
    }
  }
  draw(){
    this.drawBall(this.color);
  }
  drawBall(objColor){
    noStroke();
    fill(objColor);
    circle(this.x, this.y,this.radius);
  }
  highlight(){
    this.drawBall(this.highlightColor);
  }
  intersects(other){
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.radius + other.radus);
  }
}