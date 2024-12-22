class Hunter{ // 헌터
    constructor(){
      this.r = 30+level*2;
      this.x = width/2;
      this.y = height/2;
      this.speed = 2;
    }
  
    move(){ // shift 누르면 속도 빨라지게?
      if(keyIsDown(LEFT_ARROW)){
        this.x -= this.speed
      }   
      if(keyIsDown(RIGHT_ARROW)){
        this.x += this.speed
      }    
      if(keyIsDown(UP_ARROW)){
        this.y -= this.speed
      }    
      if(keyIsDown(DOWN_ARROW)){
        this.y += this.speed
      }
  
      this.x = constrain(this.x, this.r/2, width-this.r/2);
      this.y = constrain(this.y, this.r/2, height-this.r/2-50);
    }
  
    display(){
      noStroke();
      imageMode(CENTER,CENTER)
      fill(255,255,0,150);
      ellipse(this.x,this.y,this.r);
      image(helperImg,this.x,this.y,this.r-2,this.r-2);
    }
  }
  
