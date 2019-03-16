// DGG: Pinta el campo de juego usando canvas

function drawPlayGround() {
  ctx.save();
  
  ctx.beginPath();
  ctx.rect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'grey';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#FFF";
  ctx.stroke();
  ctx.closePath();
  
  ctx.fillStyle = "#FFF";
  
  // Mid line
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.closePath();
  
  //Mid circle
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2*Math.PI, false);
  ctx.stroke();
  ctx.closePath();
  //Mid point
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.closePath();
  
  //Home penalty box
  ctx.beginPath();
  ctx.rect(0, (canvas.height - 350) / 2, 200, 350);
  ctx.stroke();
  ctx.closePath();
    
  //Away penalty box
  ctx.beginPath();
  ctx.rect(canvas.width - 200, (canvas.height - 350) / 2, 200, 350);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}