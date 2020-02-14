var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;


var spaceship = {
    color: "#ccc",
    width: 8,
    height: 22,
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    angle: 0,
    multicolor: false,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false
}

function drawSpaceship() {
    context.fillStyle = "white";
    context.font = "bold 30px Arial";
    context.fillText("SPACESHIP", (canvas.width / 2) - 75, (canvas.height / 18))
    context.save();
    canvas.style.color = "black";
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();
    
    
    if (spaceship.engineOn) {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 15);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}

function updateSpaceship(){
    if(spaceship.rotatingRight){
        spaceship.angle +=3  * Math.PI / 180;
    }
    else if(spaceship.rotatingLeft){
        spaceship.angle -= 3 * Math.PI / 180;
    }
    if (spaceship.engineOn) {
        spaceship.position.x +=4 * Math.sin(spaceship.angle);
        spaceship.position.y -=4 * Math.cos(spaceship.angle);
    }
    if(spaceship.multicolor){
        
    }
}

function draw(){

    //Clear Screen
  context.clearRect(0, 0, canvas.width, canvas.height);
   //Update SpaceShip
  updateSpaceship();
   //Begin Drawing
  drawSpaceship();  
  requestAnimationFrame(draw);
}

function keyPressed(event){
    switch(event.keyCode){
        case 37:  //LEFT
        spaceship.rotatingLeft = true;
        break;
        case 39:  //RIGHT
        spaceship.rotatingRight = true;
        break; 
        case 38:  //UP
        spaceship.engineOn = true;
        break;
        case 32:  //SPACE
        spaceship.multicolor = true;
        break;
    }
}
document.addEventListener("keydown", keyPressed);

function keyLetGo(event) {
    switch (event.keyCode) {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}



document.addEventListener('keyup', keyLetGo);

draw();


