class SlingShot{ // 총알
    constructor(){
      this.x = 360;
      this.y = 430;
      this.r = 30;
    }
  
  
    display(){
      push();
      noStroke();
      fill(0,0,255);
      ellipse(this.x,this.y,this.r);
      pop();
    }
  }
  