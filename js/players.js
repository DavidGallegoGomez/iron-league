function Player(width, height, x, y, color, name) {
  //this.x = 50;
  //this.y = 50;
  this.isMovingRight = false;
  this.isMovingLeft = false;
  this.isMovingUp = false;
  this.isMovingDown = false;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
  this.name = name;
}

Player.prototype.movePlayer = function() {

  document.onkeydown = function(e) {
    //console.log(e.key + ':' + e.keyCode);
    //if (this.name = 'player1') {
      switch(e.keyCode){
        case 39:
          if (this.name = 'player1')this.isMovingRight = true;
          break
        case 37:
          if (this.name = 'player1')this.isMovingLeft = true;
          break
        case 38:
          if (this.name = 'player1')this.isMovingUp = true;
          break
        case 40:
          if (this.name = 'player1')this.isMovingDown = true;
          break
        case 68:
          if (this.name = 'player2')this.isMovingRight = true;
          break
        case 65:
          if (this.name = 'player2')this.isMovingLeft = true;
          break
        case 87:
          if (this.name = 'player2')this.isMovingUp = true;
          break
        case 83:
          if (this.name = 'player2')this.isMovingDown = true;
          break
        }
      e.preventDefault();
  }.bind(this)

  document.onkeyup = function(e) {
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    e.preventDefault();
  }.bind(this)

  if(this.isMovingRight === true && this.x + this.width <= canvas.width)this.x += 5;
  if(this.isMovingLeft === true && this.x > 0)this.x -= 5;
  if(this.isMovingUp === true && this.y >= 0)this.y -= 5;
  if(this.isMovingDown === true && this.y + this.height <= canvas.height)this.y += 5;
}

/*Player.prototype.movePlayer2 = function() {

  document.onkeydown = function(e) {
    //console.log(e.key + ':' + e.keyCode);
    //if (this.name = 'player1') {
      switch(e.keyCode){
        case 68:
          this.isMovingRight = true;
          break
        case 65:
          this.isMovingLeft = true;
          break
        case 87:
          this.isMovingUp = true;
          break
        case 83:
          this.isMovingDown = true;
          break
        }
  }.bind(this)

  document.onkeyup = function(e) {
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
  }.bind(this)

  if(this.isMovingRight === true && this.x + this.width <= canvas.width)this.x += 5;
  if(this.isMovingLeft === true && this.x > 0)this.x -= 5;
  if(this.isMovingUp === true && this.y >= 0)this.y -= 5;
  if(this.isMovingDown === true && this.y + this.height <= canvas.height)this.y += 5;
}*/

Player.prototype.draw = function() {
  //ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height)
  ctx.closePath();
}
