class Rectangle {
  constructor(x, y, w, h) {
    // Specify center point, width and height
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(255);
    this.strokeWeight = 1;
  }
  draw(){
    rectMode(CENTER);
    noFill();
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    rect(this.x, this.y, this.w, this.h);
  }
  setStrokeColor(newR, newG, newB){
    this.color = color(newR, newG, newB);
  }
  setStrokeWeight(newStrokeWeight){
    this.strokeWeight = newStrokeWeight;
  }
}

function inBoundary(point, boundary) {
  return (
    point.x >= boundary.x - boundary.w / 2 &&
    point.x <= boundary.x + boundary.w / 2 &&
    point.y >= boundary.y - boundary.h / 2 &&
    point.y <= boundary.y + boundary.h / 2
  );
}

function overlaps(boundary, range) {
  // If one rectangle is to the left of the other, no overlap
  // If one rectangle is above the other, no overlap
  // If neither is true, there must be overlap

  if (
    boundary.x + boundary.w / 2 < range.x - range.w / 2 ||
    range.x + range.w / 2 < boundary.x - boundary.w / 2
  )
    return false;

  if (
    boundary.y + boundary.h / 2 < range.y - range.w / 2 ||
    range.y + range.h / 2 < boundary.y - boundary.w / 2
  )
    return false;
  return true;
}
