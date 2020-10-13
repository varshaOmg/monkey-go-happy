var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var ground,groundImage
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0
var score

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //groundImage = loadImage('')
 
}



function setup() {
  createCanvas(550,550)
  
   bananaGroup = createGroup()
   obstacleGroup = createGroup()
  
   monkey = createSprite(65,400,10,10)
   monkey.addAnimation( "running",monkey_running)
   monkey.scale = 0.2;
  
   ground = createSprite(250,470,1200,20)
   // ground.addImage()
   ground.x = ground.width/2
  
  survivalTime = 0
  score = 0
}


function draw() {
  background(220)
  
  textSize(20)
  survivalTime = survivalTime + Math.round(frameRate()/60);
  text("survival time:" + survivalTime,400,100)
  
  if (gameState === PLAY){
     
    ground.velocityX = -7
     if (ground.x < 0){
      ground.velocityX = -4
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 390) {
        monkey.velocityY = -16;
        
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    food()
    rock()
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END
    }
    
  }
  
  if (gameState === END){
   
    
      
      ground.velocityX = 0;
      monkey.velocityY = 0
      
      bananaGroup.setVelocityXEach(0);
      bananaGroup.setLifetimeEach(-1)
    
       obstacleGroup.setVelocityXEach(0);
       obstacleGroup.setLifetimeEach(-1)
    
      survivalTime = 0
      
    
    
    
    
  }
  
  
drawSprites();
  
}

function food(){
  
  if (frameCount %80 === 0){
  
  banana = createSprite(540,(Math.round(random(1,4)) ,120,220))
  banana.addImage(bananaImage)
  banana.scale = 0.1;
  banana.velocityX = -4
  banana.lifetime = 150;
  
  bananaGroup.add(banana)
  
  
  
  }
}

function rock(){
  
  if (frameCount %300 === 0){
  
  obstacle = createSprite(540,(Math.round(random(1,4)),65,425))
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -4
  obstacle.lifetime = 150
  obstacle.scale = 0.2
    
  obstacleGroup.add(obstacle)
  
  }  
}





