class Point {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
  }
}

class Quad {
  constructor(b, c) {
    this.boundary = b;
    this.boundary.setStrokeColor(25, 255, 255);
    this.boundary.setStrokeWeight(1);
    this.capacity = c;
    this.subTrees = [];
    this.points = [];
    this.subdivided = false;
  }
  clear() {
    if (!this.subdivided){
      this.points = [];
      return;
    }
    //Subdivided
    for(let i=0; i < this.subTrees.length; i++)
      this.subTrees[i].clear();
    this.subTrees = [];
    this.subdivided=false;
    return;
  }
  distributePointsIntoSubTrees(){
    // Distribute points into subtrees
    for (let i = this.points.length - 1; i >= 0; i--){
      this.insertInSubTree(this.points[i]);
      this.points.pop();
    }
  }
  draw() {
    if (!this.subdivided){
      this.boundary.draw();
       return;
    } 
    for(let i=0; i < this.subTrees.length; i++)
      this.subTrees[i].draw();
  }
  findIndicesIn(range){
    // Routine updates global indexInRange which is much faster
    // than passing arrays around.
    if(!overlaps(this.boundary, range)) return;
    // Range overlaps this quad
    if(!this.subdivided){
      for (let i = 0; i < this.points.length; i ++){
        if(inBoundary(this.points[i], range)){
           indexInRange.push(this.points[i].i);
        }
      }
      return;
    }
    //Subdivided
    for(let i=0; i < this.subTrees.length; i++)
      this.subTrees[i].findIndicesIn(range);
  }
  insert(point) {
    if (!this.subdivided) {
      this.points.push(point);
      if (this.points.length > this.capacity){
        this.subdivide();
        this.distributePointsIntoSubTrees();
      } 
    } else this.insertInSubTree(point);
  }
  insertInSubTree(point) {
    //Determine which subtree this point goes into
    for(let i = 0; i < this.subTrees.length; i++){
      if(inBoundary(point, this.subTrees[i].boundary)){
        this.subTrees[i].insert(point);
        break;
      }
    }
  }
  subdivide() {
    if(this.subdivided){
      console.log("ERROR: Already subdivided");
      return;
    }
    this.subdivided = true;
    let nw = new Rectangle(
      this.boundary.x - this.boundary.w / 4,
      this.boundary.y - this.boundary.h / 4,
      this.boundary.w / 2,
      this.boundary.h / 2
    );
    let ne = new Rectangle(
      this.boundary.x + this.boundary.w / 4,
      this.boundary.y - this.boundary.h / 4,
      this.boundary.w / 2,
      this.boundary.h / 2
    );
    let sw = new Rectangle(
      this.boundary.x - this.boundary.w / 4,
      this.boundary.y + this.boundary.h / 4,
      this.boundary.w / 2,
      this.boundary.h / 2
    );
    let se = new Rectangle(
      this.boundary.x + this.boundary.w / 4,
      this.boundary.y + this.boundary.h / 4,
      this.boundary.w / 2,
      this.boundary.h / 2
    );
    this.subTrees.push(new Quad(nw, this.capacity));
    this.subTrees.push(new Quad(ne, this.capacity));
    this.subTrees.push(new Quad(sw, this.capacity));
    this.subTrees.push(new Quad(se, this.capacity));
  }
}
