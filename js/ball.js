function Ball(x, y, dx, dy, color) {
  //this.x = 100;
  //this.y = 100;
  this.x = x;
  this.y = y;
  this.dx = dx; // Aleatorio???
  this.dy = dy; // Aleatorio???
  this.radius = 25;
  this.color = color;
};

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}

Ball.prototype.move = function(){
  this.x += this.dx;
  this.y += this.dy;
}

Ball.prototype.collision = function(){
  if (this.y + this.dy > canvas.height - 2 * this.radius || this.y + this.dy < 2 * this.radius ) {
    this.dy *= -1; // Aleatorio???
  }
  if (this.x + this.dx > canvas.width - 2 * this.radius || this.x + this.dx < 0 + 2 * this.radius ) {
    this.dx *= -1; // Aleatorio???
  }
}

Ball.prototype.goal = function() {
  if (this.x === 52) { 
    //console.log('P2 GOAL!!!');
    goalsP2 ++;
  }
  else if (this.x === canvas.width - 52) { 
    //console.log('P1 GOAL!!!');
    goalsP1 ++;
  }
  //console.log(goalsP1 + ' : ' + goalsP2);
}
