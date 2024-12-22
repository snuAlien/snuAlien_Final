class underBar{ // 화면하단 상태창..
    constructor(){
    }
  
    updateGauge(){ // 무게 계산 및 게이지 시각화
      noStroke();
      textAlign(CENTER, CENTER);
  
      rectMode(CENTER);
      fill(150);
      rect(280,455,550,20,8); // 게이지바
  
      score = howMany[0]*50 + howMany[1]*150 + howMany[2]*300; //점수계산
      gauge = constrain(map(score,0,2000,0,550),0,550); // 점수를 게이지로 매핑, 최댓값 제한
  
      push(); //게이지바 상승~!
      rectMode(CORNER);
      let gaugeColor = lerpColor(color(255, 255, 255), color(0, 255, 0), score / 2000);
      fill(gaugeColor);
      rect(5,445,gauge,20,8);
      fill(255);
      textSize(18);
      text((score/20).toFixed(1) + "%", 530, 453);
      pop();
  
      // pop(); //주머니속에고기고기
      // fill(255,100,0,150);
      // rect(20,455,30); // 고기 이미지로 대체 예정
      // push();
    }
  
    portrait(stage){ // 동물 초상화와 몇마리 잡앗는지 시각화
      noStroke();
      rectMode(CENTER)
      textAlign(CENTER, CENTER);
      imageMode(CENTER);
  
      fill(0,150);
      // rect(580,455,40);
      image(animals[stage],580,455,35,35) // 메인 초상화
      textSize(30);
      text("X"+howMany[stage-1],625,453); // 몇마리잡앗는지
  
      
      //rect(660,443,18); 
      image(animals[stage%3+1],660,443,15,15);// 서브 초상화1
      textSize(16);
      text("X"+howMany[((stage-1)%3+1)%3],685,441); // 몇마리잡앗는지 와 % 쓴거 좀 똑똑하다
  
      //rect(660,467,18); 
      image(animals[(stage+1)%3+1],660,467,15,15);// 서브 초상화2
      text("X"+howMany[((stage-1)%3+2)%3],685,465); // 몇마리잡앗는지
  
    }
  
    display(){ // 나머지 시각화
      noStroke();
      fill(100);
      quad(0,430,720,430,720,480,0,480); //하단메뉴
    }
  }
  
