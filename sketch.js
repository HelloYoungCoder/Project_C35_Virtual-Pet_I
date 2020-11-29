// Project 35: Virtual Pet - I

//Create variables here
var database;
var dog, happyDog, foodServe, foodStock;
var dogImg, happyDogImg;

//Load images for dog
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg.png")
}

function setup() {
  createCanvas(500, 500);
  
  //Configure database
  database = firebase.database();

  //Create dog sprite
  dog = createSprite(250, 300);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  //Ref: a specific location in your Database & used it for reading or writing data to that Database location.
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(82, 156, 114);

  drawSprites();
  //add styles here

  textSize(20);
  fill("cream");
  text("Press Up Arrow Key to Feed Milk!!", 125, 50);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodServe);
    textSize(18);
    dog.addImage(happyDogImg);
  }

  if(foodServe !== undefined){
    textSize(15);
    text("Foods Remaining : "+foodServe, 200, 125);
  }

}

function readStock(data) {
  foodServe = data.val();
}

function writeStock(x) {

  if (x <= 0){
    x = 0;
  }else {
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  })

}

