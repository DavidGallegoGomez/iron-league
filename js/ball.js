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

// return true if the rectangle and circle are colliding
Ball.prototype.rectCircleColliding = function (player) {
  var distX = Math.abs(this.x - player.x - player.width/2);
  var distY = Math.abs(this.y - player.y-player.height/2);

  //console.log(player.color + ' distX: ' + distX + ', distY: ' + distY);

  if (distX > (player.width/2 + this.radius)) { return false; }
  if (distY > (player.height/2 + this.radius)) { return false; }

  if (distX < (player.width/2)) { 
    this.dx *= -1;
    return true;
  } 
  if (distY < (player.height/2)) { 
    this.dy *= -1;
    return true;
  }

  var dx = distX - player.width/2;
  var dy = distY - player.height/2;
  //return (dx*dx + dy*dy <= (this.radius * this.radius));
  if (dx*dx + dy*dy <= (this.radius * this.radius)) {
    this.dy *= -1;
  }
}

Ball.prototype.collision = function(){
  // Colisión de la bola con las paredes
  if (this.y + this.dy > canvas.height - 2 * this.radius || this.y + this.dy < 2 * this.radius ) {
    this.dy *= -1; // Aleatorio???
  }
  if (this.x + this.dx > canvas.width - 2 * this.radius || this.x + this.dx < 0 + 2 * this.radius ) {
    this.dx *= -1; // Aleatorio???
  }
  // Colisión de la bola con los coches
  this.rectCircleColliding(player1);
  this.rectCircleColliding(player2);
  

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
  //console.log('P1: ' + goalsP1 + ' - P2: ' + goalsP2);
}
