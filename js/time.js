function Clock() {
  this.sec = 0;
  this.min = 0;
};

//var intervalClock = setInterval(drawClock, 1000);

function stopClock() {
  if (time === 10) { // DGG: Duración oficial: 90 seg;
    clearInterval(intervalClock);
    //clearInterval(interval);
    var hitSound = new Audio('./sound/buzzer.mp3');
    hitSound.play();
    endGame = true;
  }
  else { time++; }
}

Clock.prototype.drawTime = function() {
  //var text = 'TIME: ' + time;
  var text;
  if (this.sec < 10) {
    text = 'TIME: 0' + this.min + ' : 0' + this.sec;
  }
  else { text = 'TIME: 0' + this.min + ' : ' + this.sec; }
  ctx.font = '25px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.fillText(text, canvas.width-100, 50);
}

Clock.prototype.parseTime = function(){
  this.sec = time;
  if (time > 59 ) {
    this.min = 1;
    this.sec -= 60;
  }
  //console.log('0' + this.min + ' : ' + this.sec);
}
