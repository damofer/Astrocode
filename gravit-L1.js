$(document).ready(function() {
    var canvas;// the canvas element which will draw on
var ctx;// the "context" of the canvas that will be used (2D or 3D)
var dx =7;// the rate of change (speed) horizontal object
var x = 10;// horizontal position of the object (with initial value)
var y = 230;// vertical position of the object (with initial value)
var WIDTH = 820;// width of the rectangular area
var HEIGHT = 400;// height of the rectangular area
var background = new Image ();// Background to be loaded and drawn on canvas
var astronaut = new Image ();// Image to be loaded and drawn on canvas
var position = 1;// display the current position of the character
var NUM_POSITIONS_RIGHT = 6;// Number of images that make up the movement to right
var NUM_POSITIONS_LEFT = NUM_POSITIONS_RIGHT + 5;// Number of images that make up the movement to left
var J = 0;
var K = 0;





// AQUI SE CREA EL CANVAS DEL JUEGO
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserContainer', { preload: preload, create: create, update: update });

var astro;

var left;
var right;

var sprite;
var back;
var anim;
var contador = 0;
var gravity  =90;
var AGTime =3;
var MBoots=true;

//EL ARRAY QUEUE LLEVA EL ORDEN DE EJECUCION DE LAS ACCIONES
var queue = [];
///
var unasolavez=true;
var key;
var keys = 0;
var UpD=false;
var MBoots=false;
var PlayerGravity=gravity;

//Function loads the  files before the  game starts
function preload(){

 game.load.image("platform", "Platform256_100.png");

  game.load.image("bg", "assets/background2.png");
 // game.load.image("astro2", "assets/astro.png");

  game.load.audio('music', 'assets/audio/bg.mp3');
    game.load.audio('card', 'assets/audio/tarjetas.mp3');
    game.load.audio('gameover', 'assets/audio/gameover.mp3');

game.load.atlasJSONHash('astronaut','assets/movement/astro-sheet.png','assets/movement/astro-sheet.json');
// game.load.spritesheet('astronaut','astro-sheet.png',58,94);

 game.load.spritesheet('key','assets/key-spritesheet.png',70,70,11);
 game.load.spritesheet('door','assets/door-spritesheet.png',95.5,64)
 }

 // Function Basically it adds  everything to the  canvas when loaded.
function create(){
  game.world.setBounds(0,0,800,800);
     game.physics.startSystem(Phaser.Physics.P2JS);

      game.physics.p2.setImpactEvents(true);


 //  Create our collision groups. One for the player, one for the pandas
     var playerCollisionGroup = game.physics.p2.createCollisionGroup();
      var keyCollisionGroup = game.physics.p2.createCollisionGroup();

         game.physics.p2.updateBoundsCollisionGroup();

 game.physics.p2.updateBoundsCollisionGroup();

    music = game.add.audio('music',1,true);
     music_card = game.add.audio('card');
      music_gameover = game.add.audio('gameover');
    music.play();


    back=game.add.tileSprite(0, 0,800,600,"bg"); //background
    back.fixedToCamera=true;


    key=game.add.sprite(350,200,'key');
    door=game.add.sprite(650,100,'door');
    astro = game.add.sprite(50, 210, 'astronaut',0);// Character Sprites"
    astro.scale.setTo(0.8, 0.8);
    astro.anchor.setTo(0.5, 0.5);


    platform =game.add.sprite(50,500,'platform');
    platform2 =game.add.sprite(150,500,'platform');
    platform3=game.add.sprite(250,250,'platform');
    platform4=game.add.sprite(350,250,'platform');

      platform5 =game.add.sprite(150,50,'platform');
      platform6 =game.add.sprite(250,50,'platform');

      platform7 =game.add.sprite(450,500,'platform');
      platform8 =game.add.sprite(550,500,'platform');

      platform9=game.add.sprite(550,50,'platform');
      platform10 =game.add.sprite(650,50,'platform');

    game.physics.enable(astro,true);



//NO MORE SPRITES AFTER THIS



     game.world.setBounds(0,0,800,800);
     game.physics.startSystem(Phaser.Physics.P2JS);
     game.physics.startSystem(Phaser.Physics.ARCADE);


game.physics.enable( [
    key,
    door,
    astro,
    platform,
    platform2,
    platform3,
    platform4,
    platform5,
    platform6,
    platform7,
    platform8,
    platform9,
    platform10
    ], Phaser.Physics.P2JS);



//platform.body.angle+=90;
platform.body.static=true;
platform2.body.static=true;
platform3.body.static=true;
platform4.body.static=true;
platform5.body.static=true;
platform6.body.static=true;
platform7.body.static=true;
platform8.body.static=true;
platform9.body.static=true;
platform10.body.static=true;

door.body.static=true;
door.body.angle+=180;

astro.body.fixedRotation=true;
astro.body.mass =4;




    //  Here we create a Body specific callback.
    //  Note that only impact events between the ship and the panda are used here, the sweet/candy object is ignored.
  astro.body.createBodyCallback(key,getKey, this);
  astro.body.createBodyCallback(door,finishLevel, this);

    //  And before this will happen, we need to turn on impact events for the world
    game.physics.p2.setImpactEvents(true);




door.animations.add('open',0,15,10,false);
door.animations.play('open');


key.animations.add('rotate',0,10,true);
key.animations.play('rotate');


astro.animations.add('right',['1.png','2.png','3.png','4.png','5.png','6.png'],10,true); // Added those sprites  seem before into a new animation item  called walk.
astro.animations.add('left',['7.png','8.png','9.png','10.png','11.png','12.png',],10,true);
// astro.animations.add('Invertleft',[18,19,20,21,22],10,true);

 //characterSprite = game.add.sprite(game.world.centerX, 0, 'astronaut')

}


function update(){

//game.physics.p2js.collide(astro,key,collision,null,this);

game.physics.p2.gravity.y = gravity;


  if(MBoots==true){
// if(UpD==true){astro.body.gravity=gravity*-1;}
// else{if(UpD ==false)astro.body.gravity=gravity;}
astro.body.velocity.y = PlayerGravity;

}




}

 function magnetBoots(){
// MBoots=!MBoots;
if(MBoots ==false){MBoots=true;}
else{
  if(MBoots==true){
   if( PlayerGravity != gravity) {

    astro.body.fixedRotation=false;

    astro.body.angle+=180;


  }
  MBoots=false;

   }
  }
PlayerGravity=gravity;

console.log("Mboots="+ MBoots);
//console.log("UpD="+ UpD);

 }



// function distanceBetween(spriteA,spriteB){
//     var dx = spriteA.body.x - spriteB.body.x;  //distance ship X to planet X
//     var dy = spriteA.body.y - spriteB.body.y;  //distance ship Y to planet Y
//     var dist = Math.sqrt(dx*dx + dy*dy);     //pythagoras ^^  (get the distance to each other)
//     return dist;
// }




function getKey(){
   // key.destroy();
   keys +=1;
    console.log("KEYS + 1");
    key.destroy();
        music_card.play();


}

function finishLevel(){
   // key.destroy();

   if(keys !=0){
    // game.physics.enable(door,false);
    door.destroy();
        music_gameover.play();

   keys -=1;
    console.log("KEYS - 1");
    alert("STAGE CLEARED!");

}
}






 //FROM THIS POINT WILL SHOW  SOME BASIC FUNCTIONS THAT ALLOWS THE CHARACTER TO DO  ACTIONS






function goRight(value){

  if(MBoots==false){

    if(gravity >=0){
     astro.animations.play('right');
    }
    if(gravity <0){
     astro.animations.play('left');}
   }
   if(MBoots==true){
      if(PlayerGravity >=0){
     astro.animations.play('right');
    }
    if(PlayerGravity <0){
     astro.animations.play('left');}
    }


    if(value!=0){
            var movement = setInterval(function(){
                 astro.body.x +=1*value;
             }, 15);
        }
      else{
            // astro.body.moveUp(200);
            var movement = setInterval(function(){
                 astro.body.x +=1;
             }, 15);

          }

setTimeout(function() {
        clearInterval(movement);
        astro.animations.stop(null,true);
    }, 1500);


}

function goLeft(value){



   if(MBoots==false){

    if(gravity >=0){
     astro.animations.play('left');
    }
    if(gravity <0){
     astro.animations.play('right');

    }
  }

  if(MBoots==true){
      if(PlayerGravity >=0){
     astro.animations.play('left');
    }
    if(PlayerGravity <0){
     astro.animations.play('Right');}
    }



     if(value!=0){
            var movement = setInterval(function(){
                 astro.body.x -=1*value;
             }, 15);
        }
      else{

            var movement = setInterval(function(){
                 astro.body.x -=1;
             }, 15);

          }

setTimeout(function() {
        clearInterval(movement);
        astro.animations.stop(null,true);
    }, 1500);
}






function AlterGravity(){


gravity=gravity*-1;
// UpD=!UpD;
 if(UpD ==false){UpD=true;}else{if(UpD==true){UpD=false;}}

 console.log("UdP= " +UpD)

setTimeout(function(){

astro.body.fixedRotation=false;
if(MBoots==false){
    astro.body.angle+=180;
  }



},100);

setTimeout(function(){

astro.body.fixedRotation=true;





},120);




//astro.body.moves=false;


}


//this is  THE MAIN FUNCTION, it is a recursive method that will call itself eachtime there an action left in the queue.
function  Action(queue){
//for (var i=0; i<=queue.length-1; ++i){


if(contador!=0 && queue[contador-1].type==3){
setTimeout(function(){

ActionCase(queue[contador]);
contador+=1;
if(contador<queue.length){

Action(queue);


}

},1000*AGTime);}
else{
setTimeout(function(){

ActionCase(queue[contador]);
contador+=1;
if(contador<queue.length){

Action(queue);


}

},2000);


}

}


//THIS FUNCTION IS A SELECTOR, DEPENDING WHAT ACTION IS LEFT IN QUEUE , IT WILL EXECUTE THE CORRESPONDING ACTION FUNCTION.

function ActionCase(object){

type= object.type;
value= object.value;
switch(type)

    {

        case 0:


        break;
        case 1:

        goLeft(value);
        break;


        case 2:

        //go();
        goRight(value);


        break;

        case 3:

        console.log("ENTRO EN EL CASO 3");
         AlterGravity();
        break;

        case 4:


         magnetBoots();
        break;



    }
            }














// TEXT AREA CODE EXTRACTOR


document.addEventListener('call', function (e) { executeInstructions(checkSyntax($("#editor").val())); }, false);
function executeInstructions(instructions){
    var InstructionRunEvent = new Event('call');
        switch (instructions[K].type) {


        case 0: //go
           queue.push(0);
            if(position >= 7) {
                if(dx >= 0) {
                    dx = dx * (-1);8

                }

                num_positions = NUM_POSITIONS_LEFT;
            } else {
                num_positions = NUM_POSITIONS_RIGHT
            }
            var interval = setInterval(function() {
                    if (x + astronaut.width < WIDTH){
                        x += dx;
                        position++;
                       if(position == num_positions){
                           if(position >= 7) {
                               position = 8;
                           } else {
                               position = 2;
                           }
                        }
                        if(J >= (instructions[K].value * 17)) {
                            //document.onkeyup = true;
                            clearInterval(interval);
                            K++;
                            var delayInterval = setTimeout(function(delayInterval){ clearTimeout(delayInterval);document.dispatchEvent(InstructionRunEvent); }, 500);
                            if(position >= 7) {
                                position = 7;
                            } else {
                               position = 1;
                            }
                            J = 0;
                        }else {
                            J++;
                        }
                }
            }, 45);
            break;
        case 1: //turnLeft
            position = 7;
            dx = dx * (-1);

            queue.push(1);

            K++;
            var delayInterval = setTimeout(function(delayInterval){ clearTimeout(delayInterval);document.dispatchEvent(InstructionRunEvent); }, 500);
            break;
        case 2: //turnRight
            position = 1;
            dx = dx * (-1);
            queue.push(2);


            K++;
            var delayInterval = setTimeout(function(delayInterval){ clearTimeout(delayInterval);document.dispatchEvent(InstructionRunEvent); }, 500);
            break;
        default:
            console.log("default");
    }
    //}
}







//THIS FUNCTION IS FOR THE  RUN BUTTTON BELOW THE TEXT AREA
    $("#run").click(function(event) {
        event.preventDefault();
        var objectResult = checkSyntax($("#editor").val());
        if(objectResult != null) {




            Action(objectResult);

}

});


//THIS FUNCTION WILL CHECK THE SYNTAX ON THE TEXT AREA



   function checkSyntax(editorVal) {
        var syntax = false;
        //commands list
        var instructionResultArray = new Array();
        var instructions = ["go", "Left", "Right", "alterGravity","magnetBoots"];
        var linesNumber = editorVal.split(/\n/g).length;
        var linesCode = editorVal.split(/\n/g);
        for(var i=0; i<linesNumber;i++) {
            var codeInstruction = linesCode[i].substring(0, linesCode[i].indexOf("("));
            var value = linesCode[i].substring(linesCode[i].indexOf("(") +1, linesCode[i].lastIndexOf(")"));
            if(
                codeInstruction == "alterGravity"
                &&
                linesCode[i].indexOf(")") == linesCode[i].length - 1
            ) {
                var instructionResult = {type: instructions.indexOf(codeInstruction), value: null };
                syntax = true;
            }
            else if(
                instructions.indexOf(codeInstruction) != -1
                &&
                linesCode[i].indexOf(")") == linesCode[i].length - 1
                &&
                !isNaN(value)

            ) {
                var instructionResult = {type: instructions.indexOf(codeInstruction), value: value };
                syntax = true;
            }

            if(syntax) {
                console.log("Index: "+instructionResult.type+" "+"Value: "+instructionResult.value);
                //return instructionResult;
                instructionResultArray.push(instructionResult);
            } else {
                //return null;
                instructionResultArray = null;
            }
        }
        return instructionResultArray;
    }











});