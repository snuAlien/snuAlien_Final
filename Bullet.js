class Bullet{ // 총알
    constructor(xSpd, ySpd){
      this.x = slingShot.x;
      this.y = slingShot.y;
      this.r = 10;
      this.xSpd = 12 * xSpd;
      this.ySpd = 12 * ySpd;
    }
      
  
    display(){
      push();
      noStroke();
      fill(0,0,255);
      ellipse(this.x,this.y,this.r);
      pop();
    }
  
    flying(){ // 위치 이동
      this.x += this.xSpd;
      this.y += this.ySpd;
      this.xSpd *= 0.985; // 공기마찰.. 새총은 아무래도..
      this.ySpd *= 0.985;
    }
  
    outScreen(){ //화면 벗어나면 true
      return(
        this.x > width+this.r || 
        this.x < -this.r || 
        this.y > height+this.r || 
        this.y < -this.r);
    }
  
    hit(){ //목표에 맞았는지 불리언
      for(let i=0; i<sheeps.length; i++){
        let d = dist(this.x, this.y, sheeps[i].x, sheeps[i].y)
        if(d<sheeps[i].r/2 + this.r/2){
          return true;
        }
      }
      return false;
    }
  
  }
  