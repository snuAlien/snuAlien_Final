class ufoMove{
    constructor() {
        this.r = 150;
        this.x = 360;
        this.y = 240;
        this.speed = 1;
        this.dirX = true;
        this.dirY = true;
        this.dirTimer = Math.floor(random(80,120));
    }

    move() {
        this.dirTimer--;

        if(this.dirTimer <= 0){ //frameCount를 변경해야할지도
            if(random(0,2)<1){
              this.dirX = !this.dirX;
            }
            if(random(0,2)<1){
              this.dirY = !this.dirY;
            }
            this.dirTimer = Math.floor(random(80,120)); //타이머 재설정
          }
      
          if(this.dirX){
            this.x += this.speed
          } else{
            this.x -= this.speed
          }
          if(this.dirY){
            this.y += this.speed
          } else{
            this.y -= this.speed
          }
      
          if(this.x-this.r/2 <0){
            this.x = this.r/2; // 충돌시 위치 고정
            this.dirX = !this.dirX; //벽꿍방지
          }
          if(this.x+this.r/2 > 720){
            this.x = 720 - this.r/2;
            this.dirX = !this.dirX;
          }
          if(this.y-this.r/2 <0){
            this.y = this.r/2; // 충돌시 위치 고정
            this.dirY = !this.dirY; //벽꿍방지
          }
          if(this.y+this.r/2 > 430){
            this.y = 430 - this.r/2;
            this.dirY = !this.dirY;
          }
    }

    display() {
        if (dist(mouseX,mouseY,this.x,this.y)<this.r/2) this.r = 200;
        else this.r = 150;

        imageMode(CENTER);
        image(UFOImg,this.x,this.y,this.r+10,this.r);
    }
}