//lets Grap html tags and classes
const cardsContainer = document.querySelector(".cards-container");
const playerLivesCount = document.querySelector(".lives-value");
const gameContainer = document.querySelector(".game-container")

let lives = 17;

//link lives to html
playerLivesCount.innerHTML = lives;

//generate the data(cards imgs)

const getImgs = () => 
[
    {imgSrc: "./Resources/memoryCard/bee.png", name: "bee"},
    {imgSrc: "./Resources/memoryCard/blackfire.png", name: "blackfire"},
    {imgSrc: "./Resources/memoryCard/cybor.png",  name: "cyborg"},
    {imgSrc: "./Resources/memoryCard/beast.png",name: "beast"},
    {imgSrc: "./Resources/memoryCard/raven.png", name: "raven"},
    {imgSrc: "./Resources/memoryCard/robin.png", name: "robin"},
    {imgSrc: "./Resources/memoryCard/starfire.png", name: "starfire"},
    {imgSrc: "./Resources/memoryCard/rose.png", name: "rose"},
    {imgSrc: "./Resources/memoryCard/bee.png", name: "bee"},
    {imgSrc: "./Resources/memoryCard/blackfire.png", name: "blackfire"},
    {imgSrc: "./Resources/memoryCard/cybor.png",  name: "cyborg"},
    {imgSrc: "./Resources/memoryCard/beast.png",name: "beast"},
    {imgSrc: "./Resources/memoryCard/raven.png", name: "raven"},
    {imgSrc: "./Resources/memoryCard/robin.png", name: "robin"},
    {imgSrc: "./Resources/memoryCard/starfire.png", name: "starfire"},
    {imgSrc: "./Resources/memoryCard/rose.png", name: "rose"}
];

// pro images 

const getProImgs = () => 
[
    {imgSrc: "./Resources/memoryCard/bee.png", name: "bee"},
    {imgSrc: "./Resources/memoryCard/blackfire.png", name: "blackfire"},
    {imgSrc: "./Resources/memoryCard/cybor.png",  name: "cyborg"},
    {imgSrc: "./Resources/memoryCard/beast.png",name: "beast"},
    {imgSrc: "./Resources/memoryCard/raven.png", name: "raven"},
    {imgSrc: "./Resources/memoryCard/robin.png", name: "robin"},
    {imgSrc: "./Resources/memoryCard/starfire.png", name: "starfire"},
    {imgSrc: "./Resources/memoryCard/rose.png", name: "rose"},
    {imgSrc: "./Resources/memoryCard/bee.png", name: "bee"},
    {imgSrc: "./Resources/memoryCard/blackfire.png", name: "blackfire"},
    {imgSrc: "./Resources/memoryCard/cybor.png",  name: "cyborg"},
    {imgSrc: "./Resources/memoryCard/beast.png",name: "beast"},
    {imgSrc: "./Resources/memoryCard/raven.png", name: "raven"},
    {imgSrc: "./Resources/memoryCard/robin.png", name: "robin"},
    {imgSrc: "./Resources/memoryCard/starfire.png", name: "starfire"},
    {imgSrc: "./Resources/memoryCard/rose.png", name: "rose"},
    //doble the images
    {imgSrc: "./Resources/memoryCard/bad-boy-1.png", name: "bad-boy-1"},
    {imgSrc: "./Resources/memoryCard/bad-boy-2.png", name: "bad-boy-2"},
    {imgSrc: "./Resources/memoryCard/ciclo.png",  name: "ciclo"},
    {imgSrc: "./Resources/memoryCard/flash-boy.png",name: "flash-boy"},
    {imgSrc: "./Resources/memoryCard/gizmo.png", name: "gizmo"},
    {imgSrc: "./Resources/memoryCard/hive.png", name: "hive"},
    {imgSrc: "./Resources/memoryCard/pet.png", name: "pet"},
    {imgSrc: "./Resources/memoryCard/robin-2.png", name: "robin-2"},
    {imgSrc: "./Resources/memoryCard/bad-boy-1.png", name: "bad-boy-1"},
    {imgSrc: "./Resources/memoryCard/bad-boy-2.png", name: "bad-boy-2"},
    {imgSrc: "./Resources/memoryCard/ciclo.png",  name: "ciclo"},
    {imgSrc: "./Resources/memoryCard/flash-boy.png",name: "flash-boy"},
    {imgSrc: "./Resources/memoryCard/gizmo.png", name: "gizmo"},
    {imgSrc: "./Resources/memoryCard/hive.png", name: "hive"},
    {imgSrc: "./Resources/memoryCard/pet.png", name: "pet"},
    {imgSrc: "./Resources/memoryCard/robin-2.png", name: "robin-2"}
]

let easyImgs = getImgs();
let proImgs = getProImgs();
let arraySelected = [];


//randomize the images 
const random = (array) => {
    array.sort(() => Math.random()- 0.5);
    return  array;
}



//choose difficulty 
document.addEventListener("click", e => {
    let difficulty = document.querySelector('input[name="difficulty"]:checked').value
    if (e.target.matches("#btn")) {
        if (difficulty === "easy"){
            arraySelected = easyImgs;
            random(arraySelected);
            gameContainer.classList.add("show");
            cardGenerator();
        } else if (difficulty === "pro") {
            arraySelected = proImgs;
            random(arraySelected);
            gameContainer.classList.add("show");
            cardGenerator();
        }
    }
})




//generate cards in html
const cardGenerator = () => {
    //start the iteration to create elements of each image.
    arraySelected.forEach((item) => {
        let card = document.createElement("div");
        let front = document.createElement("img");
        let back = document.createElement("div");
        
        //add classes and src to elements
        card.classList.add("card");
        front.src = item.imgSrc;
        front.classList.add("front")
        back.classList.add("back");
        //set the name of the image to a "name" atribute in card div
        card.setAttribute("name", item.name)
        //insert new elements in the DOM
        cardsContainer.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        
        //clock events when the card is clicked
        card.addEventListener("click", (e) => {
            card.classList.add("rotate");
            //this class is generated to compare the two clicked cards 
            card.classList.add("flipped");
            //invoque a check card function
            checkCards(e)
        });  
    });
    //insert at dom depend of the difficulty selected
    if (arraySelected.length === 16) {
        cardsContainer.classList.add("easy");
    } else {
        cardsContainer.classList.add("pro");
    }
}



//this function compare the two clicked cards.
const checkCards = e => {
    
    //when a card is clicked, flipped class is added. we are grabbing them.
    const flippedCards = document.querySelectorAll(".flipped");
    // grab rotate
    const rotate = document.querySelectorAll(".rotate");
    
    //compare the flipped cards
    if (flippedCards.length === 2) {
        //check match
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else { 
            //if they dont match
            flippedCards.forEach((card) => {
               card.classList.remove("flipped");
               setTimeout(() => {
                card.classList.remove("rotate");
               },900)
           });

           //update lives
           lives --;
            playerLivesCount.innerHTML = lives;
            //reset the game after loosing.
            if (lives === 0) {
                let lostPopUp = document.querySelector(".lost");
                lostPopUp.classList.add("show");
                setTimeout(() => {
                    lostPopUp.classList.remove("show");
                    gameContainer.classList.remove("show");
                    reset();
                }, 3000);
            }
        }
    } 

    if(arraySelected.length === 16) {
        if (rotate.length === 16) {
            let winGame = document.querySelector(".win");
            winGame.classList.add("show");
            setTimeout(() => {
                reset();
                winGame.classList.remove("show");
                gameContainer.classList.remove("show");
            }, 4000);
        }
    } else if (arraySelected.length === 32){
        if (rotate.length === 32) {
            let winGame = document.querySelector(".win");
            winGame.classList.add("show");
            setTimeout(() => {
                reset();
                gameContainer.classList.remove("show");
                winGame.classList.remove("show");
            }, 4000);
        }
    }

   
}


//reset function when lost and won the game
const reset = () => {
    
    
    let card= document.querySelectorAll(".card");
    let faces = document.querySelectorAll(".front");
    cardsContainer.classList.remove("easy");
    cardsContainer.classList.remove("pro");
    cardsContainer.textContent = "";
    
    
    //place the images randomly in the DOM with the respective name.
    arraySelected.forEach((item, index) => {

        card[index].classList.remove("rotate");
        card[index].style.pointerEvents ="all";
        card[index].setAttribute("name", item.name);
        faces[index].src = item.imgSrc;
       
    });

    lives = 17;

    playerLivesCount.textContent = lives;
   
}



//hamburguer

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");
console.log(hamburger)
document.addEventListener("click", e => {
    if (e.target.matches(".hamburger")) {
        hamburger.classList.toggle("is-active");
        menu.classList.toggle("show")
    }
});




