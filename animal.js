//동물끼ㅣㄹ 안 겹치게도.. 해야하나? 
// 동물을 만들고,, 몇마리 잡혔고,, 등등 다 여기

class animal{ // 동물 베이스. 종류가 달라져도 변수 변경으로 처리 가능하게..
    constructor(){
      this.r = 25*level+level*5; //몸 크기. 
      this.x = random(0+this.r,720-this.r); // 처음 위치 랜덤
      this.y = random(0+this.r,430-this.r);
      this.speed = 0.7+level/8; // 레벨에 따라 속도 빨라짐. 상수는 해보고 조정
      this.dirX = true; //랜덤 방향 전환용 그거 그.. 뭐냐 여튼 그거
      this.dirY = true;
      this.caught = false
      this.dirTimer = Math.floor(random(30,60)); //랜덤 주기 방향 변경. 숫자는 움직임 봐가면서 수정하기
      this.catchTime = 0;
    }
  
  
    display(){
      imageMode(CENTER);
      if(huntStage == 2){
        image(animals[1],this.x,this.y,this.r,this.r);
      } else if(huntStage == 5){
        image(animals[2],this.x,this.y,this.r,this.r);
      } else if(huntStage == 8){
        image(animals[3],this.x,this.y,this.r+10,this.r+10);
      }
    }
  
  
    move(){
      this.dirTimer--;
  
      if(this.dirTimer <= 0){ //frameCount를 변경해야할지도
        if(random(0,2)<1){
          this.dirX = !this.dirX;
        }
        if(random(0,2)<1){
          this.dirY = !this.dirY;
        }
        this.dirTimer = Math.floor(random(30,60)); //타이머 재설정
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
      if(this.x+this.r/2 >720){
        this.x = 720 - this.r/2;
        this.dirX = !this.dirX;
      }
      if(this.y-this.r/2 <0){
        this.y = this.r/2; // 충돌시 위치 고정
        this.dirY = !this.dirY; //벽꿍방지
      }
      if(this.y+this.r/2 >430){
        this.y = 430 - this.r/2;
        this.dirY = !this.dirY;
      }
    }
  
    catch_1(hx,hy,hr){ //hunter의 위치 받아서 거리 측정후 체크
      let d = dist(hx, hy, this.x, this.y)
      if(d<this.r/2 + hr/4){
        this.caught = true;
        howMany[0] += 1;
      }
    }
  
    catch_2(){ // 다시.. 오자.. 존나어렵겠네..
      for(let i=bullets.length-1; i >= 0; i--){ //양들 다 돌리면서 총알과 맞았나 확인
        let d = dist(this.x, this.y, bullets[i].x, bullets[i].y)
        if(d<this.r/2 + bullets[i].r/2){
          bullets.splice(i,1); //여기서 제거?
          this.caught = true;
          howMany[1] += 1;
        }
      }
    }
  
    catch_3(mx, my){ //마우스 위치 받아서,, 응 그거
      let d = dist(mx, my, this.x, this.y);
      if(d<this.r/2 && mouseIsPressed){ //마우스 올려두면 카운트 증가
        this.catchTime ++
      } else { //아니면 리셋 ....이거는 없애야 할지도 좀 어려워짐
        this.catchTime = 0;
      }
      if(this.catchTime > 60*2){ //3초면 잡습니다
        this.caught = true;
        howMany[2] += 1;
      }
    }
  
  }
  