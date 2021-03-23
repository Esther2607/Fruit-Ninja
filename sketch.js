var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, fruit, fruitGroup, enemyGroup;
var swordImage, virusImage, fruit1, fruit2, fruit3, fruit4, gameoverImage;


function preload(){
  
 swordImage = loadImage("sword.png");
 virusImage = loadAnimation("alien1.png","alien2.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 gameoverImage = loadImage("gameover.png");
  
 sound = loadSound("knifeSwooshSound.mp3");
 sound1 = loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(400,400);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.setCollider("rectangle",0,0,40,40);
  sword.debug = false;
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;

}

function draw(){
  background("lightblue");
  
  if (gameState === PLAY){
    fruits();
    enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      sound.play();
      score = score + 2
      
    }
    else
  {
   if (enemyGroup.isTouching(sword)){
     gameState = END;
     sound1.play();
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     
     sword.addImage(gameoverImage);
     sword.x = 200;
     sword.y = 200;
   }
      
        
      }
    
  }
  drawSprites();
  
  text("Score: "+ score,300,30);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -4;
    
     fruitGroup.add(fruit);
    position=Math.round(random(1,2))
     if(position === 1)
      {
      fruit.x = 400;
       fruit.velocityX  = -(7 + (score/4));
        fruit.setLifetime = 100;
      }
      else
      {
        if(position === 2){
          fruit.x = 0;
          fruit.velocityX = (7 +(score/4));
        }
        } 
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);  
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
        }
    
    
  
}

function enemy(){
  if(World.frameCount %200 === 0){
    virus = createSprite(400,200,20,20);
    virus.addAnimation("moving",virusImage);
    virus.y = Math.round(random(100,300));
    virus.velocityX = -(8 + (score/10));
    virus.setLifetime = 50;
    
    enemyGroup.add(virus);
  }
}
