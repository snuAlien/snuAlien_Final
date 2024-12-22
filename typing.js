class TypingAnimation {
    constructor(text) {
      this.text = text; // 출력할 텍스트
      this.displayedText = ""; // 현재까지 출력된 텍스트
      this.index = 0; // 현재 출력 중인 문자 인덱스
      this.speed = 5; // 타이핑 속도
      this.showCursor = true; // 커서 깜박임 상태
      this.isComplete = false; // 애니메이션 완료 여부
    }
  
    update() {
      // 타이핑 애니메이션 (한 글자씩 추가)
      if (frameCount % this.speed === 0 && this.index < this.text.length) {
        this.displayedText += this.text[this.index];
        this.index++;
      }

      // 애니메이션 완료 여부 확인
      if (this.index >= this.text.length) {
        this.isComplete = true;
      }
  
      // 커서 깜박임
      if (frameCount % 30 === 0) {
        this.showCursor = !this.showCursor;
      }
    }
  
    display(x, y) {
      let cursor = this.showCursor ? "|" : ""; // 커서 상태
  
      // 줄바꿈 처리 및 출력
      let lines = this.displayedText.split("\n"); // \n을 기준으로 텍스트를 나눔
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y + i * (textSize()+5)); // 각 줄을 개별적으로 출력
      }
  
      // 마지막 줄에 커서 추가
      if (lines.length > 0) {
        let lastLine = lines[lines.length - 1];
        text(lastLine + cursor, x, y + (lines.length - 1) * (textSize()+5));
      }
    }

    noCursor() {
      this.showCursor = false;
    }

    onMove() {
      if (this.index > 3) {
        this.speed = 20;
      }

      if (this.isComplete) {
        this.index = 4;
        this.displayedText = "이동 중"
        this.isComplete = false;
      }
    }

    speedUp() {
      this.speed = 2;
    }

    complete() {
        // 애니메이션 즉시 완료
        this.displayedText = this.text;
        this.index = this.text.length;
        this.isComplete = true;
      }

    check() {
        if (this.isComplete) return true;
        else return false;
    }
  }
  
