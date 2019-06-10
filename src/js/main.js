// 渲染刻度和時間數字畫面
function renderClockUnit() {
  let deg = 180; //刻度角度，180度為12時的位置
  let time_deg = 180; // 數字角度
  let twelve_hours = 0; // 十二時制
  let twenty_hours = 12; // 二十四時制

  for (let i = 0; i<72; i++) {
    const unit_wrap = document.querySelector('.scale'); //刻度父元素
    const unit = document.createElement('div'); // 創造刻度DOM
    unit.classList.add('scale__unit');

    // 小時的刻度處理
    if(i%6 == 0) {
      unit.style.transform = `rotate(${deg}deg) translateY(110px)`;
      unit.innerHTML = `
      <span class="twelve" style="transform:rotate(${time_deg}deg)">${i==0?12:twelve_hours}</span>
      <span class="twenty" style="transform:rotate(${time_deg}deg)">${i==0?24:twenty_hours}</span>
      `;
      twelve_hours++;
      twenty_hours++;
      time_deg -= 30; // 每一小刻度為5度，每小時間隔六個刻度，因此需減去6*5=30將數字轉正
    // 小刻度處理
    } else {
      unit.style.transform = `rotate(${deg}deg) translateY(120px)`;
    }
    deg += 5;
    unit_wrap.appendChild(unit);
  }
}

// 時鐘運作
function clockPrimaryFeature() {
    // 選取指針DOM
    const hour_hand = document.querySelector('.hand-hour');
    const min_hand = document.querySelector('.hand-min');
    const sec_hand = document.querySelector('.hand-sec');
    // 抓時間
    const time = new Date();
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();
    // 計算指針角度
    const hour_deg = (hour*30 + min*30/60) - 180;
    const min_deg = min*6 + sec*6/60 - 180;
    const sec_deg = sec*6 - 180;

    hour_hand.style.transform = `rotate(${hour_deg}deg)`;
    min_hand.style.transform = `rotate(${min_deg}deg)`;
    sec_hand.style.transform = `rotate(${sec_deg}deg)`;
}

function runClock(callback){
  renderClockUnit();
  callback();
  setInterval(callback, 1000);
}

runClock(clockPrimaryFeature);

