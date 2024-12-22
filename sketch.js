let backgroundImgs = [];
let AlienImgs = [];
let planetImgs = [];
let toons = [];
let guides = [];
let bgms = [];
let UFOImg;
let letterPaperImg;
let helperImg;
let arrowImg;
let classFont;
let mapoFont;
let alienFont;

let stage = 0; // 전체 스테이지
let startFrame = 0;
let ufo;
let choice_00 = true;
let moveTime = 0;
let letterStage = 0;
let textStage = 0;
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let alienCode = []; // 외계인 암호
let caesarBoxes = [];
let caesarActivebox = 1;
let caesarAnswer = ['r','e','d','h','e','a','r','t'];
let caesarStage = 0;

let angle = 0;
let in_angle = 0;
let out_angle = 0;
let isDragging_In = false;
let isDragging_Out = false;
let dialCenter;
let isLocked = false;

let planetInfo = [];
let planetControl = [];
let planetVarX = 0; 
let planetVarY = 0;
let isDragging = false;
let planetChoosed;

let dressImgs = []; // 아이템 이미지
let dressPieces = []; // 외계인 선물 저장하는 배열
let dressTargets = []; // 외계인 선물을 착용했을 때를 저장하는 배열
let selectedPiece = null; // 마우스로 선물 드레그

let wx1 = [], wy1 = []; // 첫 번째 선분들의 좌표
let wx2 = [], wy2 = []; // 두 번째 선분들의 좌표
let wAngle1 = []; // 첫 번째 선분의 각도
let wAngle2 = []; // 두 번째 선분의 각도
let whipTime = 0; // 시간을 저장할 변수

let under; // 언더바
let huntStage = 0; //현재 단계
let previousStage = -999; //huntStage랑 다른 수
let animals = [];
let rabbits = []; // 토끼
let sheeps = []; // 양
let hollans = []; // 홀란도스
let slingShot; // 슬링샷
let bullets = []; // 총알 배열
let bulletTimer = false;
let bulletTime=0;
let hunter;
let huntStart = false;
let stageFrame = 0; // 스테이지 시작하고 시간재기
let weight = 0; // 언더바
let score = 0; // 언더바
let gauge = 0; // 언더바
let level = 1; // animal
let howMany = [0,0,0] // 몇마리 잡혔는지

let build0 = Array(10); // 건물짓기 배열
let build1 = Array(10); 
let build2 = Array(10); 
let buildAnswer0 = Array(10); // 건물짓기 정답을 저장하는 배열
let buildAnswer1 = Array(10);
let buildAnswer2 = Array(10);
let buildStage = 0;
let buildAnswerNum = 0; 
let buildStartTime;
let buildTimeMove = true;
let buildHmoveX = 410; // 건물짓기에서 조력자 움직임
let buildHmoveY = 392; // 건물짓기에서 조력자 움직임

let handsOnDeodum = false
let hand = [];

let predictions = []; // Handpose님이 예측한 손 키포인트 데이터들
let video;
let handposeModel; // 객체되실분
let photoStage = 0;
let gestures = ["deodumi", "vv", "ddabong", "free"];
let capture = {
  deodumi: null,
  vv: null,
  ddabong: null,
  free: null
};
let cameraTime = 0;
let cameraOn = false;
let photoDone = false;

let bgm1 = 0;
let bgm2 = 0;
let bgm3 = 0;

let startMillis = 0;

function preload() {
  for(let i=0; i<17; i++){
    bgms[i] = loadSound('sound/sound'+i+'.mp3');
  }

  for (let i=0; i<8; i++){
    toons[i] = loadImage('assets/toon'+(i+1)+'.png')
  }
  for (let i=0; i<15; i++) {
    backgroundImgs[i] = loadImage('background/bg'+i+'.png');
  }
  
  for (let i=0; i<21; i++) {
    AlienImgs[i] = loadImage('alien/alien'+i+'.png');
  }

  for (let i=0; i<15; i++) {
    planetImgs[i] = loadImage('planet/p'+i+'.png');
  }

  for (let letter of alphabet) {
    alienCode[letter] = loadImage('alienCodes/'+letter+'.PNG')
  }

  for (let i=0; i<12; i++){
    dressImgs[i] = loadImage('item/item'+(i+1)+'.PNG');
  }

  for (let i=0; i<3; i++){
    guides[i] = loadImage('assets/guide'+(i+1)+'.png');
  }

  for (let i=1; i<4; i++){
    animals[i] = loadImage('assets/animal'+i+'.png');
  }
  
  for (let i=0; i<2; i++){
    hand[i] = loadImage('assets/hand'+i+'.png');
  }

  UFOImg = loadImage('assets/ufo.png');
  letterPaperImg = loadImage('assets/letterPaper.png');
  helperImg = loadImage('assets/helper.png');
  arrowImg = loadImage('assets/arrow.png');
  classFont = loadFont('assets/210_Sueopsigan_Regular.ttf');
  mapoFont = loadFont('assets/MapoDPP.ttf');
  alienFont = loadFont('assets/DNFBitBitTTF.ttf');
}

function setup() {
  createCanvas(720, 480);

  bgms[14].setVolume(0.6);
  bgms[14].play();
  bgms[14].setLoop(true);

  frameRate(60);
  caesarCreate();
  dialCenter = createVector(260,240);
  planetArray();
  dressArray();
  ufo = new ufoMove();
  under = new underBar(); //슝 나오는 이펙트.. 시간나면..
  hunter = new Hunter(); // 헌터나와라 뚝딱
  slingShot = new SlingShot(); //새총나와라딱뚝
  buildArray();
  buildAnswerArray();
  text_onMove = new TypingAnimation('이동 중....');
  text_02 = new TypingAnimation('삐로빼로, 인간들\n우리는 ZH-1129에 사는 삐로족이다.\n얼마 전 우주 탐사 과정에서 TS-0810,\n즉 지구를 발견했다.\n푸른 별 지구에 대해 \n궁금한 것이 많다.\n지구인을 ZH-1129로 \n초대한다.\n기다리고 있겠다.');
  text_03_0 = new TypingAnimation('안녕하세요, 지구인 여러분.');
  text_03_1 = new TypingAnimation('저는 여러분을 안내할 삐로족의 고등 애완동물 삐빼삐입니다.');
  text_03_2 = new TypingAnimation('저를 통하면 삐로족과 지구인의 언어는 자동으로 통역됩니다.');
  text_03_3 = new TypingAnimation('보안 상의 이유로 ZH-1129를 찾을 수 있는 정보는 \n암호화되어 있습니다.');
  text_03_4 = new TypingAnimation('다이얼을 돌려 암호를 풀어주세요. \n다이얼이 알맞게 돌아가면 자동으로 고정됩니다.');
  text_05_0 = new TypingAnimation('암호 해독에 성공하셨습니다.');
  text_05_1 = new TypingAnimation('방금 해독한 암호를 이용해 ZH-1129를 찾으시면 됩니다.');
  text_05_2 = new TypingAnimation('방향키를 이용해 UFO를 움직일 수 있고, UFO를 행성 위에 놓고\n스페이스 바를 누르면 해당 행성으로 이동합니다.');
  text_07_1 = new TypingAnimation('ZH-1129에 오신 것을 환영합니다.');
  text_07_2 = new TypingAnimation('여왕님께 안내하겠습니다.');
  text_10_0 = new TypingAnimation('ZH-1129에 오신 것을 환영해요.');
  text_10_1 = new TypingAnimation('저는 삐로족의 여왕 삐카테리나 287세입니다.');
  text_10_2 = new TypingAnimation('이제부터 삐시모토 칸나가 안내해 줄 거에요.');
  //text_11_0 = new TypingAnimation('');
  text_11_1 = new TypingAnimation('삐로빼로, 네가 말로만 듣던 지구인? 만나서 반갑삐!');
  text_11_2 = new TypingAnimation('이 몸의 이름은 삐시모토 칸나(>_<)');
  text_11_3 = new TypingAnimation('지구인들이 삐시모토 칸나를 위해 선물을 준비했다고 합니다.');
  text_11_4 = new TypingAnimation('헤에~ 기대 돼! (#O#)');
  text_13_0 = new TypingAnimation('삐삐빼삐삐빼삐!(매우 고맙다는 뜻)');
  //text_13_1 = new TypingAnimation('');
  text_13_2 = new TypingAnimation('이제 우리가 친해졌으니, 지구인을 초대한 진짜 이유를 말해줄게삐.');
  text_13_3 = new TypingAnimation('삐로족은 원래 NK-1209에 살았빼, \n환경 오염이 너무 심각해져서 ZH-1129로 왔삐.');
  text_13_4 = new TypingAnimation('그치만 ZH-1129로 온 지 얼마 안 돼서 잘 곳도, 머물 곳도 없삐… 8ㅇ8');
  text_13_5 = new TypingAnimation('삐로들은 팔이 짧아서 건물을 짓기도 힘들삐(TOT)');
  text_13_6 = new TypingAnimation('지구인들의 건축 기술이 매우 엄청 대박 킹왕짱이라고 들었는빼, \n삐로족을 위해 건물 짓는 거 어때삐?(//-//)');
  text_15_0 = new TypingAnimation('삐이~ 삐삐빼삐삐빼삐!(정말 매우 고맙다는 뜻)');
  text_15_1 = new TypingAnimation('바로 건물을 지으러 가야해삐! 시간이 없삐(ㅠㅅㅠ)');
  // text_16_0 = new TypingAnimation('');
  // text_16_1 = new TypingAnimation('');
  text_16_2 = new TypingAnimation('이 사이렌 소리는 사냥터에 동물들이 출몰 했다는 신호입니다. \n지금 사냥하지 않으면 삐로족은 굶어야 합니다. 전원 사냥 출동!');
  text_17_0 = new TypingAnimation('ZH-1129의 동물들을 사냥하세요.\n\n세 개의 스테이지에서 삐토, 삐양, 삐라도스를 사냥하세요.\n\n각 스테이지의 제한 시간은 30초입니다.\n\n동물들을 사냥하면 화면 하단의 게이지가 채워집니다.\n\n제한 시간 안에 세 스테이지에서 사냥하며 게이지를 모두 채우면 통과입니다. \n\n자세한 사냥 방법은 각 스테이지에서 알려드릴게요.\n\n삐이팅!\n');
  text_18_0 = new TypingAnimation('STAGE 1');
  text_18_1 = new TypingAnimation('방향키로 삐빼삐를 움직여 삐토를 사냥하세요.');
  text_18_2 = new TypingAnimation('STAGE 2');
  text_18_3 = new TypingAnimation('마우스 클릭으로 총을 발사해 삐양을 사냥하세요.');
  text_18_4 = new TypingAnimation('STAGE 3');
  text_18_5 = new TypingAnimation('3초 동안 삐라도스를 누른 채 따라가 사냥하세요.\n삐라도스를 누른 채 따라가는 동안 빨간 원이 채워집니다.');
  text_19_0 = new TypingAnimation('삐삐삐! 성공했삐!');
  text_19_1 = new TypingAnimation('삐삐로빼로(나쁘지 않다는 뜻) 이제 정말로 건.물.건.설. 하러 가자삐~!');
  text_21_0 = new TypingAnimation('방향키를 이용해 삐빼삐를 움직이면\n\n지나간 자리의 삐크리트(삐로족의 건설 자재)를 먹어치웁니다.\n\n삐빼삐를 움직여 오른쪽의 네모 모양 삐크리트가\n\n왼쪽의 설계도와 같은 모양이 되도록 만들어주세요.\n\n키보드의 "X" 버튼을 눌러 리셋할 수 있습니다.\n\n다만, 리셋을 할 때마다 제한 시간이 줄어드니 신중하게 해주세요!\n\n제한 시간 이내에 세 개의 건물을 완성하면 됩니다.\n\n삐이팅!');
  text_23_0 = new TypingAnimation('삐삐삐! 완전 허접은 아니었잖삐~ \n삐삐삐로삐빼로빼(정말 엄청 매우 고맙다는 뜻)');
  text_23_1 = new TypingAnimation('이제 삐시모토와 삐로들은 편하게 지낼 수 있겠삐(>o<)');
  text_24_0 = new TypingAnimation('삐삐삐! 정말 고마워요.');
  text_24_1 = new TypingAnimation('약속했던 대로 선물을 드릴게요.\n제 더듬이 중 하나를 가져가세요.');
  text_26_0 = new TypingAnimation('아야야… 선물은 마음에 드셨나요?');
  text_26_1 = new TypingAnimation('저희 삐로족을 도와 주셔서 감사합니다. \n떠나기 전, 삐생네컷을 촬영할까요?');
  text_27_0 = new TypingAnimation('사진은 총 네 번 촬영됩니다. 삐로족의 카메라는 특별해서,\n삐로족과 동일한 손동작을 만들면 자동으로 촬영됩니다.');
  text_27_1 = new TypingAnimation('앞의 세 컷은 화면의 삐로족과 동일한 손동작을 만들면 촬영되고,\n마지막 컷은 자유 포즈로 5초 후 촬영됩니다. ');
  text_29_0 = new TypingAnimation('수고하셨습니다. 곧 삐로족과 찍은 삐생네컷이 공개됩니다.\n화면은 30초간 유지되고 게임이 종료됩니다. 카메라를 준비해주세요.')
  text_101_0 = new TypingAnimation('신원 확인 불가. 침입자를 처단합니다.')
  text_200_0 = new TypingAnimation('감히 우리의 제안을 거절하다니! 여봐라, 지구인을 감옥에 가두어라!')
  text_201_0 = new TypingAnimation('반역 죄인을 사냥에 출동시키라는 명령이다. 당장 출동!')
  text_300_0 = new TypingAnimation('형편 없군요. 당신은 지구로 돌아갈 자격이 없습니다.\n평생 ZH-1129에 남아 건물을 지어야 합니다. ')
}

function draw() {
  background(220);
  switch (stage) {
    case 0: // 표지
      stage_00();
      break;
    case 1: // 컷신
      stage_01();
      break;
    case 2: // 편지
      stage_02();
      break;
    case 3: // 삐빼삐 등장
      stage_03();
      break;
    case 4: // 카이사르 암호
      stage_04();
      break;
    case 5: // 행성 찾기 설명
      stage_05();
      break;
    case 6: // 행성 찾기
      stage_06();
      break;
    case 7: // 이동 중
      onMove(200);
      onMove_UFO();
      break;
    case 8: // ZH-1129 도착
      stage_08();
      break;
    case 9: // 이동 중
      onMove(90);
      onMove_HELPER();
      break;
    case 10: // 여왕과 인사
      stage_10();
      break;
    case 11: // 삐시모토 칸나와 인사
      stage_11();
      break;
    case 12: // 옷 입히기 나중에
      stage_12();
      break;
    case 13: // 사정 설명
      stage_13();
      break;
    case 14: // Yes/No
      stage_14();
      break;
    case 15: // Yes
      stage_15();
      break;
    case 16: // 삐용삐용 여왕 배고파
      stage_16();
      break;
    case 17: // 사냥 설명
      stage_17();
      break;
    case 18: // 사냥
      stage_18();
      break;
    case 19:
      stage_19();
      break;
    case 20: // 이동 중
      onMove(90);
      onMove_HELPER();
      break;
    case 21: // 건물 짓기 설명
      stage_21();
      break;
    case 22: // 건물 짓기
      stage_22();
      break;
    case 23:
      stage_23();
      break;
    case 24: // 더듬이 뜯어가세요~
      stage_24();
      break;
    case 25: // 더듬이 뽑기 미완
      stage_25();
      break;
    case 26: // 아프다
      stage_26();
      break;
    case 27:
      stage_27();
      break;
    case 28: // 카메라
      stage_28();
      break;
    case 29:
      stage_29();
      break;
    case 30:
      stage_30();
      break;
    case 100: // 행성 찾기에서 잘못된 행성 찾았을 때
      onMove(200);
      onMove_UFO();
      break;
    case 101:
      stage_101();
      break;
    case 200: // 여왕 화남
      stage_200();
      break;
    case 201: // 갇힘
      stage_201();
      break;
    case 300: //건물실패
      stage_300();
      break;
    case 500:
      stage_500();
      break;
    case 600:
      stage_600();
      break;
  }
}


function stage_00() {
  imageMode(CORNER);
  image(backgroundImgs[0],0,0,720,480);

  if (bgm1 == 0) {
    bgms[0].play();
    bgm1++;
  }

  ufo.move();
  ufo.display();

  clickText('[ UFO를 클릭하세요 ]',600,450,startFrame);
}

function stage_01() { // 컷신
  fill(0);
  rectMode(CORNER);
  rect(0,0,720,480);

  cutScene();

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,440,startFrame);
  moveTime++;
}

function stage_02() { // 편지
  bgms[0].stop()
  bgm1=0;
  imageMode(CORNER);
  image(backgroundImgs[1],0,0,720,480);

  switch (letterStage) {
    case 0:
      if (moveTime < 50) {

        fill(88,235,255);
        textSize(moveTime*4/5);
        textAlign(CENTER,CENTER);
        textFont(classFont);
        text('이 편지는 ZH-1129에서 시작되어',360,145);

        startFrame = frameCount;
      } else {
        fill(88,235,255);
        textAlign(CENTER,CENTER);
        textSize(40);
        textFont(classFont);
        text('이 편지는 ZH-1129에서 시작되어',360,145);

        push();
        rectMode(CENTER);
        noFill();
        stroke(88,235,255);
        strokeWeight(2);
        rect(360,150,650,80,50);
        pop();

        push();
        translate(360,350);
        if (mouseX>320 && mouseX<400 && mouseY>325 && mouseY<375) scale(1);
        else scale(0.8);
        drawLetter();
        triangle(-50,-25,50,-25,0,5);
        pop();

        clickText('[ 편지봉투를 클릭하세요 ]',580,450,startFrame);
      }
      break;
    case 1:
      push();
      if (bgm2 == 0) {
        bgms[1].play();
        bgm2++;
      }
      translate(360,350);
      drawLetter();
      if (moveTime <= 20) triangle(-50,-25,50,-25,0,5-3*moveTime);
      else if (moveTime < 40) triangle(-50,-25,50,-25,0,-55);
      else {
        moveTime = 0;
        letterStage = 2;
      }
      pop();
 
      break;
    case 2:
      if (moveTime < 40){
        push();
        translate(360,350);
        fill(242, 229, 201);
        rectMode(CENTER);
        stroke(0);
        rect(0,0,100,50);
        triangle(-50,-25,50,-25,0,-55);

        imageMode(CENTER);
        image(letterPaperImg,0,-10-moveTime,84,25+moveTime/2);
      
        fill(242, 229, 201);
        triangle(-50,-25,-50,25,0,5);
        triangle(50,-25,50,25,0,5);
        beginShape();
        vertex(-50,25);
        vertex(-47.5,20);
        vertex(-6,0);
        vertex(6,0);
        vertex(47.5,20);
        vertex(50,25);
        endShape(CLOSE);
        pop();
      } else if (moveTime < 60) {
        push();
        translate(360,350);
        fill(242, 229, 201);
        rectMode(CENTER);
        stroke(0);
        rect(0,0,100,50);
        triangle(-50,-25,50,-25,0,-55);
      
        imageMode(CENTER);
        image(letterPaperImg,0,-50,84,45);
      
        fill(242, 229, 201);
        triangle(-50,-25,-50,25,0,5);
        triangle(50,-25,50,25,0,5);
        beginShape();
        vertex(-50,25);
        vertex(-47.5,20);
        vertex(-6,0);
        vertex(6,0);
        vertex(47.5,20);
        vertex(50,25);
        endShape(CLOSE);
        pop();
      }
      else if (moveTime < 130) {
        imageMode(CENTER);
        image(letterPaperImg,360,300-60/70*(moveTime-60),84+236/70*(moveTime-60),45+295/70*(moveTime-60));
      } else if (moveTime < 160) {
        imageMode(CENTER);
        image(letterPaperImg,360,240,320,340);
      } else letterStage = 3;
      break;
    case 3:
      imageMode(CENTER);
      image(letterPaperImg,360,240,320,340);

      fill(0);
      textSize(15);
      textAlign(LEFT, TOP);
      text_02.update();
      text_02.display(215, 120);

      bgm2 = 0;
      clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
      break;
  }
  moveTime++;
}

function stage_03() { // 삐빼삐 등장
  imageMode(CORNER);
  image(backgroundImgs[1],0,0,720,480);

  if (0<moveTime && moveTime < 50) {
    push();
    translate(360,240);
    rotate(radians(36*moveTime));
    imageMode(CENTER);
    image(helperImg,0,0,100/50*moveTime,80/50*moveTime);
    pop();
  } else if (moveTime >= 50){
    imageMode(CENTER);
    image(helperImg,360,240,100,100);

    textSetting(146,200,81,mapoFont);

    switch (textStage) {
      case 0:
        if(bgm1 == 0) {
          bgms[2].play();
          bgms[2].setLoop(true);
          bgm1 ++ ;
        }

        text_03_0.update();
        text_03_0.display(110,395);
        break;
      case 1:
        text_03_1.update();
        text_03_1.display(110,395);
        break;
      case 2:
        text_03_2.update();
        text_03_2.display(110,395);
        break;
      case 3:
        text_03_3.update();
        text_03_3.display(110,382);
        break;
      case 4:
        text_03_4.update();
        text_03_4.display(110,382);
        if(text_03_4.check()){
          bgms[2].stop();
        }
        break;
    }
    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
  }

  moveTime++;
}

function stage_04() { // 카이사르
  imageMode(CORNER);
  image(backgroundImgs[1],0,0,720,480);

  push();
  textSize(15);
  textAlign(CENTER);
  rectMode(CENTER);

  fill(255);
  rect(570,120,250,30);

  fill(150);
  text('키보드로 빈 칸에 문자를 입력하세요',570,120)

  pop();

  doTheDance();// 외계인 암호문 표시

  if (caesarStage == 2) {
    wait(1000);
    stage = 5;
  }

  caesarAnswerCheck();
  caesar();
  drawDial();
}

function stage_05() { // 칭찬
  //console.log(bgm1);
  imageMode(CORNER);
  image(backgroundImgs[1],0,0,720,480);

  textSetting(146,200,81,mapoFont);

  switch (textStage) {
    case 0:
      if(bgm1 == 0) {
        bgms[2].play();
        bgms[2].setLoop(true);
        bgm1++;
      }
      text_05_0.update();
      text_05_0.display(110,395);
      break;
    case 1:
      text_05_1.update();
      text_05_1.display(110,395);
      break;
    case 2:
      text_05_2.update();
      text_05_2.display(110,387); 
      break;
  }
  
  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

  imageMode(CENTER);
  image(helperImg,70,400,70,70);
}

function stage_06() { // 행성 찾기

  bgms[2].stop()
  bgm1 = 0;

  if (keyIsDown(LEFT_ARROW)) planetVarX += 4;
  if (keyIsDown(RIGHT_ARROW)) planetVarX -= 4;
  if (keyIsDown(UP_ARROW)) planetVarY += 4;
  if (keyIsDown(DOWN_ARROW)) planetVarY -= 4;

  let planetVarX1 = 0;
  let planetVarY1 = 0;

  planetVarX = constrain(planetVarX,-820,820);
  planetVarY = constrain(planetVarY,-420,420);

  if (planetVarX < -500) planetVarX1 = planetVarX + 500;
  if (planetVarX > 500) planetVarX1 = planetVarX - 500;
  if (planetVarY < -200) planetVarY1 = planetVarY + 200;
  if (planetVarY > 200) planetVarY1 = planetVarY - 200;

  push();
  translate(constrain(planetVarX,-500,500),constrain(planetVarY,-200,200));

  // 배경 그리기
  fill(0);
  rectMode(CORNER);
  rect(-800,-500,2600,1500);

  // 마우스가 행성 위에 있는지 확인
  planetMouseOver();

  // 행성 그리기
  for (let i=0; i<planetInfo.length; i++){
    imageMode(CENTER);
    image(planetImgs[i], planetInfo[i].x, planetInfo[i].y, planetInfo[i].size, planetInfo[i].size);
  }

  for (let i=0; i<planetInfo.length; i++) {
    if (planetChoosed === i) {
      image(planetImgs[i], planetInfo[i].x, planetInfo[i].y, planetInfo[i].size+moveTime*10, planetInfo[i].size+moveTime*10);
      moveTime++;
    }
  }

  pop();

  if (moveTime > 50 && planetChoosed != null) {
    moveTime = 0;
    if (planetInfo[planetChoosed].answer) stage = 7;
    else stage = 100;
  }

  imageMode(CENTER);
  image(UFOImg,360-planetVarX1,240-planetVarY1,70,50);

  if (!keyIsPressed && planetChoosed == null) {
    clickText('[ 스페이스 바로 행성 선택 ]',600,450,startFrame);
    clickText('[ 방향키로 이동 ]',120,450,startFrame);
  }
}

function stage_08() { // ZH-1129 도착
  fill(0);
  rectMode(CORNER);
  rect(0,0,720,480);

  if (moveTime <= 50) {
    imageMode(CENTER); 
    image(backgroundImgs[2],360,240,720/50*moveTime,480/50*moveTime);
  } else if (moveTime < 100) {
    image(backgroundImgs[2],360,240,720,480);
    textStage = 0;
  } else if (moveTime >= 100){
    image(backgroundImgs[2],360,240,720,480);

    textSetting(146,200,81,mapoFont);

    switch (textStage) {
      case 0:
        if(bgm1 == 0) {
          bgms[2].play();
          bgms[2].setLoop(true);
          bgm1++;
        }
        text_07_1.update();
        text_07_1.display(110,395);
        break;
      case 1:
        text_07_2.update();
        text_07_2.display(110,395);
        if(text_07_2.check()){
          bgms[2].stop();
          bgm1 = 0
          }
        break;
    }

    fill(0,100);
    rectMode(CENTER);

    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

    imageMode(CENTER);
    image(helperImg,70,400,70,70);
  }

  moveTime++;
}

function stage_10() { // 여왕에게 가기
  if (moveTime <= 50) {
    imageMode(CENTER);
    image(backgroundImgs[5],360,240,720,480);
    image(AlienImgs[0],360,350,100+2*moveTime,100+2*moveTime);
  } else if (moveTime < 100) {
    imageMode(CENTER);
    image(backgroundImgs[5],360,240,720,480);
    image(AlienImgs[0],360,350,200,200);
  } else {
    imageMode(CENTER);
    image(backgroundImgs[5],360,240,720,480);
    image(AlienImgs[0],360,350,200,200);

    textSetting2(239,143,209,alienFont);

    switch (textStage) {
      case 0:
        if(bgm1 == 0) {
          bgms[4].play();
          bgms[4].setLoop(true);
          bgm1++;
        }
        text_10_0.update();
        text_10_0.display(110,128);
        break;
      case 1:
        text_10_1.update();
        text_10_1.display(110,128);
        break;
      case 2:
        text_10_2.update();
        text_10_2.display(110,128); 
        if(text_10_2.check()){
          bgms[4].stop();
          bgm1 = 0;
          }
        break;
    }

    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
  }

  moveTime++;
}

function stage_11() { // 삐시모토 칸나
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  if (moveTime <= 50) {
    push();
    translate(360-moveTime*8,350-moveTime*4);
    rotate(radians(18*moveTime));
    imageMode(CENTER);
    image(AlienImgs[0],0,0,200-moveTime*2,200-moveTime*2);
    pop();

    startFrame = frameCount;
  } else if (moveTime < 150) {
    // textSetting2(87,234,255,mapoFont);

    // text_11_0.update();
    // text_11_0.display(110,128);

    // clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

    moveTime = 180;
  } else if (moveTime < 200) {
    textSetting4(253,254,150,alienFont);
    if(bgm1 == 0) {
      bgms[4].play();
      bgms[4].setLoop(true);
      bgm1++;
    }
    text_11_1.update();
    text_11_1.display(110,128);

    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

    moveTime = 180;
  } else if (moveTime < 250) {
    push();
    translate(760-(moveTime-200)*8,150+(moveTime-200)*4);
    rotate(radians(36*(moveTime-150)));
    imageMode(CENTER);
    image(AlienImgs[2],0,0,100+(moveTime-200)*2,150+(moveTime-200)*2);
    pop();
  } else if (moveTime < 300) {
    imageMode(CENTER);
    image(AlienImgs[2],360,350,200,250);
    textStage = 0;
  } else {
    imageMode(CENTER);
    image(AlienImgs[2],360,350,200,250);

    switch (textStage) {
      case 0:
        textSetting2(253,254,150,alienFont);

        text_11_2.update();
        text_11_2.display(110,128);
        break;
      case 1:
        textSetting(146,200,81,mapoFont);

        text_11_3.update();
        text_11_3.display(110,395);

        imageMode(CENTER);
        image(helperImg,70,400,70,70);
        break;
      case 2:
        textSetting2(253,254,150,alienFont);

        text_11_4.update();
        text_11_4.display(110,128);
        if(text_11_4.check()){
          bgms[4].stop();
          bgm1 = 0;
          }
        break;
    }
  }

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

  moveTime++;
}

function stage_12() { // 옷 입히기
  image(backgroundImgs[5],0,0,720,480);
  if(bgm1 == 0) {
    bgms[14].pause();
    bgms[6].play();
    bgms[6].setLoop(true);
    bgm1++;
  }

  drawAlien(180,300); // 외계인 그리기
  drawDress(); // 선반과 선물 그리기

  clickText('[ 마우스를 이용해 선물을 칸나에게 주세요 ]',140,460,startFrame);
  clickText('[ 스페이스 바로 선물주기 마무리 ]',600,460,startFrame);
  
}

function stage_13() { // 사정 설명
  bgms[6].stop();
  bgm1 = 0;
  if(bgm3 == 0) {
    bgms[14].play();
    bgms[14].setLoop(true);
    bgm3++;
  }
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  // imageMode(CENTER);
  // image(AlienImgs[2],360,350,200,250);

  drawAlien(180,300);

  switch (textStage) {
    case 0:
      textSetting3(253,254,150,alienFont);
      if(bgm2 == 0) {
        bgms[4].play();
        bgms[4].setLoop(true);
        bgm2++;
      }
      text_13_0.update();
      text_13_0.display(110,93);
      break;
    // case 1:
    //   textSetting3(87,234,255,mapoFont);

    //   text_13_1.update();
    //   text_13_1.display(110,93);
    //   break;
    case 2:
      textSetting3(253,254,150,alienFont);

      text_13_2.update();
      text_13_2.display(110,93);
      break;
    case 3:
      textSetting3(253,254,150,alienFont);

      text_13_3.update();
      text_13_3.display(110,80);
      break;
    case 4:
      textSetting3(253,254,150,alienFont);

      text_13_4.update();
      text_13_4.display(100,93);
      break;
    case 5:
      textSetting3(253,254,150,alienFont);

      text_13_5.update();
      text_13_5.display(110,93);
      break;
    case 6:
      textSetting3(253,254,150,alienFont);

      text_13_6.update();
      text_13_6.display(110,80);
      if(text_13_6.check()){
        bgms[4].stop();
        bgm2 = 0;
        }
      break;
  }

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function stage_14() { // Yes/No
  bgm3 = 0;
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  drawAlien(180,300);

  fill(0,150);
  rectMode(CENTER);
  rect(360,240,720,480);

  if (choice_00) {
    if (frameCount%40<30) {
      strokeWeight(0.7);
      stroke(87,234,255);
    }
    else noStroke();

    fill(0,200);
    rect(360,160,717.5,80);

    noStroke();
    rect(360,320,717.5,80);
  } else {
    if (frameCount%40<30) {
      strokeWeight(0.7);
      stroke(87,234,255);
    }
    else noStroke();

    fill(0,200);
    rect(360,320,717.5,80);

    noStroke();
    rect(360,160,717.5,80);
  }

  fill('#58ebff');
  textSize(25);
  textAlign(CENTER);
  textFont(classFont);
  text('Yes',360,160);
  text('No',360,320);
}

function stage_15() { // 꺄아 고마워~ ...
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  drawAlien(180,300);

  switch (textStage) {
    case 0:
      if(bgm2 == 0) {
        bgms[4].play();
        bgm2++;
      }
      textSetting3(253,254,150,alienFont);

      text_15_0.update();
      text_15_0.display(110,93);
      break;
    case 1:
      textSetting3(253,254,150,alienFont);

      text_15_1.update();
      text_15_1.display(110,93);

      break;
  }

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function stage_16() { // 삐용삐용 여왕 배고파

    bgms[4].stop();
    bgm2 = 0;
  
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  if (moveTime < 50) {
    drawAlien(180-moveTime*6,300-moveTime*4,36*moveTime,1-moveTime/60);

    startFrame = frameCount;
    if(bgm1 == 0) {
      bgms[7].play();
      bgms[7].setLoop(true);
      bgm1++;
    }
  } else {
    switch (textStage) {
      // case 0:
      //   textSetting2(87,234,255,mapoFont);

      //   text_16_0.update();
      //   text_16_0.display(110,128);
      //   break;
      // case 1:
      //   textSetting(146,200,81,mapoFont);

      //   text_16_1.update();
      //   text_16_1.display(110,395);

      //   imageMode(CENTER);
      //   image(helperImg,70,400,70,70);
      //   break;
      case 0:

        textSetting(146,200,81,mapoFont);

        text_16_2.update();
        text_16_2.display(110,382);
        if(text_16_2.check()){
          bgms[7].stop();
          bgm1 = 0;
          }
        imageMode(CENTER);
        image(helperImg,70,400,70,70);
        break;
    }

    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
  }

  moveTime++;
}

function stage_17() { // 사냥 설명
  bgms[14].pause();
  if(bgm2 == 0) {
    bgms[15].setVolume(0.3);
    bgms[15].play();
    bgms[15].setLoop(true);
    bgm2++;
  }
  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  noStroke();
  fill(146,200,81);
  rectMode(CENTER);
  rect(365,245,600,400,20);

  fill(0,200);
  rect(360,240,600,400,20);

  fill(146,200,81);
  textSize(20);
  textAlign(CENTER);
  textFont(classFont);

  text_17_0.update();
  text_17_0.noCursor();
  text_17_0.display(360,100);

  push();
  translate(100,80);
  rotate(frameCount/10);
  imageMode(CENTER);
  image(helperImg,0,0,100,100);
  pop();

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);

  console.log(textStage);
}

function stage_18() { // 사냥
  nextStage();
  hunt();
}

function stage_19() { // 사냥 성공
  bgms[15].stop();
  bgm2 = 0;
  if(bgm3 == 0) {
    bgms[14].play();
    bgms[14].setLoop(true);
    bgm3++;
  }
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  drawAlien(180,300);

  textSetting3(253,254,150,alienFont);

  switch (textStage) {
    case 0:
      if(bgm1 == 0) {
        bgms[4].play();
        bgms[4].setLoop(true);
        bgm1++;
      }
      text_19_0.update();
      text_19_0.display(110,93);
      break;
    case 1:
      text_19_1.update();
      text_19_1.display(110,93); 
      if(text_19_1.check()){
        bgms[4].stop();
        bgm1 = 0;
        }
      
      break;
  }

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function stage_21() { // 건물 설명
  bgm3 = 0;
  bgms[14].pause();
  if(bgm2 == 0) {
    bgms[16].play();
    bgms[16].setLoop(true);
    bgm2++;
  }

  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  noStroke();
  fill(146,200,81);
  rectMode(CENTER);
  rect(365,245,600,400,20);

  fill(0,200);
  rect(360,240,600,400,20);

  fill(146,200,81);
  textSize(20);
  textAlign(CENTER);
  textFont(classFont);

  text_21_0.update();
  text_21_0.noCursor();
  text_21_0.display(360,70);

  push();
  translate(100,80);
  rotate(frameCount);
  imageMode(CENTER);
  image(helperImg,0,0,100,100);
  pop();

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function stage_22() { // 건물 짓기
  push();
  imageMode(CORNER);
  tint(255,128);
  image(backgroundImgs[4],0,0,720,480);
  pop();

  switch (buildStage) {
    case 0:
      buildDraw(build0, buildAnswer0);
      buildMove();
      buildTimeAttack();
      buildTimeCheck();

      if (buildAnswerCheck(build0, buildAnswer0) && buildAnswerNum > 1) {
        if (buildAnswerNum == 2) {
          buildTimeMove = false;
          wait(1000);
        }
        else {
          fill(200,200,0);
          textSize(100);
          text('정답',360,240);
        }
      }
    
      if (buildAnswerNum > 3) {
        wait(1000);
        buildAnswerNum = 0;
        buildTimeMove = true;
        buildStage = 1;
      }

      break;
    case 1:
      buildDraw(build1, buildAnswer1);
      buildMove();
      buildTimeAttack();
      buildTimeCheck();

      if (buildAnswerCheck(build1, buildAnswer1) && buildAnswerNum > 1) {
        if (buildAnswerNum == 2) {
          buildTimeMove = false;
          wait(1000);
        }
        else {
          fill(200,200,0);
          textSize(100);
          text('정답',360,240);
        }
      }
    
      if (buildAnswerNum > 3) {
        wait(1000);
        buildHmoveX = 410;
        buildHmoveY = 392;
        buildAnswerNum = 0;
        buildTimeMove = true;
        buildStage = 2;
      }
      break;
    case 2:
      buildDraw(build2, buildAnswer2);
      buildMove();
      buildTimeAttack();
      buildTimeCheck();

      if (buildAnswerCheck(build2, buildAnswer2) && buildAnswerNum > 1) {
        if (buildAnswerNum == 2) {
          buildTimeMove = false;
          wait(1000);
        }
        else {
          fill(200,200,0);
          textSize(100);
          text('정답',360,240);
        }
      }
    
      if (buildAnswerNum > 3) {
        wait(1000);
        textStage = 0;
        stage = 23;
      }
      break;
  }

  fill(64, 40, 13);
  textSize(50);
  textAlign(CENTER);
  textFont(classFont);
  text('x: reset',360,430);
}

function stage_23() { // 삐시모토 칸나 감사 인사
  bgms[16].stop();
  bgm2 = 0;
  if(bgm3 == 0) {
    bgms[14].play();
    bgms[14].setLoop(true);
    bgm3++;
  }

  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);
  image(backgroundImgs[12],50,300,100,100);
  image(backgroundImgs[13],400,300,100,100);
  image(backgroundImgs[14],550,300,100,100);

  drawAlien(360,350);

  textSetting2(253,254,150,alienFont);

  switch (textStage) {
    case 0:
      if(bgm1 == 0) {
        bgms[4].play();
        bgms[4].setLoop(true);
        bgm1++;
      }
      text_23_0.update();
      text_23_0.display(110,115);
      break;
    case 1:
      text_23_1.update();
      text_23_1.display(110,128);
      if(text_23_1.check()){
        bgms[4].stop();
        bgm1 = 0;
        }
      break;
  }

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function stage_24() { // 여왕이 감사 인사
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  if (moveTime < 50) {
    drawAlien(360-moveTime*8,350-moveTime*4,36*moveTime,1-moveTime/60);
  } else if (moveTime < 100) {

  } else if (moveTime <= 150) {
    push();
    translate(760-(moveTime-100)*8,150+(moveTime-100)*4);
    rotate(radians(36*(moveTime-100)));
    imageMode(CENTER);
    image(AlienImgs[0],0,0,100+(moveTime-100)*2,100+(moveTime-100)*2);
    pop();
  } else if (moveTime < 200){
    imageMode(CENTER);
    image(AlienImgs[0],360,350,200,200);

    startFrame = frameCount;
  } else {
    imageMode(CENTER);
    image(AlienImgs[0],360,350,200,200);

    textSetting2(239,143,209,alienFont);

    switch (textStage) {
      case 0:
        if(bgm1 == 0) {
          bgms[4].play();
          bgms[4].setLoop(true);
          bgm1++;
        }
        text_24_0.update();
        text_24_0.display(110,128);
        break;
      case 1:
        text_24_1.update();
        text_24_1.display(110,115);
        if(text_24_1.check()){
          bgms[4].stop();
          bgm1 = 0;
          }
        break;
    }

    clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
  }

  moveTime++;
}

function stage_25() { // 더듬이 나중에
  push();
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  imageMode(CENTER);

  noCursor();

  if (moveTime < 50) {
    image(AlienImgs[0],width/2,height/2+5*moveTime,200+moveTime*6,250+moveTime*6);
  } else {
    image(AlienImgs[1],width/2,height/2+250,500,550);
    push();
    translate(254,310);
    rotate(radians(-20));
    image(AlienImgs[11],0,0,25*2.3,45*2.3)
    pop();
  }
  if(mouseX<=280 && mouseX>=230 
    && mouseY<360 && mouseY>=230){
      imageMode(CORNER);
      image(backgroundImgs[4],0,0,720,480);
    
      imageMode(CENTER);

      image(AlienImgs[1],width/2,height/2+250,500,550);
      push();
      translate(254,310);
      rotate(radians(-20));
      image(AlienImgs[11],0,0,25*5,45*5)
      pop();
      handsOnDeodum = true;
      image(hand[1],mouseX,mouseY,80,80)
    }else {
      handsOnDeodum = false;
      image(hand[0],mouseX,mouseY,40,40)
    }

  moveTime++;
  pop();
}

function stage_26() {
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  imageMode(CENTER);
  image(AlienImgs[1],360,350,200,200);
  textSetting2(239,143,209,alienFont);
  
  switch (textStage) {
    case 0:
      if(bgm1 == 0) {
        bgms[4].play();
        bgms[4].setLoop(true);
        bgm1++;
      }
      text_26_0.update();
      text_26_0.display(110,128);
      break;
    case 1:
      text_26_1.update();
      text_26_1.display(110,115);
      if(text_26_1.check()){
        bgms[4].stop();
        bgm1 = 0;
        }
      break;
  }
}

function stage_27() {
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  textSetting(146,200,81,mapoFont);
  
  switch (textStage) {
    case 0:
      if(bgm1 == 0) {
        bgms[2].play();
        bgms[2].setLoop(true);
        bgm1++;
      }
      text_27_0.update();
      text_27_0.display(110,382);
      break;
    case 1:
      text_27_1.update();
      text_27_1.display(110,382);
      if(text_27_1.check()){
        bgms[2].stop();
        bgm1 = 0;
        }
      break;
  }
  
  imageMode(CENTER);
  image(helperImg,70,400,70,70);
}

function stage_28(){ //카메라
  imageMode(CENTER);
  cameraAction();
  moveTime = 0;
  startFrame = 0;
}

function stage_29(){
  //console.log(moveTime);
  //if (!startFrame) startFrame = frameCount; // 시작 프레임 기록

  background(0);
  textFont(classFont);
  fill(88,235,255)
  textAlign(CENTER);
  textSize(20)
  text('1년 후 지구',width/2,50);

  imageMode(CENTER);

  if (moveTime > 0) {
    fill(0);
    rect(0,0,720,480);
  }

  if (moveTime > 30) {
    fill(0);
    rect(0,0,720,480);
    fill(88,235,255);
    text('1년 후 지구',width/2,50);
    image(toons[4], 360, 240, 400*0.8, 300*0.8);
  }
  if (moveTime > 100) {
    fill(0);
    rect(0,0,720,480);
    fill(88,235,255);
    text('1년 후 지구',width/2,50);
    image(toons[5], 360, 240, 300*0.8, 390*0.8); // 1초 후 (60프레임)
  }
  if (moveTime > 170) {
    fill(0);
    rect(0,0,720,480);
    fill(88,235,255);
    text('1년 후 지구',width/2,50);
    image(toons[6], 360, 240, 200*0.8, 360*0.8); // 2초 후
  }
  if (moveTime > 240) {
    fill(0);
    rect(0,0,720,480);
    fill(88,235,255);
    text('1년 후 지구',width/2,50);
    image(toons[7], 360, 240, 240*0.8, 300*0.8); // 3초 후
  }

  if (moveTime > 310) { // 마지막 이미지 이후
    imageMode(CORNER);
    image(backgroundImgs[10], 0, 0, 720, 480);

    textSetting(88, 235, 255, classFont);
    text_29_0.speedUp();
    text_29_0.update();
    text_29_0.display(110, 385);

    textAlign(CENTER);
    textSize(40);
    text('MISSION COMPLETE', width / 2, height * 2 / 5);
  }

  if (moveTime > 500) {
    moveTime = 0;
    startMillis = millis();
    stage = 30;
    //stageStartFrame = null; // 다음 스테이지를 위해 초기화
  }
  moveTime++;
}

function stage_30(){
  imageMode(CORNER);

  bbi4cut();

  image(backgroundImgs[11],0,0,720,480);

  if (millis()-startMillis>30000) {
    stage = 600;
  } else {
    fill(255);
    textSize(40);
    textAlign(CENTER,CENTER);
    textFont(classFont);
    text(30-Math.floor(moveTime/20),660,50);
  }


  // if(moveTime>600){
  //   stage = 500;
  // } else {
  //   fill(255);
  //   textSize(40);
  //   textAlign(CENTER,CENTER);
  //   textFont(classFont);
  //   text(30-Math.floor(moveTime/20),660,50);
  // }
  moveTime++;  
}

function stage_101(){ //불시착 행성
  imageMode(CORNER);
  image(backgroundImgs[3],0,0,720,480);

  textSetting(255,100,100,mapoFont);

  imageMode(CENTER);
  image(AlienImgs[20],360,300,400,300);

  if(bgm2 == 0) {
    bgms[4].play();
    bgms[4].setLoop(true);
    bgm2++;
  }
  text_101_0.update();
  text_101_0.display(110,382);
  if(text_101_0.check()){
    bgms[4].stop();
    bgm2 = 0;
    }

  setTimeout(()=>{ //왜 깜빡이지
    background(0);
    setTimeout(()=>{
      if(bgm1 == 0) {
        bgms[5].play();
        bgm1++;
      }
      stage = 500;
    },1000)
  },3000)

  bgm1 = 0
}

function stage_200(){
  imageMode(CORNER);
  image(backgroundImgs[5],0,0,720,480);

  imageMode(CENTER);
  image(AlienImgs[19],360,300,540,360);

  textSetting(255,100,100,mapoFont)
  if(bgm1 == 0) {
    bgms[4].play();
    bgms[4].setLoop(true);
    bgm1++;
  }
  text_200_0.update();
  text_200_0.display(110,382); 
  if(text_200_0.check()){
    bgms[4].stop();
    bgm1 = 0;
    }
}

function stage_201(){
  imageMode(CORNER);
  rectMode(CORNER);
  fill(0);

  rect(0,0,720,480);

  if(moveTime<90){
    image(backgroundImgs[9],0,0,720,480);
  } else if(moveTime<130){
    image(backgroundImgs[9],0,0-(moveTime-90)*12,720,480);
  } else {
    whipAlien();

    textSetting(255,100,100,mapoFont)

    if(bgm1 == 0) {
      bgms[4].play();
      bgms[4].setLoop(true);
      bgm1++;
    }
    text_201_0.update();
    text_201_0.display(110,382); 
    if(text_200_0.check()){
      bgms[4].stop();
      bgm1 = 0;
      }
    
  }
  moveTime++;
}

function stage_300(){
  imageMode(CORNER);
  image(backgroundImgs[4],0,0,720,480);

  whipAlien();

  textSetting5(57, 252, 3, alienFont);

  if(bgm1 == 0) {
    bgms[4].play();
    bgms[4].setLoop(true);
    bgm1++;
  }
  text_300_0.update();
  text_300_0.display(110,382);
  if(text_03_4.check()){
    bgms[4].stop();
    //bgm1 = 0;
    }
      
}

function stage_500() {
  fill(0);
  rectMode(CORNER);
  rect(0,0,720,480);

  fill('#58ebff')

  push();
  textSize(50);
  textFont(classFont);
  textAlign(CENTER);
  text('GAME OVER',360,240);
  pop();

  // textSize(5);
  // textFont(classFont);
  //text('유현서 여기 잠들다... ㅆ...',680,460);
  //text('현서야 여기서 잠들면 입돌아가 일어나..',680,470);
}

function stage_600() {
  fill(0);
  rectMode(CORNER);
  rect(0,0,720,480);

  fill('#58ebff')

  push();
  textSize(50);
  textFont(classFont);
  textAlign(CENTER);
  text('THE END',360,240);
  pop();
}

function onMove(time) {
  fill(0);
  rectMode(CORNER);
  rect(0,0,720,480);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  textFont(mapoFont);

  text_onMove.onMove();
  text_onMove.update();
  text_onMove.noCursor();
  text_onMove.display(360,240);

  moveTime++;

  if (moveTime > time) {
    startFrame = frameCount;
    moveTime = 0;
    textStage = 0;
    stage++;
  }
}

function onMove_UFO() {
  if (moveTime > 0) {
    push();
    translate(300+moveTime,280);
    rotate(radians(5*moveTime));
    imageMode(CENTER);
    image(UFOImg,0,0,50,50);
    pop();
  }
}

function onMove_HELPER() {
  if (moveTime > 0) {
    push();
    translate(300+moveTime,280);
    rotate(radians(5*moveTime));
    imageMode(CENTER);
    image(helperImg,0,0,30,30);
    pop();
  }
}

function textSetting(r,g,b,font) {
  noStroke();
  fill(r,g,b,100);
  rectMode(CENTER);
  rect(365,405,600,80,20);
  
  fill(0,200);
  rect(360,400,600,80,20);

  fill(r,g,b);
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont(font);
}


function textSetting2(r,g,b,font) {
  rectMode(CENTER);
  fill(0, 200);
  stroke(r,g,b);
  strokeWeight(5);
  rect(360, 130, 580, 80, 15, 15, 15, 15);
  fill(r,g,b);
  triangle(460, 170, 495, 170, 470, 200);

  noStroke();
  fill(r,g,b);
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont(font);
}

function textSetting3(r,g,b,font) {
  rectMode(CENTER);
  fill(0, 200);
  stroke(r,g,b);
  strokeWeight(5);
  rect(360, 95, 580, 80, 15, 15, 15, 15);
  fill(r,g,b);
  triangle(270, 140, 305, 140, 280, 170);

  noStroke();
  fill(r,g,b);
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont(font);
}

function textSetting4(r,g,b,font) {
  rectMode(CENTER);
  fill(0, 200);
  stroke(r,g,b);
  strokeWeight(5);
  rect(360, 130, 580, 80, 15, 15, 15, 15);


  noStroke();
  fill(r,g,b);
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont(font);
}

function textSetting5(r,g,b,font) {
  rectMode(CENTER);
  fill(0, 200);
  stroke(r,g,b);
  strokeWeight(5);
  rect(365,405,600,80,15);
  
  fill(0,200);
  rect(360,400,600,80,15);

  noStroke();
  fill(r,g,b);
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont(font);
}

function clickText(message,x,y,startFrame) {
  // fill(0,230);
  // rectMode(CENTER,CENTER);
  // rect(x,y+2,message.length*15-60,30,20);

  if ((frameCount - startFrame%50)%50<40) {
    fill(255,100);
    textSize(15);
    textAlign(CENTER,CENTER);
    textFont(classFont);
    text(message,x,y);
  }
}

function cutScene() {
  if (30 < moveTime && moveTime < 60) {
    let x = 610/900*(moveTime-60)**2;
    fill(255);
    imageMode(CENTER);
    image(toons[0],360-x,240,480,320);
    //rect(120-x,80,480,320);
  } else if (moveTime >= 60) {
    fill(255);
    imageMode(CENTER);
    image(toons[0],360,240,480,320)
    //rect(120,80,480,320);
  }

  if (120 < moveTime && moveTime < 150) {
    let x = -610/900*(moveTime-150)**2;
    fill(255);
    imageMode(CENTER);
    image(toons[1],360-x,240,480,320);
    //rect(120-x,80,480,320);
  } else if (moveTime >= 150) {
    fill(255);
    imageMode(CENTER);
    image(toons[1],360,240,480,320);
    //rect(120,80,480,320);
  }

  if (210 < moveTime && moveTime < 240) {
    let x = 610/900*(moveTime-240)**2;
    fill(255);
    imageMode(CENTER);
    image(toons[2],360-x,240,480,320);
    //rect(120-x,80,480,320);
  } else if (moveTime >= 240) {
    fill(255);
    imageMode(CENTER);
    image(toons[2],360,240,480,320);
    //rect(120,80,480,320);
  }

  if (moveTime > 300 && moveTime < 330) {
    let x = -610/900*(moveTime-330)**2;
    fill(255);
    imageMode(CENTER);
    image(toons[3],360-x,240,480,320);
    //rect(120-x,80,480,320);
  } else if (moveTime >= 330) {
    fill(255);
    imageMode(CENTER);
    image(toons[3],360,240,480,320);
    //rect(120,80,480,320);
  }
}

function drawLetter() {
  fill(242, 229, 201);
  rectMode(CENTER);
  stroke(0);
  rect(0,0,100,50);

  imageMode(CENTER);
  image(letterPaperImg,0,-10,84,25);

  fill(242, 229, 201);
  triangle(-50,-25,-50,25,0,5);
  triangle(50,-25,50,25,0,5);
  beginShape();
  vertex(-50,25);
  vertex(-47.5,20);
  vertex(-6,0);
  vertex(6,0);
  vertex(47.5,20);
  vertex(50,25);
  endShape(CLOSE);
}

function caesarCreate() {
  caesarBoxes.push({
    x: 470,
    y: 200,
    value: "r"
   });
   caesarBoxes.push({
    x: 520,
    y: 200,
    value: ""
   });
   caesarBoxes.push({
    x: 570,
    y: 200,
    value: ""
   });
   caesarBoxes.push({
    x: 470,
    y: 300,
    value: ""
   });
   caesarBoxes.push({
    x: 520,
    y: 300,
    value: ""
   });
   caesarBoxes.push({
    x: 570,
    y: 300,
    value: ""
   });
   caesarBoxes.push({
    x: 620,
    y: 300,
    value: "r"
   });
   caesarBoxes.push({
    x: 670,
    y: 300,
    value: ""
   });
}

function caesar() {
  for (let i=0; i<caesarBoxes.length; i++) {
    let box = caesarBoxes[i];

    if (caesarStage == 1 || i === caesarActivebox) fill(200,255,200);
    else fill(255);

    // 칸 그리기
    stroke(0);
    rectMode(CORNER);
    rect(box.x, box.y, 40, 40);

    // 칸의 텍스트 출력
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text(box.value, box.x+20, box.y+15);
  }

  if (caesarStage == 1) caesarStage = 2;
}

function caesarAnswerCheck() { // 카이사르 답 확인
  for (let i=0; i<caesarBoxes.length; i++) {
    if (caesarBoxes[i].value != caesarAnswer[i]) break;
    if (i==caesarBoxes.length-1) {
      // fill(255);
      // textSize(50);
      // text('정답', 600,100);
      caesarStage = 1;
      textStage = 0;
    }
  }
}

function drawDial() {
  if (isLocked) {
    fill(128,255,0);
    ellipse(240,240,415);
  }

  fill(255);
  ellipse(240,240,400);

  //바깥원
  push();
  translate(240,240);
  rotate(out_angle);
  for (let i=0; i<26; i++) {
    rotate(PI/13);
    line(0,0,0,-200);
  }
  pop();

  fill(100);
  ellipse(240,240,300);

  fill(255);
  ellipse(240,240,296);

  
  push();
  translate(240,240);
  rotate(out_angle);

  // push();

  let a = 1;
  while (1) {
    if (angle < -PI+PI*a/13) {
      in_angle = -PI+PI*(a-1)/13;
      //rotate(in_angle);
      break;
    } else a++;
  }

  if (a == 5) {
    isLocked = true;
    if(bgm1 == 0) {
      bgms[3].play();
      bgm1++;
    }
  }
  push(); //
  rotate(in_angle);//
  for (let i = 0; i < 26; i++) {
    line(0,0,0,-148);
    rotate(PI/26);

    let letter = String.fromCharCode(97 + i);
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text(letter, 0, -130); 
  
    rotate(PI / 26);
  }

  pop();

  push();//
  rotate(PI*17/13);//
  for(let i = 0; i<26; i++){//
    rotate(PI/26);//
    let letter = String.fromCharCode(97 + i);//
    if (alienCode[letter]) { // 
      image(alienCode[letter], -15, -190, 28, 35); // 
    }//
    rotate(PI/26);//
  }//
  pop();//

  fill(255);
  ellipse(0,0,200,200);

  pop();

  imageMode(CENTER);
  image(arrowImg,240,240,210,115);

  fill(150);
  ellipse(240,240,50,50);
}

function doTheDance(){
  push();
  rectMode(CORNER);
  imageMode(CORNER);
  fill(255); // 반투명 회색 배경

  for (let i=0; i<3; i++) {
    rect(470+i*50, 150, 40, 40);
    image(alienCode[caesarAnswer[i]],477+i*50,152,28,35);
  }

  for (let i=0; i<5; i++) {
    rect(470+i*50, 250, 40, 40);
    image(alienCode[caesarAnswer[i+3]],477+i*50,252,28,35);
  }

  pop();
}

function wait(time) {
  let startTime = millis();
  while (millis() - startTime < time) { // 1초동안 기다리기
  }
}

function planetArray() { // 행성들 위치와 크기 정보 담고 있는 배열
  planetInfo.push({ // 0
    x: -300,
    y: 100,
    size: 80,
    answer: false
  });
  planetInfo.push({
    x: 10,
    y: 90,
    size: 70,
    answer: false
  });
  planetInfo.push({
    x: 450,
    y: 150,
    size: 90,
    answer: false
  });
  planetInfo.push({
    x: 600,
    y: 80,
    size: 60,
    answer: false
  });
  planetInfo.push({
    x: 850,
    y: 140,
    size: 80,
    answer: false
  });
  planetInfo.push({
    x: 950,
    y: 110,
    size: 50,
    answer: false
  });
  planetInfo.push({ // 6
    x: -250,
    y: 180,
    size: 60,
    answer: false
  });
  planetInfo.push({
    x: -110,
    y: 200,
    size: 80,
    answer: false
  });
  planetInfo.push({
    x: 150,
    y: 170,
    size: 90,
    answer: false
  })
  planetInfo.push({
    x: 280,
    y: 350,
    size: 60,
    answer: false
  })
  planetInfo.push({ // 10
    x: -280,
    y: 350,
    size: 60,
    answer: true
  })
  planetInfo.push({
    x: -50,
    y: 340,
    size: 80,
    answer: false
  })
  planetInfo.push({
    x: 490,
    y: 350,
    size: 80,
    answer: false
  })
  planetInfo.push({
    x: 680,
    y: 410,
    size: 50,
    answer: false
  })
  planetInfo.push({
    x: 890,
    y: 330,
    size: 70,
    answer: false
  })
}

function planetMouseOver() { // 마우스가 행성 위에 있을때
  for (let planet of planetInfo) {
    if (dist(360, 240, planet.x+planetVarX, planet.y+planetVarY)<=planet.size/2+25) {
      fill(255,50);
      ellipse(planet.x,planet.y,planet.size+6);
      ellipse(planet.x,planet.y,planet.size+12);
    }
  }
}

function planetAnswerCheck() {
  for (let i=0; i<planetInfo.length; i++) {
    if (dist(360, 240, planetInfo[i].x+planetVarX, planetInfo[i].y+planetVarY)<=planetInfo[i].size/2+25) {
      planetChoosed = i;
      moveTime = 0;
    }
  }
}

function drawAlien(x,y,r,size) { // 외계인 그리기 // 180,300
  push();
  translate(x,y);
  rotate(radians(r));
  scale(size);
  imageMode(CENTER);
  image(AlienImgs[2],0,0,225,300); // 외계인 불러오기

  for (let i=10; i<12; i++) {
    if (dressPieces[i].locked) {
      push();
      translate(dressTargets[i].x,dressTargets[i].y);
      rotate(radians(180));
      image(dressImgs[i],0,0,dressTargets[i].sizeX,dressTargets[i].sizeY);
      pop();
    }
  }

  for (let i=0; i<dressPieces.length-2; i++) {
    if (dressTargets[i].locked) { // 아이템이 잠겨있다면 = 착용된 상태라면 외계인 위에 아이템을 표시한다
      image(dressImgs[i],dressTargets[i].x,dressTargets[i].y,dressTargets[i].sizeX,dressTargets[i].sizeY);
    }
  }

  pop();
}

function dressArray() {
  dressTargets.push({
    x: 210-180, // 착용된 아이템 위치
    y: 250-300,
    sizeX: 60, // 착용된 아이템 크기
    sizeY: 60,
    kind: "watch",
    locked: false
  });
  dressTargets.push({
    x: 130-180,
    y: 330-300,
    sizeX: 60,
    sizeY: 60,
    kind: "cake",
    locked: false
  });
  dressTargets.push({
    x: 180-180,
    y: 220-300,
    sizeX: 60,
    sizeY: 60,
    kind: "flower",
    locked: false
  });
  dressTargets.push({
    x: 220-180,
    y: 310-300,
    sizeX: 30,
    sizeY: 30,
    kind: "hat",
    locked: false
  });
  dressTargets.push({
    x: 130-180,
    y: 260-300,
    sizeX: 70,
    sizeY: 70,
    kind: "necklace",
    locked: false
  });
  dressTargets.push({
    x: 170-180,
    y: 400-300,
    sizeX: 350,
    sizeY: 130,
    kind: "skirt",
    locked: false
  });
  dressTargets.push({
    x: 170-180,
    y: 290-300,
    sizeX: 30,
    sizeY: 40,
    kind: "pizza",
    locked: false
  });
  dressTargets.push({
    x: 90-180,
    y: 190-300,
    sizeX: 60,
    sizeY: 50,
    kind: "ribbon",
    locked: false
  });
  dressTargets.push({
    x: 200-180,
    y: 390-300,
    sizeX: 220,
    sizeY: 70,
    kind: "scarf",
    locked: false
  });
  dressTargets.push({
    x: 170-180,
    y: 260-300,
    sizeX: 130,
    sizeY: 40,
    kind: "sunglasses",
    locked: false
  });
  dressTargets.push({
    x: 165-180,
    y: 160-300,
    sizeX: 40,
    sizeY: 60,
    kind: "sock",
    locked: false
  });
  dressTargets.push({
    x: 170-180,
    y: 160-300,
    sizeX: 200,
    sizeY: 150,
    kind: "pants",
    locked: false
  });


  dressPieces.push({
    x: 440, // 선반 위 아이템 위치
    y: 100,
    returnX: 430, // 나중에 선반으로 돌아가기 위해 저장해둔 위치
    returnY: 100,
    sizeX: 60, // 선반 위 아이템 크기
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "watch",
    locked: false
  });
  dressPieces.push({
    x: 545,
    y: 100,
    returnX: 545,
    returnY: 100,
    sizeX: 60,
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "cake",
    locked: false
  });
  dressPieces.push({
    x: 650,
    y: 100,
    returnX: 650,
    returnY: 100,
    sizeX: 60,
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "flower",
    locked: false
  });
  dressPieces.push({
    x: 440,
    y: 200,
    returnX: 440,
    returnY: 200,
    sizeX: 60,
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "hat",
    locked: false
  });
  dressPieces.push({
    x: 545,
    y: 200,
    returnX: 545,
    returnY: 200,
    sizeX: 60,
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "necklace",
    locked: false
  });
  dressPieces.push({
    x: 650,
    y: 200,
    returnX: 650,
    returnY: 200,
    sizeX: 80,
    sizeY: 60,
    rsizeX: 80,
    rsizeY: 60,
    kind: "skirt",
    locked: false
  });
  dressPieces.push({
    x: 440,
    y: 300,
    returnX: 440,
    returnY: 300,
    sizeX: 50,
    sizeY: 60,
    rsizeX: 50,
    rsizeY: 60,
    kind: "pizza",
    locked: false
  });
  dressPieces.push({
    x: 545,
    y: 300,
    returnX: 545,
    returnY: 300,
    sizeX: 60,
    sizeY: 50,
    rsizeX: 60,
    rsizeY: 50,
    kind: "ribbon",
    locked: false
  });
  dressPieces.push({
    x: 640,
    y: 300,
    returnX: 640,
    returnY: 300,
    sizeX: 90,
    sizeY: 40,
    rsizeX: 90,
    rsizeY: 40,
    kind: "scarf",
    locked: false
  });
  dressPieces.push({
    x: 450,
    y: 400,
    returnX: 450,
    returnY: 400,
    sizeX: 80,
    sizeY: 20,
    rsizeX: 80,
    rsizeY: 20,
    kind: "sunglasses",
    locked: false
  });
  dressPieces.push({
    x: 545,
    y: 400,
    returnX: 545,
    returnY: 400,
    sizeX: 40,
    sizeY: 60,
    rsizeX: 40,
    rsizeY: 60,
    kind: "sock",
    locked: false
  });
  dressPieces.push({
    x: 640, 
    y: 400,
    returnX: 640,
    returnY: 400,
    sizeX: 60,
    sizeY: 60,
    rsizeX: 60,
    rsizeY: 60,
    kind: "pants",
    locked: false
  });
}

function drawDress() {
  // 선반 그리기
  push();
  noStroke();
  rectMode(CENTER);
  fill(117, 70, 20);
  rect(540, 250, 340, 440);
  fill(97, 60, 15);
  rect(540, 100, 300, 80);
  rect(540, 200, 300, 80);
  rect(540, 300, 300, 80);
  rect(540, 400, 300, 80);
  pop();

  imageMode(CENTER);

  //선반 위 아이템 그리기
  for (let i=0; i<dressPieces.length-2; i++) {
    if (!dressPieces[i].locked) {
      image(dressImgs[i],dressPieces[i].x,dressPieces[i].y,dressPieces[i].sizeX,dressPieces[i].sizeY);
    }
  }

  for (let i=10; i<12; i++) {
    if (!dressPieces[i].locked) {
      image(dressImgs[i],dressPieces[i].x,dressPieces[i].y,dressPieces[i].sizeX,dressPieces[i].sizeY);
    }
  }

  imageMode(CORNER);
}

function whipAlien(){
  
  let numSegments = 30; // 채찍의 선분 개수
  let segmentLength = 15; // 각 선분의 길이
  let fixedX1 = 385, fixedY1 = 260; // 첫 번째 고정된 점의 좌표
  let fixedX2 = 335, fixedY2 = 260; // 두 번째 고정된 점의 좌표

  // 초기 첫 번째 선분 좌표와 각도 설정
  for (let i = 0; i < numSegments; i++) {
    wx1[i] = fixedX1;
    wy1[i] = fixedY1 + i * segmentLength; // 아래로 쭉 이어진 상태
    wAngle1[i] = -PI / 4; // -45도 기준으로 시작

    wx2[i] = fixedX2;
    wy2[i] = fixedY2 + i * segmentLength; // 두 번째 선분도 아래로 이어진 상태
    wAngle2[i] = -3 * PI / 4; // -135도 기준으로 시작
  }

  stroke(45, 128, 28); // 연두색 선
  strokeWeight(7);

  whipTime += deltaTime / 1000; // 초 단위로 시간 증가

  // 각 선분의 움직임 계산
  for (let i = 0; i < numSegments; i++) {
    let offset = i * 0.15; // 선분마다 시간 지연
    let wave = sin(whipTime * 4 - offset) * PI; // 빠르고 큰 파동

    // 첫 번째 선분의 각도 업데이트
    wave *= pow((i + 1) / numSegments, 1.2); // 끝으로 갈수록 진폭 증폭
    wAngle1[i] = -PI / 4 + wave; // -45도에서 시작하여 파동 효과 적용

    // 두 번째 선분의 각도 업데이트
    wAngle2[i] = -3 * PI / 4 + wave; // -135도에서 시작하여 파동 효과 적용
  }

  // 첫 번째 선분의 위치 업데이트
  for (let i = 1; i < numSegments; i++) {
    wx1[i] = wx1[i - 1] + cos(wAngle1[i]) * segmentLength;
    wy1[i] = wy1[i - 1] + sin(wAngle1[i]) * segmentLength;
  }

  // 두 번째 선분의 위치 업데이트
  for (let i = 1; i < numSegments; i++) {
    wx2[i] = wx2[i - 1] + cos(wAngle2[i]) * segmentLength;
    wy2[i] = wy2[i - 1] + sin(wAngle2[i]) * segmentLength;
  }

  // 첫 번째 선분은 고정된 점에서 시작
  wx1[0] = fixedX1;
  wy1[0] = fixedY1;

  // 두 번째 선분도 고정된 점에서 시작
  wx2[0] = fixedX2;
  wy2[0] = fixedY2;

  // 첫 번째 채찍 그리기
  for (let i = 0; i < numSegments - 1; i++) {
    line(wx1[i], wy1[i], wx1[i + 1], wy1[i + 1]);
  }

  // 두 번째 채찍 그리기
  for (let i = 0; i < numSegments - 1; i++) {
    line(wx2[i], wy2[i], wx2[i + 1], wy2[i + 1]);
  }

  // 채찍 끝에 동그라미 추가
  fill(45, 128, 28); // 초록색 동그라미
  noStroke();
  ellipse(wx1[numSegments - 1], wy1[numSegments - 1], 15); // 첫 번째 끝점에 동그라미
  ellipse(wx2[numSegments - 1], wy2[numSegments - 1], 15); // 두 번째 끝점에 동그라미

  imageMode(CENTER);
  
  image(AlienImgs[14], 365, 340, 577, 433); // 이미지 크기 조절하여 그리기
}

function hunt(){
  switch(huntStage) {
    case 0:
      huntStage_1_0(); // stage 1
      break;
    case 1:
      huntStage_1_1(); // 설명
      break;
    case 2:
      huntStage_1(); // 게임
      break;
    case 3:
      huntStage_2_0();
      break;
    case 4:
      huntStage_2_1();
      break;
    case 5:
      huntStage_2();
      break;
    case 6:
      huntStage_3_0();
      break;
    case 7:
      huntStage_3_1();
      break;
    case 8:
      huntStage_3();
      break;
    case 9:
      startFrame = frameCount;
      textStage = 0;
      stage = 19; // 끝
      break;
    case 10:
      startFrame = frameCount;
      stage = 500; // 실패
      break;
  }
}

function huntStage_1_0() {
  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  fill(87,234,255);
  textSize(50);
  textAlign(CENTER);
  textFont(classFont);

  text_18_0.update();
  text_18_0.noCursor();
  text_18_0.display(360,240);

  if(moveTime>120){
    moveTime = 0;
    huntStage = 1;
  }

  moveTime++

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_1_1(){

  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  imageMode(CENTER);
  image(guides[0],360,185,450,300);

  // image(backgroundImgs[6],0,0,720,480);
  // under.display();
  // hunter.display();

  // fill(0,100);
  // rectMode(CENTER);
  // rect(360,240,720,480);

  textSetting(146,200,81,mapoFont);

  text_18_1.update();
  text_18_1.display(110,395);

  imageMode(CENTER);
  image(helperImg,70,400,70,70);



  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_1(){
  imageMode(CORNER);
  image(backgroundImgs[6],0,0,720,480);

  stageFrame++;

  under.display(); // 언더바나와라뚝딱
  under.updateGauge();
  under.portrait(1);

  hunter.display();
  hunter.move();

  if(!huntStart){ // 동물 한 번만 나오도록 불리언
    for(let i=0; i<15; i++){ // 동물스폰
      rabbits[i] = new animal();
    }
    huntStart = true;
  }

  for(let i=rabbits.length-1; i>=0; i--){ 
    rabbits[i].display();
    rabbits[i].move();
    rabbits[i].catch_1(hunter.x,hunter.y,hunter.r);
    if(rabbits[i].caught){ // 잡히면 제거
      rabbits.splice(i,1);
      if(bgm1 == 0) {
        bgms[9].play();
        bgm1++;
      }
      bgm1 = 0;
    }
  }

  huntTimeAttack();
}

function huntStage_2_0() {
  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  fill(87,234,255);
  textSize(50);
  textAlign(CENTER);
  textFont(classFont);

  text_18_2.update();
  text_18_2.noCursor();
  text_18_2.display(360,240);

  if(moveTime>120){
    moveTime = 0;
    huntStage = 4;
  }

  moveTime++

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_2_1() {

  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  imageMode(CENTER);
  image(guides[1],360,185,450,300);
  // image(backgroundImgs[7],0,0,720,480);

  // slingShot.display();
  // under.display();

  fill(0,100);
  rectMode(CENTER);
  rect(360,240,720,480);

  textSetting(146,200,81,mapoFont);

  text_18_3.update();
  text_18_3.display(110,395);

  imageMode(CENTER);
  image(helperImg,70,400,70,70);

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_2(){
  push();
  angleMode(DEGREES);
  imageMode(CORNER);
  image(backgroundImgs[7],0,0,720,480);

  stageFrame++;
  slingShot.display();

  under.display();
  under.updateGauge();
  under.portrait(2);

  if(!huntStart){ // 동물 한 번만 나오도록 불리언
    level = 2;
    for(let i=0; i<8; i++){ // 동물스폰
      sheeps[i] = new animal()
    }
    huntStart = true;
  }

  for (let i=sheeps.length-1; i>=0; i--){
    sheeps[i].display();
    sheeps[i].move();
    sheeps[i].catch_2();
    if(sheeps[i].caught){ //잡히면 제거
      sheeps.splice(i,1);
      if(bgm1 == 0) {
        bgms[10].play();
        bgm1++;
      }
      bgm1 = 0;
    }
  }

  reticle();// 조준선 ㄱ그리기
  reload();

  for (let i=bullets.length-1; i>=0; i--){
    bullets[i].display();
    bullets[i].flying();
    if(bullets[i].outScreen()){ //나가거나 맞으면 총알 사라짐
      bullets.splice(i,1);
    }
  }

  huntTimeAttack();
  pop();
}

function huntStage_3_0() {
  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  fill(87,234,255);
  textSize(50);
  textAlign(CENTER);
  textFont(classFont);

  text_18_4.update();
  text_18_4.noCursor();
  text_18_4.display(360,240);

  if(moveTime>120){
    moveTime = 0;
    huntStage = 7;
  }

  moveTime++

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_3_1() {

  fill(0);
  rectMode(CENTER);
  rect(360,240,720,480);

  imageMode(CENTER);
  image(guides[2],360,185,450,300);

  // image(backgroundImgs[8],0,0,720,480);
  // under.display();

  fill(0,100);
  rectMode(CENTER);
  rect(360,240,720,480);

  textSetting(146,200,81,mapoFont);

  text_18_5.update();
  text_18_5.display(110,382);

  imageMode(CENTER);
  image(helperImg,70,400,70,70);

  clickText('[ 스페이스 바로 스킵 및 넘어가기 ]',600,460,startFrame);
}

function huntStage_3(){
  imageMode(CORNER);
  image(backgroundImgs[8],0,0,720,480);

  stageFrame++;
  under.display()
  under.updateGauge();
  under.portrait(3);

  if(!huntStart){ // 동물 한 번만 나오도록 불리언
    level = 3;
    for(let i=0; i<5; i++){ // 동물스폰
      hollans[i] = new animal()
    }
    huntStart = true;
  }
    for(let i=hollans.length-1; i>=0; i--){ 
      hollans[i].display();
      hollans[i].move();
      hollans[i].catch_3(mouseX, mouseY);
      if(hollans[i].caught){ // 잡히면 제거
        hollans.splice(i,1);
        if(bgm1 == 0) {
          bgms[11].play();
          bgm1++;
        }
        bgm1 = 0;
      }
  }
  net();

  huntTimeAttack();
}

function nextStage() {
  if (stageFrame == 1000 && huntStage == 2) huntStage++;
  else if (stageFrame == 1000 && huntStage == 5) huntStage++;
  //else if (stageFrame == 1000 && huntStage == 8) huntStage++;
  else if (huntStage == 2 && rabbits.length == 0 && stageFrame > 0) huntStage++;
  else if (huntStage == 5 && sheeps.length == 0 && stageFrame > 0) huntStage++;
  else if (huntStage == 8 && hollans.length == 0 && stageFrame > 0) huntStage++;

  if (huntStage == 8 && stageFrame >= 1000 && gauge < 550) huntStage = 10;
  
  if (gauge == 550) huntStage = 9;

  if(huntStage !== previousStage){
    huntStart = false; // 스테이지 변경시 초기화
    //rabbits = [];
    //sheeps = [];
    //hollans = [];
    startFrame = frameCount;
    stageFrame = 0
    previousStage = huntStage;
  }
}

function huntTimeAttack() {
  noStroke();
  fill(255);
  rectMode(CORNER);
  rect(160,30,400,15,15);

  fill(0,250,0,200);
  rect(160,30,400/1000*(1000-stageFrame),15,15);  
}

function getMouseVector(){ //벡터값 구하기
    let mouseXalt = mouseX - slingShot.x;
    let mouseYalt = mouseY - slingShot.y;
    let mouseDir = createVector(mouseXalt, mouseYalt);
    mouseDir.normalize();
    return mouseDir;
}

function reticle(){ //조준선
  noFill();
    strokeWeight(1.5);
    stroke(0, 100, 125, 125);
    ellipse(mouseX, mouseY, 20);
    stroke(80, 160, 200, 125);
    line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
    line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
    stroke(80, 160, 200, 125);
    line(slingShot.x, slingShot.y, mouseX, mouseY);
}

function net(){
  push();
  noCursor();
  translate(mouseX, mouseY);
  angleMode(RADIANS);
  for(let i = hollans.length-1; i>=0; i--){
    let catchTime = hollans[i].catchTime;
    let angleFill = map(catchTime, 0, 120, 0, TWO_PI);

    noStroke();

    fill(255,0,0);
    arc(0,0,30,30,0,angleFill,PIE);

    fill(255,255,0,150);
    ellipse(0,0,25);
    image(helperImg,0,0,20,20);
  }
  pop();
}

function reload(){
  if(!bulletTimer){
    bulletTime++;
    if(bulletTime>60/2){
      bulletTimer = true;
      bulletTime = 0;
    }
  }

}

function buildArray() {
  for (let i=0; i<10; i++) {
    build0[i] = Array(10);
    build1[i] = Array(10);
    build2[i] = Array(10);
  }

  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      build0[i][j] = 1;
      build1[i][j] = 1;
      build2[i][j] = 1;
    }
  }
}

function buildAnswerArray() {
  for (let i=0; i<10; i++) {
    buildAnswer0[i] = [];
    buildAnswer1[i] = [];
    buildAnswer2[i] = [];
  }

  buildAnswer0[0].push(0,1,1,1,1,1,1,1,1,0);
  buildAnswer0[1].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[2].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[3].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[4].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[5].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[6].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[7].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[8].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer0[9].push(0,1,1,1,1,1,1,1,1,0);

  buildAnswer1[0].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[1].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[2].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[3].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[4].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[5].push(1,1,1,1,1,1,1,1,1,1);
  buildAnswer1[6].push(0,1,1,1,1,1,1,1,1,0);
  buildAnswer1[7].push(0,0,1,1,1,1,1,1,0,0);
  buildAnswer1[8].push(0,0,0,1,1,1,1,0,0,0);
  buildAnswer1[9].push(0,0,0,0,1,1,0,0,0,0);

  buildAnswer2[0].push(0,1,1,1,1,1,1,1,1,1);
  buildAnswer2[1].push(0,1,1,1,1,1,1,1,1,1);
  buildAnswer2[2].push(0,1,1,1,0,0,0,1,1,1);
  buildAnswer2[3].push(0,1,1,1,0,0,0,1,1,1);
  buildAnswer2[4].push(0,1,1,1,0,0,0,1,1,1);
  buildAnswer2[5].push(1,1,1,1,1,0,0,1,1,1);
  buildAnswer2[6].push(0,1,1,1,0,0,0,1,1,1);
  buildAnswer2[7].push(0,0,1,0,0,0,0,1,1,1);
  buildAnswer2[8].push(0,0,0,0,0,0,0,0,1,0);
  buildAnswer2[9].push(0,0,0,0,0,0,0,0,0,0);
}

function buildTimeAttack() {
  if (buildTimeMove) {
    let time = 120000 - (millis() - buildStartTime);
    fill(255);
    rect(160,30,400,15,15);
    if(time>1){ //수정. 이거 없으면 0초 뒤에는 바가 뒤로 길어짐
    fill(0,250,0,200);
    rect(160,30,time/120000*400,15,15);
    }
  }
}

function buildTimeCheck() {
  let time = 120000 - (millis() - buildStartTime); //수정. 원래 150000이엇음. 왜?
  if (time < 1) {
    buildTimeMove = false;

    fill(255);
    textSize(30);
    textAlign(CENTER);
    text('실패',360,240);

    setTimeout(() => { //수정. 여기서 wait 쓰면 '실패'가 제대로 그려지지 않는 문제 발생
      stage = 300; 
    }, 1000);
  }
}

function buildDraw(build, buildAnswer) {
  fill(0,100);
  rectMode(CORNER);
  rect(0,400,800,200);

  let j = (buildHmoveX-458)/16;
  let i = (392-buildHmoveY)/16;

  if (j>=0 && j<10 && i>=0 && i<10) build[i][j] = 0;

  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      if (build[i][j] == 1) {
        noStroke();
        fill(250, 246, 40);
        rect(450+16*j,384-16*i,16,16); //594 720-594 = 126
      }
      if (buildAnswer[i][j] == 1) {
        noStroke();
        fill(150,150,150);
        rect(126+16*j,384-16*i,16,16);
      }
    }
  }
}

function buildMove() {
  imageMode(CENTER);
  image(helperImg, buildHmoveX, buildHmoveY, 16, 16);
}

function buildAnswerCheck(build, buildAnswer) {
  let check = 1;
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      if (build[i][j] != buildAnswer[i][j]) { // 정답이랑 다르면 check = 0 전부다 같다면 반복문이 끝났을 때 check = 1이겠죠
        check = 0;
        break;
      }
    }
  }
  if (check == 1) { // 정답이랑 전부다 같다면
    buildHmoveX = 410;///옮겨왓어요
    buildHmoveY = 392;///옮겨왓어요
    buildAnswerNum++;
    return true; // true를 리턴
  }
  else return false; // 다르다면 false를 리턴
}

function buildReset(build) { // 리셋하기
  build = Array(10);
  buildArray();
  buildHmoveX = 410;
  buildHmoveY = 392;
  buildStartTime -= 1000;
}

function cameraAction(){
  if(!cameraOn){
    
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); 
  
    handposeModel = ml5.handpose(video);   // Handpose 모델 모셔오기

    handposeModel.on('predict', function(results) {   // 모델에서 새 예측값 만들 때마다 results로 전달, predictions에 저장
      predictions = results;
    });
    
    cameraOn = true;
  }
  fill(50);
  rectMode(CORNER);
  rect(0,0,720,480);
  image(video, width/2, height/2, width*6/7, height*6/7); // 비디오 캔버스에 출력

  drawKeypoints(); // 그려라

  if(predictions.length > 0){
    const landmarks = predictions[0].landmarks;
    handleCaptures(landmarks);//감지 및 캡쳐 처리
  }

  if(photoStage<4){
    displayHints(); //미리보기
  }
}

//감지용 함수들
function drawKeypoints() { // 손에 키포인트 그리기
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      const [x, y, z] = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10, 10); // 각 키포인트에 점박기 이걸... 외계인스럽게 해도 될듯
    }
  }
}

function deodumi(landmarks){
  const palmBase = landmarks[0]; // 손바닥 중심
  const middleMCP = landmarks[9] //중지 관절
  const handSize = handSizeCalc(palmBase, middleMCP); //손크기ㅣ

  const indexStraight = fingerStraight(landmarks[8], landmarks[6], landmarks[5]) //검지 폇니 y좌표로 비교

  const fist = [12, 16, 20].every(index => {
    const fingerTip = landmarks[index];
    const distance = dist(fingerTip[0], fingerTip[1], palmBase[0], palmBase[1]);
    return distance < handSize*0.5 // 손크기의 50퍼면 주먹이겟지..
  })

  if (cameraTime>300){
    cameraTime = 0;
    return true;
  }else{
    cameraTime++;
  }

  return indexStraight && fist;
}

function vv(landmarks){
  const palmBase = landmarks[0]; // 손바닥 중심
  const middleMCP = landmarks[9]; // 중지 뿌리
  const handSize = handSizeCalc(palmBase, middleMCP);

  const indexStraight = fingerStraight(landmarks[8], landmarks[6], landmarks[5]); // 검지 쫙
  const middleStraight = fingerStraight(landmarks[12], landmarks[10], landmarks[9]) // 중지 쫙

  // 검지와 중지 사이의 거리가 적절히 먼지
  const fingerDist = dist(landmarks[8][0], landmarks[8][1], landmarks[12][0], landmarks[12][1],);
  const vShape = fingerDist > handSize * 0.4; //검지중지 벌어졋는지

  // 약지와 새끼가 접혀잇는지
  const fist = [16, 20].every((index) => {
    const fingerTip = landmarks[index];
    const distance = dist(fingerTip[0], fingerTip[1], palmBase[0], palmBase[1]);
    return distance < handSize * 0.5; // 손 크기의 30% 보다 작
  });

  if (cameraTime>300){
    cameraTime = 0;
    return true;
  }else{
    cameraTime++;
  }

  return indexStraight && middleStraight && vShape && fist;
}

function ddabong(landmarks){
  const palmBase = landmarks[0]; // 손바닥 중심
  const middleMCP = landmarks[9] //중지 관절
  const handSize = handSizeCalc(palmBase, middleMCP); //손크기ㅣ

  const thumbStraight = fingerStraight(landmarks[4], landmarks[3], landmarks[2]) //검지 폇니 y좌표로 비교

  const fist = [8, 12, 16, 20].every(index => {
    const fingerTip = landmarks[index];
    const distance = dist(fingerTip[0], fingerTip[1], palmBase[0], palmBase[1]);
    return distance < handSize*0.9 // 손크기의 50퍼면 주먹이겟지..
  })

  if (cameraTime>300){
    cameraTime = 0;
    return true;
  }else{
    cameraTime++;
  }

  return thumbStraight && fist;
}

function free(){
  if (cameraTime>60){
    return true;
  }else{
    fill(255);
    textSize(30);
    textAlign(CENTER,CENTER);
    textFont(classFont);
    text(6-Math.floor(cameraTime/10),360,50);
    cameraTime++;
  }
}

function handleCaptures(landmarks) {


  checkPhotoDone();

  if (photoStage >= gestures.length) return; // 모든 스테이지 완료 시 종료

  const currentGesture = gestures[photoStage]; // 현재 단계의 손동작


  if (!capture[currentGesture] && window[currentGesture](landmarks)) {
    capture[currentGesture] = get(0, 0, width, height); // 캡처 저장
    rectMode(CORNER);
    fill(0);
    rect(0,0,720,480);
    if(bgm1 == 0) {
      bgms[13].play();
      bgm1++;
    }
    bgm1 = 0;
    setTimeout(() => { //수정. 여기서 wait 쓰면 '실패'가 제대로 그려지지 않는 문제 발생
    }, 1000);

    console.log(`${currentGesture} detected and captured!`);
    cameraTime = 0;
    photoStage++; // 다음 단계로 이동
  }

}

function displayHints() {
  // 현재 스테이지 출력
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(`Current Stage: ${photoStage + 1} / ${gestures.length}`, width / 2, 30);
  //console.log(cameraTime)
  imageMode(CENTER)
  image(AlienImgs[15+photoStage],360,300,720*6/7,480*6/7);

}

function checkPhotoDone() {
  if (photoStage >= gestures.length) {
    cameraOn = false;
    stage = 29
  }
}

// 최적화용 함수들
function fingerStraight(tip, pip, mcp){
  return tip[1]<pip[1] && pip[1]<mcp[1];
}

function handSizeCalc(palmBase, middleMCP){
  return dist(palmBase[0], palmBase[1], middleMCP[0], middleMCP[1]);
}

function bbi4cut(){
    const positions = [
      [35, 20],   // 첫 번째 위치
      [305, 20],  // 두 번째 위치
      [35, 240],  // 세 번째 위치
      [305, 240]  // 네 번째 위치
    ];
  
    Object.values(capture).forEach((value, index) => {
      if (index < positions.length) { // 이미지가 네 개 이하인 경우만 실행
        const [x, y] = positions[index];
        image(value, x, y, 72 * 4.5, 48 * 4.5);
      }
    });
}

function keyPressed() {
  switch (stage) {
    case 1: // 컷신
      if (key == ' ') { // 스페이스바
        if (moveTime < 60) moveTime = 60;
        // else if (moveTime < 90) moveTime = 90;
        // else if (moveTime < 120) moveTime = 120;
        else if (moveTime < 150) moveTime = 150;
        // else if (moveTime < 180) moveTime = 180;
        // else if (moveTime < 210) moveTime = 210;
        else if (moveTime < 240) moveTime = 240;
        else if (moveTime < 330) moveTime = 330;
        else if (moveTime > 335) {
          startFrame = frameCount;
          moveTime = 0;
          stage = 2;
        }
      }
      break;
    case 2: // 편지
      if (key == ' ') {
        if (letterStage == 3 && !text_02.check()) text_02.complete();
        else if (letterStage == 3 && text_02.check()) {
          bgm1 = 0;
          startFrame = frameCount;
          moveTime = 0;
          stage = 3;
        }
      }
      break;
    case 3: // 삐빼삐 등장
      if (key == ' ') {
        if (textStage == 0 && !text_03_0.check()) text_03_0.complete();
        else if (textStage == 0 && text_03_0.check()) textStage = 1;
        else if (textStage == 1 && !text_03_1.check()) text_03_1.complete();
        else if (textStage == 1 && text_03_1.check()) textStage = 2;
        else if (textStage == 2 && !text_03_2.check()) text_03_2.complete();
        else if (textStage == 2 && text_03_2.check()) textStage = 3;
        else if (textStage == 3 && !text_03_3.check()) text_03_3.complete();
        else if (textStage == 3 && text_03_3.check()) textStage = 4;
        else if (textStage == 4 && !text_03_4.check()) text_03_4.complete();
        else if (textStage == 4 && text_03_4.check()) {
          bgm1 = 0;
          stage = 4;
        }
      }
      break;
    case 4:
      // 활성화된 칸에 한 글자 입력
      if (caesarActivebox !== -1) {
        // Backspace 키 처리
        if (keyCode === BACKSPACE) {
          caesarBoxes[caesarActivebox-1].value = " "; // 현재 칸 값 삭제
          caesarActivebox = (caesarActivebox - 2) % caesarBoxes.length;
        }
        // a~z 키만 허용
        else if (key >= 'a' && key <= 'z') {
          caesarBoxes[caesarActivebox].value = key; // 한 글자 저장
        }
        caesarActivebox = (caesarActivebox + 1) % caesarBoxes.length;
      }
      break;
    case 5:
      if (key == ' ') {
        if (textStage == 0 && !text_05_0.check()) text_05_0.complete();
        else if (textStage == 0 && text_05_0.check()) textStage = 1;
        else if (textStage == 1 && !text_05_1.check()) text_05_1.complete();
        else if (textStage == 1 && text_05_1.check()) textStage = 2;
        else if (textStage == 2 && !text_05_2.check()) text_05_2.complete();
        else if (textStage == 2 && text_05_2.check()) {
          startFrame = frameCount;
          stage = 6;
        }
      }
      break;
    case 6:
      if (key == ' ') planetAnswerCheck();
      break;
    case 8:
      if (key == ' ') {
        if (textStage == 0 && !text_07_1.check()) text_07_1.complete();
        else if (textStage == 0 && text_07_1.check()) textStage = 1;
        else if (textStage == 1 && !text_07_2.check()) text_07_2.complete();
        else if (textStage == 1 && text_07_2.check()) {
          moveTime = 0;
          stage = 9;
        }
      }
      break;
    case 10:
      if (key == ' ') {
        if (textStage == 0 && !text_10_0.check()) text_10_0.complete();
        else if (textStage == 0 && text_10_0.check()) textStage = 1;
        else if (textStage == 1 && !text_10_1.check()) text_10_1.complete();
        else if (textStage == 1 && text_10_1.check()) textStage = 2;
        else if (textStage == 2 && !text_10_2.check()) text_10_2.complete();
        else if (textStage == 2 && text_10_2.check()) {
          moveTime = 0;
          stage = 11;
        }
      }
      break;
    case 11:
      if (key == ' ') {
        // if (moveTime > 50 && moveTime < 150 && !text_11_0.check()) text_11_0.complete();
        // else if (moveTime > 50 && moveTime < 150 && text_11_0.check()) moveTime = 180;
        if (moveTime > 150 && moveTime < 200 && !text_11_1.check()) text_11_1.complete();
        else if (moveTime > 150 && moveTime < 200 && text_11_1.check()) moveTime = 200;
        else if (textStage == 0 && !text_11_2.check()) text_11_2.complete();
        else if (textStage == 0 && text_11_2.check()) textStage = 1;
        else if (textStage == 1 && !text_11_3.check()) text_11_3.complete();
        else if (textStage == 1 && text_11_3.check()) textStage = 2;
        else if (textStage == 2 && !text_11_4.check()) text_11_4.complete();
        else if (textStage == 2 && text_11_4.check()) {
          startFrame = frameCount;
          textStage = 0;
          moveTime = 0;
          stage = 12;
        }
      }
      break;
    case 12: // 옷입히기
      if (key == ' ') {
        startFrame = frameCount;
        stage = 13;
      }
      break;
    case 13: // 사정설명
      if (key == ' ') {
        if (textStage == 0 && !text_13_0.check()) text_13_0.complete();
        else if (textStage == 0 && text_13_0.check()) textStage = 2;
        // else if (textStage == 1 && !text_13_1.check()) text_13_1.complete();
        // else if (textStage == 1 && text_13_1.check()) textStage = 2;
        else if (textStage == 2 && !text_13_2.check()) text_13_2.complete();
        else if (textStage == 2 && text_13_2.check()) textStage = 3;
        else if (textStage == 3 && !text_13_3.check()) text_13_3.complete();
        else if (textStage == 3 && text_13_3.check()) textStage = 4;
        else if (textStage == 4 && !text_13_4.check()) text_13_4.complete();
        else if (textStage == 4 && text_13_4.check()) textStage = 5;
        else if (textStage == 5 && !text_13_5.check()) text_13_5.complete();
        else if (textStage == 5 && text_13_5.check()) textStage = 6;
        else if (textStage == 6 && !text_13_6.check()) text_13_6.complete();
        else if (textStage == 6 && text_13_6.check()) stage = 14;
      }
      break;
    case 14: // Yes/No
      if (keyCode == DOWN_ARROW && choice_00) choice_00 = false;
      if (keyCode == UP_ARROW && !choice_00) choice_00 = true;
      
      if (key == ' ') { // 스페이스바
        if (choice_00) {
          startFrame = frameCount;
          textStage = 0;
          stage = 15;
        }
        else stage = 200;
      }
      break;  
    case 15:
      if (key == ' ') {
        if (textStage == 0 && !text_15_0.check()) text_15_0.complete();
        else if (textStage == 0 && text_15_0.check()) textStage = 1;
        else if (textStage == 1 && !text_15_1.check()) text_15_1.complete();
        else if (textStage == 1 && text_15_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 16;
        }
      }
      break;
    case 16: // 삐용삐용 여왕 배고파
      if (key == ' ') {
        // if (textStage == 0 && !text_16_0.check()) text_16_0.complete();
        // else if (textStage == 0 && text_16_0.check()) textStage = 1;
        // else if (textStage == 1 && !text_16_1.check()) text_16_1.complete();
        // else if (textStage == 1 && text_16_1.check()) textStage = 2;
        if (textStage == 0 && !text_16_2.check()) text_16_2.complete();
        else if (textStage == 0 && text_16_2.check()) {
          startFrame = frameCount;
          textStage = 0;
          moveTime = 0;
          stage = 17;
        }
      }
      break;
    case 17: // 사냥 설명
      if (key == ' ') {
        if (textStage == 0 && !text_17_0.check()) text_17_0.complete();
        else if (textStage == 0 && text_17_0.check()) stage = 18;
      }
      break;
    case 18:
      if (key == ' ') {
        if (huntStage == 0 && !text_18_0.check()) text_18_0.complete();
        else if (huntStage == 0 && text_18_0.check()) huntStage++;
        else if (huntStage == 1 && !text_18_1.check()) text_18_1.complete();
        else if (huntStage == 1 && text_18_1.check()) huntStage++;
        //else if (huntStage == 1) huntStage++;
        else if (huntStage == 3 && !text_18_2.check()) text_18_2.complete();
        else if (huntStage == 3 && text_18_2.check()) huntStage++;
        else if (huntStage == 4 && !text_18_3.check()) text_18_3.complete();
        else if (huntStage == 4 && text_18_3.check()) huntStage++;
        //else if (huntStage == 4) huntStage++;
        else if (huntStage == 6 && !text_18_4.check()) text_18_4.complete();
        else if (huntStage == 6 && text_18_4.check()) huntStage++;
        else if (huntStage == 7 && !text_18_5.check()) text_18_5.complete();
        else if (huntStage == 7 && text_18_5.check()) huntStage++;
        //else if (huntStage == 7) huntStage++;
      }
      break;
    case 19:
      if (key == ' ') {
        if (textStage == 0 && !text_19_0.check()) text_19_0.complete();
        else if (textStage == 0 && text_19_0.check()) textStage = 1;
        else if (textStage == 1 && !text_19_1.check()) text_19_1.complete();
        else if (textStage == 1 && text_19_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 20;
        }
      }
      break;
    case 21:
      if (key == ' ') {
        if (textStage == 0 && !text_21_0.check()) text_21_0.complete();
        else if (textStage == 0 && text_21_0.check()) {
          stage = 22;
          buildStartTime = millis();
        }
      }
      break;
    case 22:
      if (keyCode === UP_ARROW) buildHmoveY -= 16;
      if (keyCode === DOWN_ARROW) buildHmoveY += 16; 
      if (keyCode === RIGHT_ARROW) buildHmoveX += 16;
      if (keyCode === LEFT_ARROW) buildHmoveX -= 16;
      if (key == 'x' && buildStage == 0) buildReset(build0); // x키 눌렀을 때 reset
      if (key == 'x' && buildStage == 1) buildReset(build0);
      if (key == 'x' && buildStage == 2) buildReset(build0); 
      break;
    case 23:
      if (key == ' ') {
        if (textStage == 0 && !text_23_0.check()) text_23_0.complete();
        else if (textStage == 0 && text_23_0.check()) textStage = 1;
        else if (textStage == 1 && !text_23_1.check()) text_23_1.complete();
        else if (textStage == 1 && text_23_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 24;
        }
      }
      break;
    case 24:
      if (key == ' ') {
        if (textStage == 0 && !text_24_0.check()) text_24_0.complete();
        else if (textStage == 0 && text_24_0.check()) textStage = 1;
        else if (textStage == 1 && !text_24_1.check()) text_24_1.complete();
        else if (textStage == 1 && text_24_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 25;
        }
      }
      break;
    case 26:
      if (key == ' ') {
        if (textStage == 0 && !text_26_0.check()) text_26_0.complete();
        else if (textStage == 0 && text_26_0.check()) textStage = 1;
        else if (textStage == 1 && !text_26_1.check()) text_26_1.complete();
        else if (textStage == 1 && text_26_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 27;
        }
      }
      break;
    case 27:
      if (key == ' ') {
        if (textStage == 0 && !text_27_0.check()) text_27_0.complete();
        else if (textStage == 0 && text_27_0.check()) textStage = 1;
        else if (textStage == 1 && !text_27_1.check()) text_27_1.complete();
        else if (textStage == 1 && text_27_1.check()) {
          textStage = 0;
          moveTime = 0;
          stage = 28;
        }
      }
      break;
    case 29:
      if (key == ' ') {
        if(!text_29_0.check()) text_29_0.complete();
        else if(text_29_0.check()) {
          moveTime = 0;
          startMillis = millis();
          stage = 30;
        }
      }
    case 101:
      if (key == ' ') {
        if (!text_101_0.check()) text_101_0.complete();
      }
      break;
    case 200:
      if (key == ' ') {
        if (!text_200_0.check()) {
          text_200_0.complete();
        }
        else if (text_200_0.check()){
          textStage = 0;
          stage = 201;
        }
      }
      break;
    case 201:
      if (key == ' ') {
        if (!text_201_0.check()) {
          text_201_0.complete();
        }
        else if (text_201_0.check()){
          moveTime = 0;
          stage = 17;
        }
      }      
      break;
    case 300:
      if (key == ' ') {
        if(!text_300_0.check()){
          text_300_0.complete();
        }
      else if (text_300_0.check()){
        moveTime = 0;
        bgm1 = 0;
        stage = 500;
        } 
      }
  }
}

function mouseClicked() {
  if (stage == 0 && ufo.r == 200) {
    startFrame = frameCount;
    stage = 1;
  }

  if (stage == 2 && letterStage == 0) {
    letterStage = 1;
    moveTime = 0;
  }

  if (stage == 4) {
    for (let i = 0; i < caesarBoxes.length; i++) {
      let box = caesarBoxes[i];
      if (
        mouseX > box.x &&
        mouseX < box.x + 40 &&
        mouseY > box.y &&
        mouseY < box.y + 40
      ) {
        caesarActivebox = i; // 클릭한 칸 활성화
        break;
      }
    }
  }

  if (stage == 18) {
    let mouseVector = getMouseVector();
    if(bulletTimer){ // 무한생성 방지
      let oneBullet = new Bullet(mouseVector.x, mouseVector.y);
      bullets.push(oneBullet);
      bulletTimer = false;
    }
  }
}

function mousePressed() {
  switch (stage) {
    case 4:
      if (!isLocked && dist(mouseX,mouseY,260,240)<100) isDragging_In = true;
      else if (150<dist(mouseX,mouseY,260,240) && dist(mouseX,mouseY,260,240)<250) isDragging_Out = true;
      break;

    case 12:
      for (let i=0; i<dressPieces.length; i++) {
        if (dist(mouseX, mouseY, dressPieces[i].x, dressPieces[i].y) < dressPieces[i].sizeX/2+5) { // 아이템 근처에서 마우스 클릭했을때
          if (!dressPieces[i].locked) { // 아이템이 선반 위에 있다면
            selectedPiece = dressPieces[i];
            break;
          } else { // 아이템이 착용된 상태라면
            dressTargets[i].locked = false;
            dressPieces[i].locked = false;
            dressPieces[i].x = dressPieces[i].returnX; // 선반 위로 돌아가기
            dressPieces[i].y = dressPieces[i].returnY;
            dressPieces[i].sizeX = dressPieces[i].rsizeX;
            dressPieces[i].sizeY = dressPieces[i].rsizeY;
          }
        }
      }
    case 25:
      if(handsOnDeodum){
        if(bgm1 == 0) {
          bgms[12].play();
          bgm1++;
        }
        bgm1 = 0;
        stage = 26;
      }
  }
}

function mouseDragged() {
  switch (stage) {
    case 4:
      if (isDragging_In && !isLocked) {
        let dx = mouseX - dialCenter.x;
        let dy = mouseY - dialCenter.y;
        angle = atan2(dy, dx);
      }
      if (isDragging_Out) {
        let dx = mouseX - dialCenter.x;
        let dy = mouseY - dialCenter.y;
        out_angle = atan2(dy, dx);
      }
      break;
    case 6:
      let mouseVarX = constrain(mouseX,0,720);
      let mouseVarY = constrain(mouseY,0,480);
      if (isDragging) planetVarX = constrain(planetControl[0] + (mouseVarX - planetControl[1]),-400,1560);
      if (isDragging) planetVarY = constrain(planetControl[2] + (mouseVarY - planetControl[3]),-500,500);
      break;
    case 12:
      if (selectedPiece) { // 선물주기에서 마우스를 누른 상태면 선물이 손에 들려있도록
        selectedPiece.x = mouseX;
        selectedPiece.y = mouseY;
      } 
  }
}

function mouseReleased() {
  switch (stage) {
    case 4:
      isDragging_In = false;
      isDragging_Out = false;
      break;
    case 6:
      isDragging = false;
      break;
    case 12:
      if (selectedPiece) {
        if (selectedPiece.x > 70 && selectedPiece.x < 300 &&
          selectedPiece.y > 50 && selectedPiece.y < 550
        ) { // 외계인 근처에서 item을 놓으면
          for (let target of dressTargets) {
            if (selectedPiece.kind == target.kind) {
              // 착용 위치로 이동
              selectedPiece.x = target.x;
              selectedPiece.y = target.y;
              selectedPiece.sizeX = target.sizeX;
              selectedPiece.sizeY = target.sizeY;
              selectedPiece.locked = true;
              target.locked = true;
            }
          }
        } else { // 외계인 근처가 아니라면 선반 위로 돌아가기
          selectedPiece.x = selectedPiece.returnX;
          selectedPiece.y = selectedPiece.returnY;
          //console.log(selectedPiece);
        }
        selectedPiece = null;
      }
  }
}
