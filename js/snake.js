//we start by getting the canvas from the html

const canvas = document.getElementById("canvas");

//then we create a drawing object for the canva

const ctx = canvas.getContext("2d");

//getting the popup we are using when loosing the game
const popup = document.getElementById("pop-up");

//we load our img and sound
let imageName = new Image();
imageName.src = "Resources/snake/mango.png"
let audioEat = new Audio();
audioEat.src = "Resources/snake/sound.mp3";
let groundImg = new Image();
groundImg.src = "Resources/snake/ground.png";
let crashSound = new Audio();
crashSound.src = "Resources/snake/crash.mp3"

//save the score in a variable

let score = 0;

//we make a unit named "box" that represent 32px

let box = 32;

//we save the snake coords in arrays to access later in draw function

let snake = [];
snake[0] = {x: 9*box, y: 10*box};

//we randomly create the value of the food coordnates

let food = {
    x:Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//control the snake

let d;

function direction(event) {
    if (event.keyCode === 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
    } else if (event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode === 40 && d !== "UP"){
        d = "DOWN";
    }
} 


//check colission 

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


//we create a draw function

function draw() {
 
    // place the background of the canva
    ctx.drawImage(groundImg, 0, 0);

    // loop through the array with conditionals to identify the head and the body of the snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i===0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        ctx.strokeStyle =  "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //Place food in canva
    ctx.drawImage(imageName, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //then we create an eventListener for keyDown

    document.addEventListener("keydown", direction);

    //wich direction

    if (d === "LEFT") snakeX -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "UP") snakeY -= box;
    if (d === "DOWN") snakeY += box;

   
    // when the snake eat 

    if (snakeX === food.x && snakeY === food.y)  {
        score++;
        audioEat.play()
        food = {
            x:Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //new head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    //game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(snakeGame);
        crashSound.play();
        popup.classList.toggle("show");
        //reload the page after 2.5seg
        setTimeout(() => {
            location.reload();
        }, 2500);
    }
    
    //add new head
    snake.unshift(newHead);


    //create the score in top of canva
    ctx.fillStyle = "white";
    ctx.font =  "45px Changa One";
    ctx.fillText(score, 2.4*box, 1.6 * box);

}


//select the speed of the snake
const btn = document.getElementById("btn")
let level = document.getElementsByName('level');
let interval;
let snakeGame;

btn.addEventListener("click", e => {
    e.preventDefault()
    for (let i = 0; i < level.length; i++) {
        if (level[i].checked) {
            interval = (level[i].value);
            snakeGame = setInterval(draw,interval)
        }
    } 
    //Show the canva on screen
    document.querySelector(".canvas").classList.toggle("show")
})


//hamburguer menú events
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");
document.addEventListener("click", e => {
    if (e.target.matches(".hamburger")) {
        hamburger.classList.toggle("is-active");
        menu.classList.toggle("show");
    }
});









