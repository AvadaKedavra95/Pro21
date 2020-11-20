var wall
var bullet,bulletImg
var RUN
var PLAY=1
var STATE=RUN
var backgroundImg
var speed
var mass
var run,runImg;
var damage;
var back
var gun , gunImg
var thickness
var shoot,collided

function preload(){
  backgroundImg=loadImage("backgroundImg.png");
  bulletImg=loadImage("bullet.png")
  runImg=loadImage("next.png");
  back=loadImage("wallpaper.jpg");
  gunImg=loadImage("gun.png");
  shoot=loadSound("shoot.mp3");
  collided=loadSound("collide.mp3");
}

function setup() {
  createCanvas(1300,500);
  thickness=Math.round(random(22,83))
  speed=Math.round(random(223,321))
  mass=Math.round(random(30,52))
  wall=createSprite(1100,height/2,thickness,height);
  run=createSprite(width/2,height/5,10,10);
  run.addImage("run",runImg);
  run.scale=1.6;
  run.visible=true;
  damage=(0.5*mass*speed*speed)/(thickness*thickness*thickness);
  bullet=createSprite(width/6,height/2.1,10,10);
  bullet.addImage("bullet",bulletImg);
  bullet.visible=false;
  gun=createSprite(width/6,height/2,10,10);
  gun.addImage("gun",gunImg);
  gun.scale=0.7
  wall.shapeColor=80,80,80
  gun.rotate=300
  
}

function draw() {
  background(back);
  
  
  if(STATE===RUN){
    shoot.play();
    run.visible=true;
    if(mousePressedOver(run)){
      STATE=PLAY;
      
    }
  }

  if(STATE===PLAY){
    
    run.visible=false;
     bullet.visible=true;
     bullet.velocityX=speed;

     if(TOUCH(bullet,wall)){
      collided.play();
     }
     if(TOUCH(bullet,wall)&&damage<15){
        bullet.collide(wall);
        wall.shapeColor="green";
      
        bullet.destroy()
        
     }

     if(TOUCH(bullet,wall)&&damage>15){
      bullet.collide(wall);
      wall.shapeColor="red";
   
      bullet.destroy()
   }

  
  }

  drawSprites();
  stroke("white");
  if(STATE===PLAY){
  fill("black");
  textSize(30);   
  text("Damage : "+Math.round(damage),800,100) 
  text("Wall : "+Math.round(thickness),200,100);
  text("Bullet Speed : "+Math.round(speed),400,100)
}
}


function TOUCH(object1,object2){
  if (object1.x - object2.x < object1.width/2 + object2.width/2
    && object2.x - object1.x < object1.width/2 + object2.width/2
    && object1.y - object2.y < object1.height/2 + object2.height/2
    && object2.y - object1.y < object1.height/2 + object2.height/2) {
    return true;
  
}
else {
  return false;
}
}


