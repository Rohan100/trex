//T.Rex Runner game by Rohan

//Declare Variables for Game Objects
var trex, trex_Running, trex_Collided; 
var ground, ground_Image, invisible_Ground;
var cloud, cloudImage;
var obsImg1, obsImg2, obsImg3, obsImg4, obsImg5, obsImg6;
var score;
var gameState, PLAY, END;
var obsGroup, cloudGroup;
var gameOver, gameOverImg, restart, restartImg;
var scoreSound, dieSound, jumpSound;
function preload(){
  
  trex_Running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_Collided = loadAnimation("trex_collided.png");
  
  ground_Image = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obsImg1 = loadImage("obstacle1.png");
  obsImg2 = loadImage("obstacle2.png");
  obsImg3 = loadImage("obstacle3.png");
  obsImg4 = loadImage("obstacle4.png");
  obsImg5 = loadImage("obstacle5.png");
  obsImg6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  scoreSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //console.log("width-"+windowWidth)
  console.log("height-"+windowHeight);
  
  //Define Variables for Game Objects
  trex = createSprite( 50, height-90, 20, 50);
  trex.addAnimation("running", trex_Running);
  trex.addAnimation("collided", trex_Collided);
  trex.scale = 0.5
  
  ground = createSprite( 300, height-40, 600, 20);
  ground.addImage("ground", ground_Image);
  
  invisible_Ground = createSprite(3, height-20, 300, 10);
  invisible_Ground.visible = false;
  
  score = 0;
  
  PLAY = 1;
  
  END = 0;
  
  gameState = PLAY;
  
  obsGroup = new Group();

  cloudGroup = createGroup();
  
  gameOver = createSprite(width-320, height-200, 20, 20)
  gameOver.addImage("gameOverImg", gameOverImg);
  gameOver.visible = false;

  restart = createSprite(width-320, height-140, 10, 10);
  restart.addImage("restartImg", restartImg);
  restart.scale = 0.6;
  restart.visible = false;
  
}

  

function draw() {
  
  
  background("WHITE");

  textFont("oxanium");
  if(score < 10){
    text("00000"+score, width-100, height-220);
  }
  if(score>10 && score<100){
    text("0000"+score, width-100, height-220);
  }
  if(score>100 && score<1000){
    text("000"+score, width-100, height-220);
  }
  if(score>1000 && score<10000){
    text("00"+score, width-100, height-220);
  }
  if(score>10000 && score<100000){
    text("0"+score, width-100, height-220);
  }
  if(score>100000 && score < 1000000){
    text(score, width-100, height-220);
  }
  if(gameState == PLAY){
  trex.changeAnimation("running", trex_Running);
  if(score % 100 == 0){
    scoreSound.play();
  }
  console.log(trex.y);
  //add movement to trex
  if(keyDown("space") && trex.y >= height-60 ){
    trex.velocityY = -14;
    jumpSound.play();
  }
  //adding gravity
  trex.velocityY = trex.velocityY + 1;

  ground.velocityX = -10 ;
  
  if(ground.x< 0){
    ground.x = ground.width/2;
  }
    
  score = score + Math.round(getFrameRate()/60);
  
  spawnClouds();
  spawnCacti();
  if(obsGroup.isTouching(trex)){
    gameState = END
    dieSound.play();
  }
  }
  else if(gameState == END){
    trex.velocityY = 0;
    ground.velocityX = 0;
    obsGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_Collided);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      startOver();
    }
  }
  trex.collide(invisible_Ground);
  drawSprites();
  
}
function spawnClouds(){
  if(frameCount % 70 == 0){
    cloud = createSprite(600, height-90, 40, 10)
    cloud.addImage("cloudImage", cloudImage);
    cloud.scale = 0.5;
    cloud.y = random(150, height-100)
    cloud.velocityX = -4
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 150;
    cloudGroup.add(cloud);
  }
}
function spawnCacti(){
  if(frameCount % 60 == 0){
  var cacti = createSprite(600, height-50, 30, 30);
  var randInt = Math.round(random(1,6));
   switch(randInt){
    case 1: cacti.addImage("obsImg", obsImg1);
            break;
    case 2: cacti.addImage("obsImg", obsImg2);
            break;
    case 3: cacti.addImage("obsImg", obsImg3);
            break;
    case 4: cacti.addImage("obsImg", obsImg4);
            break;
    case 5: cacti.addImage("obsImg", obsImg5);
            break;
    case 6: cacti.addImage("obsImg", obsImg6);
            break;
    default: break;
  } 
  cacti.scale = 0.5;
  
 cacti.velocityX = -10;
    cacti.lifetime = 120;
  obsGroup.add(cacti);
  }
}
function startOver(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obsGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  
}