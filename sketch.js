var ballImg, playerImg1, playerImg2, hoop1Img, hoop2Img, ballSprite, hoopSprite, playerSprite, basketSprite, score, Edges, checkpointSound, gameState ; 
//preload is executed just once, before the code execution begins
function preload(){
  ballImg=loadImage("ball.png");
  playerImg1=loadImage("PosImg1.png");
  playerImg2=loadImage("PosImg2.png");
  hoop1Img=loadImage("Hoop1.png");
  hoop2Img=loadImage("Hoop2.png");
  checkpointSound = loadSound("checkPoint.mp3");
  
}
//setup is the first thing to be executed, after the code execution begins. setup is also executed once
function setup(){
  createCanvas(400,400);
  score=0 
  gameState = "onPlayer"
  
  basketSprite=createSprite(50,180,5,5);
  ballSprite=createSprite(365,215,20,20);
  //addImage funtion has two arguments 
  //first is a string place holder 
  //second is the variable that holds the image
  ballSprite.addImage("basketBall", ballImg)
  playerSprite=createSprite(350,300,20,170);
  playerSprite.addImage("stillPlayer", playerImg1)
  playerSprite.addImage("aimingPlayer",playerImg2)
  hoopSprite=createSprite(60,180,20,20);
  hoopSprite.addImage("hoop", hoop1Img);
  hoopSprite.addImage("aimedHoop", hoop2Img);
  ballSprite.scale=0.6
  hoopSprite.scale=0.5
//  playerSprite.debug=true
  //hoopSprite.debug=false
//  ballSprite.debug=true
//  basketSprite.debug=true
  basketSprite.visible=false
  // first parameter is the shape of collider
  //second and third are the x and y offset which define how far the center of collider would be from the center of the sprite.
  ballSprite.setCollider("rectangle",-20,0,30,10);
  playerSprite.setCollider("rectangle",0,0,10,180);
  hoopSprite.setCollider("rectangle",-115,-40,20,160);
  basketSprite.setCollider("circle",0,0,10);
  hoopSprite.velocityY=-2
  
}
//draw is executed after setup, draw is executed many times for each frame.
function draw(){
  background(180);
  fill(" Black ");
  text( " Your Score: " + score,300,100);
  
  
  if(keyDown("SPACE")&&gameState==="onPlayer"){
    ballSprite.velocityY= -10;
    ballSprite.velocityX= -9;
    gameState = "lauched"
    playerSprite.changeAnimation("aimingPlayer",playerImg2);
  }
  else if(keyWentUp("SPACE")){
    playerSprite.changeAnimation("stillPlayer",playerImg1)
  }
  //GRavity
  ballSprite.velocityY=ballSprite.velocityY + 0.5
  ballSprite.collide(playerSprite);
  if(keyDown("R")){
    ballReset();
    gameState= "onPlayer"
  }
  if(ballSprite.collide(basketSprite)){
     score=score+1;
     hoopSprite.changeAnimation("aimedHoop", hoop2Img);
    checkpointSound.play();
     }
  else{
    hoopSprite.changeAnimation("hoop", hoop1Img)
 
    
  }
  Edges = createEdgeSprites();
  hoopSprite.bounceOff(Edges);
  basketSprite.y = hoopSprite.y
  drawSprites();
  
}
function ballReset(){
ballSprite.x=365
  ballSprite.y=215
  ballSprite.velocityX=0;
  ballSprite.velocityY=0;
  
}