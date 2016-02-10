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
var gravity  =90

//EL ARRAY QUEUE LLEVA EL ORDEN DE EJECUCION DE LAS ACCIONES
var queue = [];
///
var unasolavez=true;
var key;


//Function loads the  files before the  game starts
function preload(){

 game.load.image("platform", "Platform257.png");

  game.load.image("bg", "assets/background1.png");
 // game.load.image("astro2", "assets/astro.png");

  game.load.audio('music', 'assets/audio/bg.mp3');
    game.load.audio('card', 'assets/audio/tarjetas.mp3');
    game.load.audio('gameover', 'assets/audio/gameover.mp3');

 game.load.spritesheet('astronaut','astronaut_sheet.png',113,113);
 game.load.spritesheet('key','assets/key-spritesheet.png',70,70,11);
 game.load.spritesheet('door','assets/door-spritesheet.png',95.5,64)
 }

 // Function Basically it adds  everything to the  canvas when loaded.
function create(){


   // game.physics.p2.gravity.y = gravity;
    music = game.add.audio('music',1,true);
    music.play();


    back=game.add.tileSprite(0, 0,800,600,"bg"); //background
    back.fixedToCamera=true;


    key=game.add.sprite(550,210,'key');
    door=game.add.sprite(700,440,'door');


    astro = game.add.sprite(80, 210, 'astronaut',0);// Character Sprites

   // astro2 = game.add.sprite(80, 100, 'astro2',0);// Character Sprites
     astro.scale.setTo(1, 1);
     // astro2.scale.setTo(0.08, 0.08);

    astro.anchor.setTo(0.5, 0.5);
    platform =game.add.sprite(100,300,'platform');
    platform2=game.add.sprite(500,300,'platform');
    platform3 =game.add.sprite(300,50,'platform');

     platform4 =game.add.sprite(580,500,'platform');


    game.physics.enable(astro,true);



 game.world.setBounds(0,0,800,800);
    game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.startSystem(Phaser.Physics.ARCADE);


game.physics.enable( [ astro,platform2,platform,platform3,key], Phaser.Physics.P2JS);

game.physics.enable(platform,true);


//platform.body.angle+=90;
platform.body.static=true;
platform2.body.static=true;
platform3.body.static=true;




door.animations.add('open',0,15,10,false);
door.animations.play('open');


key.animations.add('rotate',0,10,true);
key.animations.play('rotate');


astro.animations.add('right',[0,1,2,3,4,5],10,true); // Added those sprites  seem before into a new animation item  called walk.
astro.animations.add('left',[6,7,8,9,10],10,true);
// astro.animations.add('Invertleft',[18,19,20,21,22],10,true);

 //characterSprite = game.add.sprite(game.world.centerX, 0, 'astronaut')

}





 //FROM THIS POINT WILL SHOW  SOME BASIC FUNCTIONS THAT ALLOWS THE CHARACTER TO DO  ACTIONS


 function magnetBoots(bool){

    game.physics.enable(astro,bool);

 }




function goRight(value){

    if(gravity >=0){
 astro.animations.play('right');
}
if(gravity <0){
 astro.animations.play('left');}


//game.add.tween(astro.body).to({ x:game.width}, 10000, Phaser.Easing.Linear.None, true)
//game.add.tween(astro).to({ x: astro.x+150},1000, Phaser.Easing.Linear.None, true)
    var tween= game.add.tween(astro).to({ x: astro.x+100},1500, Phaser.Easing.Linear.None, true)
    if(value!=0)
astro.body.moveRight(100*value);
else
astro.body.moveRight(100);
   tween.onComplete.add(function(){
    console.log("el muñeco dejo de correr")
     game.tweens.removeAll();
     astro.animations.stop(null,true);


   });
}

function goLeft(value){

if(gravity >=0){
 astro.animations.play('left');
}
if(gravity <0){
 astro.animations.play('right');

}
//game.add.tween(astro.body).to({ x:game.width}, 10000, Phaser.Easing.Linear.None, true)
//game.add.tween(astro).to({ x: astro.x+150},1000, Phaser.Easing.Linear.None, true)
    var tween= game.add.tween(astro).to({ x: astro.x-100},1500, Phaser.Easing.Linear.None, true)
if(value!=0)
    astro.body.moveLeft(100*value);
else
     astro.body.moveLeft(100);


   tween.onComplete.add(function(){
    console.log("el muñeco dejo de correr")

       game.tweens.removeAll();
     astro.animations.stop(null,true);



   });
}




function jump(){

// astro.body.moves=false;
   var tween= game.add.tween(astro).to({ y: astro.y-100},1500, Phaser.Easing.Linear.None, true)

   tween.onComplete.add(function(){
    console.log("el muñeco dejo de saltar")
     game.tweens.removeAll();
     astro.animations.stop(null,true);

   });

}

function AlterGravity(){
gravity=gravity*-1;

setTimeout(function(){astro.body.angle+=180;},100);


//astro.body.moves=false;


}


//this is  THE MAIN FUNCTION, it is a recursive method that will call itself eachtime there an action left in the queue.
function  Action(queue){
//for (var i=0; i<=queue.length-1; ++i){

setTimeout(function(){

ActionCase(queue[contador]);
contador+=1;
if(contador<queue.length){

Action(queue);


}

},1600);

//}

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




    }
            }




//ONLY  USE FOR TESTING.
function update(){
 if(unasolavez!=false){
// Action()

// run();

 unasolavez=false;
 }



game.physics.p2.gravity.y = gravity;

// go(5);
//     setTimeout(jump, 2000);


}






// FUNCTION FOR CANVAS

// function draw() {
//     background.src = "background.jpg"
//     astronaut.src = "astronaut_walking_"+position+".png";
//     ctx.drawImage(background, 0, 0);
//     ctx.drawImage(astronaut, x, y);
// }




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





// function update() {
//     draw();
// }




// function start() {
//     canvas = document.getElementById("background");
//     ctx = canvas.getContext("2d");
//     return setInterval(update, 1);
// }

// start();



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
        var instructions = ["go", "goLeft", "goRight", "alterGravity"];
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