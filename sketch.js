var road;
var roadstrip1,roadstrip2;

var playercar,playercarimg;
var car2,car2img;
var car3,car3img;
var car4,car4img;
var carGroup;

var score=0;
var coinscollected=0;

var restart,restartimg;

var coin,coinimg,coinGroup;

var gameState="play";
var end;

function preload(){

playercarimg=loadImage("car_yellow.png");
car2img=loadImage("car_red.png");
car3img=loadImage("download (2).png");
car4img=loadImage("car_green.png");

restartimg=loadImage("restart.png");

coinimg=loadImage("coin_gold.png");
}


function setup() {

createCanvas(500,550);  

road=createSprite(250,290,140,130);
road.shapeColor="black";
road.scale=4;

roadstrip1=createSprite(240,275,7,550);
roadstrip1.shapeColor="yellow";
roadstrip2=createSprite(260,275,7,550);
roadstrip2.shapeColor="yellow";

playercar=createSprite(250,400);
playercar.addImage(playercarimg);
playercar.scale=0.5;

restart=createSprite(250,275);
restart.addImage(restartimg);
restart.visible=false;

carGroup=new Group();
coinGroup=new Group();

createEdgeSprites();


}

function draw() {

background("black");

fill("white");
textSize(20);
text ("Score:"+score,400,25);
text ("CoinsCollected:"+coinscollected,10,25);

if(gameState==="play"){
  score=score+Math.round(getFrameRate()/60);
  
  if(score%100===0){
    carGroup.setVelocityYEach(6+0.5)
  }

  if(playercar.isTouching(coinGroup)){
    coinGroup.destroyEach();
    coinscollected=coinscollected+1;
  }

  if(keyDown("RIGHT_ARROW")){
   playercar.x=playercar.x+10;
  }

  if(keyDown("LEFT_ARROW")){
   playercar.x=playercar.x-10;
  }

  if(playercar.collide(carGroup)){
    carGroup.destroyEach();
    gameState="end";
    restart.visible=true;
   }

   createCars();
   createCoins();
 }    

 if(gameState==="end"){
   carGroup.setVelocityYEach(0);
   playercar.velocityY=0
   carGroup.setVelocityYEach(0);
   
   if(mousePressedOver(restart)){
    reset();
    restart.visible=false;
    }
  }


drawSprites();    
}

function createCars(){
if(frameCount%80===0){
car2=createSprite(Math.round(random(20,160)),-10);
car3=createSprite(Math.round(random(180,320)),-260);
car4=createSprite(Math.round(random(360,480)),-460);

car2.addImage(car2img);
car3.addImage(car3img);
car4.addImage(car4img)

carGroup.add(car2);
carGroup.add(car3);
carGroup.add(car4);

carGroup.setVelocityYEach(6);
carGroup.setScaleEach(0.5);

carGroup.setLifetimeEach(100)
}
}

function reset(){
gameState="play";  
score=0;
coinscollected=0;
playercar.x=250;
playercar.y=400;
}

function createCoins(){
if(frameCount%150===0){  
coin=createSprite(Math.round(random(20,480)),-10);
coin.addImage(coinimg);
coin.velocityY=4;
coin.scale=0.5
coinGroup.setLifetimeEach(100);
coinGroup.add(coin);
}
}