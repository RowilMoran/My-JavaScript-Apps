//element where the new card will be placed
const cardsContainers = document.querySelector(".card-containers");
// grap cards
const cardDom = document.querySelectorAll(".card")
//input name of new list 
const titleInput = document.getElementById("title-form");
//input name of the new resource
const resourceName = document.getElementById("resource-name");
//input of link of new resource
const link =document.getElementById("resource-link");
//input of description of new resource
const resourceDesc = document.getElementById("resource-desc");
//popup
const inputPopUp = document.querySelector(".input-popup");


//this array will store all the cards with the data.

let cards = [
    {
        card: {
            title: "Free Stock Photos", 
            id: 134978,
            resources: {
                "Pexels": {
                    name: "Pexels",
                    link: "https://www.pexels.com/",
                    desc: "The best free stock photos, royalty free images & videos shared by creators."
                },
                "Reshot": {
                    name: "Reshot",
                    link: "https://www.reshot.com/",
                    desc: "Design freely with instant downloads and commercial licenses. No cost. No attribution. No worries."
                },
                "Freepik": {
                    name: "Freepik",
                    link: "https://www.freepik.com/",
                    desc: "Graphic resources for everyone"
                },
                "Pixabay": {
                    name: "Pixabay",
                    link: "https://pixabay.com/",
                    desc: "Stunning free images & royalty free stock"
                },
                "Picspree": {
                    name: "Picspree",
                    link: "https://picspree.com/en",
                    desc: "Discover and download beautiful royalty free images, stock photos, illustrations, and vectors"
                }
            }
        }
    },
    {
        card: {
            title: "Improve Skills as a Developer", 
            id: 1348978,
            resources: {
                "Coderbyte": {
                    name: "Coderbyte",
                    link: "https://coderbyte.com/",
                    desc: "Challenge yourself to code and interview better."
                },
                "Frontend Practice": {
                    name: "Frontend Practice",
                    link: "https://www.frontendpractice.com/",
                    desc: "Take your frontend skills to the next level by recreating real websites."
                },
                "100 days Css": {
                    name: "100 days Css",
                    link: "https://100dayscss.com/how-to/",
                    desc: "The homepage shows every day a different challenge which you can complete."
                },
                "cssbattle": {
                    name: "cssbattle",
                    link: "https://cssbattle.dev/",
                    desc: "CSS code-golfing game is here! Use your CSS skills to replicate targets with smallest possible code."
                },
                "Codewell": {
                    name: "Codewell",
                    link: "https://www.codewell.cc/",
                    desc: "Improve your HTML and CSS skills by practicing on real design templates."
                }
            }
        }
    },
    {
        card: {
            title: "Css Code Generator", 
            id: 34934178,
            resources: {
                "Grid layoutit": {
                    name: "Grid layoutit",
                    link: "https://grid.layoutit.com/",
                    desc: "Generate the layout of your site"
                },
                "Button Generator": {
                    name: "Button Generator",
                    link: "https://cssbuttongenerator.com/",
                    desc: "Generate your buttons with no code."
                },
                "Fancy Border Generator": {
                    name: "Fancy Border Generator",
                    link: "https://9elements.github.io/fancy-border-radius/#52.82.65.30--.",
                    desc: "Don't be boring, get cool borders easily."
                },
                "cssbattle": {
                    name: "Key Frames (Animation)",
                    link: "https://keyframes.app/",
                    desc: "Dead simple visual tools to help you generate CSS for your projects."
                },
                "Clip Path Maker": {
                    name: "Clip Path Maker",
                    link: "https://bennettfeely.com/clippy/",
                    desc: "Improve your HTML and CSS skills by practicing on real design templates."
                }
            }
        }
    },
    {
        card: {
            title: "Lack of Inspiration?", 
            id: 174146747,
            resources: {
                "Dribble": {
                    name: "Dribble",
                    link: "https://dribbble.com/",
                    desc: "Dribbble is the world’s leading community for creatives to share, grow, and get hired."
                },
                "Muzli": {
                    name: "Muzli",
                    link: "https://muz.li/?ref=designresourc.es",
                    desc: "The best design inspiration - expertly curated for you."
                },
                "Mobin": {
                    name: "Mobin",
                    link: "https://mobbin.design/browse/ios/apps",
                    desc: "Save hours of UI & UX research with our library of 50,000+ fully searchable mobile app screenshots."
                },
                "Ui Sources": {
                    name: "Ui Sources",
                    link: "https://www.uisources.com/?affiliate_id=733443187",
                    desc: "Interactions from the best designed and top grossing apps"
                },
                "Nicely Done": {
                    name: "Nicely Done",
                    link: "https://nicelydone.club/?ref=designresourc.es",
                    desc: "The largest screen examples & user flows library from web applications"
                }
            }
        }
    }
];

   //event listener on forms, user add new card title and new resource to a new card.
   document.addEventListener("submit", e => {
       //this event generate new card.
       if (e.target.matches(".newCardForm")) {
           e.preventDefault();
           addNewCard(titleInput.value);
        }
        //this event generate new resource on card.
        if (e.target.matches(".resource-form")) {
            e.preventDefault();
            addNewResource(e,resourceName.value,link.value, resourceDesc.value);
            inputPopUp.classList.remove("show");
        }
    });
    
    //function to add new card
 function addNewCard(titleCard) {
        if (titleCard !== "") {
            let newCard  ={card:{
                title: titleCard,
            id: Date.now(),
            resources:{}
        } } 
        
        cards.push(newCard);
        addToLocalStorage(cards);
        titleInput.value = "";
    }
}

//function add new resource to card
function addNewResource(e,name,link, desc, id) {
    
    if (link !== "" && desc !== "") {
        const innerTitle = e.target.firstElementChild.firstElementChild.innerText;
        let resource = {name:name, link: link, desc: desc, id: id };
        cards.forEach(element => {
            if(innerTitle == element.card.title) {
                element.card.resources[`"${name}"`] = resource;
                addToLocalStorage(cards);
            }
        });
    }
}



//render new card 
function renderNewCard(array) {
    cardsContainers.innerHTML = "";
    
    
    array.forEach(el => {
        
        const card = document.createElement("div");
        const titleContainer = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const titleBtn = document.createElement("button");
        const btnImg = document.createElement("img");
        //create delete button 
        const deleteContainer = document.createElement("div");
        const deleteButton = document.createElement("button");
        //generate different bg colors
        differentBackgrounds(titleContainer) 
        //style classes and atr to title
        card.classList.add("card");
        card.setAttribute("data-id", el.card.id)
        titleContainer.classList.add("card-title");
        titleBtn.classList.add("reset-btn");
        titleBtn.classList.add("add-resource");
        btnImg.setAttribute("src", "/Resources/saveYourResources/icons/white-plus.png");
        //add class to card body
        cardBody.classList.add("card-body");
        //style classes and atr to delete btn
        deleteContainer.classList.add("card-footer");
        deleteButton.innerText = "Delete List";
        deleteButton.classList.add("card-delete-btn")
        //get user input
        cardTitle.innerText = el.card.title;
        //append to DOM
        titleContainer.appendChild(cardTitle);
        titleBtn.appendChild(btnImg);
        titleContainer.appendChild(titleBtn);
        card.appendChild(titleContainer);
        card.appendChild(cardBody);
        //append delete btn (card Footer)
        deleteContainer.appendChild(deleteButton);
        card.appendChild(deleteContainer);
        cardsContainers.appendChild(card);
    }); 
}


//render resources in corresponding card
function renderResource(array) {
    //element where the body of the card (resources) will be placed
    const bodyCardContainer = document.querySelectorAll(".card-body");
    bodyCardContainer.forEach(e => {
        e.innerText = ""
    })
    const cardTitle = document.querySelectorAll(".card-title h3");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < cardTitle.length; j++) {
            if (array[i].card.title === cardTitle[j].innerText) {
                const resourcesInCard = array[i].card.resources;
                const bodyCard = cardTitle[j].parentElement.nextElementSibling;
                Object.keys(resourcesInCard).forEach(e=> {
                    const resourceContainer = document.createElement("div")
                    const linkContainer = document.createElement("div");
                    const resourceLink = document.createElement("a");
                    const actionBtnContainer = document.createElement("div");
                    const copyBtn = document.createElement("button");
                    const trashBtn = document.createElement("button");
                    const copyImg = document.createElement("img");
                    const trashImg = document.createElement("img");
                    const description = document.createElement("p");
                    
                    //resource Container
                    resourceContainer.classList.add("resource-container");
                    resourceContainer.setAttribute("data-name", resourcesInCard[e].name)
                    
                    //link container 
                    linkContainer.classList.add("link-container");
                    resourceContainer.appendChild(linkContainer);
                    
                    //resource Link 
                    resourceLink.setAttribute("href", resourcesInCard[e].link);
                    resourceLink.setAttribute("target", "_blank");
                    resourceLink.innerText = resourcesInCard[e].name;
                    linkContainer.appendChild(resourceLink);
                    
                    // action buttons container
                    actionBtnContainer.classList.add("action-btns");
                    linkContainer.appendChild(actionBtnContainer);
                    
                    //add img to buttons
                    copyImg.setAttribute("src", "/Resources/saveYourResources/icons/copyToClickboard.svg");
                    trashImg.setAttribute("src", "/Resources/saveYourResources/icons/trash-can.svg");
                    copyBtn.appendChild(copyImg);
                    trashBtn.appendChild(trashImg);
                    
                    //action buttons
                    copyBtn.classList.add("reset-btn");
                    copyBtn.classList.add("copy-btn");
                    trashBtn.classList.add("reset-btn");
                    trashBtn.classList.add("trash-btn");
                    actionBtnContainer.appendChild(copyBtn);
                    actionBtnContainer.appendChild(trashBtn);
                    
                    //resource description
                    description.innerText = (resourcesInCard[e].desc);
                    resourceContainer.appendChild(description);
                    
                    //insert resource
                    bodyCard.appendChild(resourceContainer);
                    
                });
            }
        }
    }    
}

//Generate background colors
function differentBackgrounds(div) {
    const cardTitle = document.querySelectorAll(".card-title");
    
    if (cardTitle.length > 0)  {
        let lastCard=cardTitle[cardTitle.length-1];
        let background = window.getComputedStyle(lastCard).backgroundColor;
        let newBackground = {
            red: "rgb(242, 74, 51)",
            blue: "rgb(35, 78, 178)",
            gray: "rgb(55, 71, 79)"
        }
        
        if(background === newBackground.red) {
            div.style.backgroundColor = newBackground.blue;
        } else if (background === newBackground.blue) {
            div.style.backgroundColor = newBackground.gray;
        } else {
            div.style.backgroundColor=newBackground.red;
        } 
    }
}

// events on click 
document.addEventListener("click", e => {
    //event to delete the whole card with resources inside
    if (e.target.matches(".card-delete-btn")) {
        deleteList(e.target.parentElement.parentElement);
    }
    //active the popup to enter the new resource inputs 
    if (e.target.matches(".add-resource")) {
        const titleInInput = document.querySelector(".new-resource-title");
        const titleCardValue = e.target.parentElement.innerText;
        titleInInput.innerText = titleCardValue;
        inputPopUp.classList.add("show");   
    } 
    //copy link to clickboard
    if (e.target.matches(".copy-btn")) {
        copyToClipBoard(e);
    }
    
    //delete resource
    if (e.target.matches(".trash-btn")) {
        deleteResource(e.target.parentElement.parentElement.parentElement)
    }
});

//function copy to clikboard
function copyToClipBoard(e) {
    
    const copyLink = e.target.parentElement.parentElement.children[0].getAttribute("href");
    
    console.log(copyLink);
    navigator.clipboard.writeText(copyLink);
    alert("Copied the text: " + copyLink);
    
}


//delete list function
function deleteList(clickedCard) {
    let deleteConfirmation = confirm("Are you sure you want to the delete the whole list?");
    if (deleteConfirmation) {
        clickedCard.remove();
        cards = cards.filter(el => {
            return el.card.id != clickedCard.getAttribute("data-id");
        }); 
        addToLocalStorage(cards)
    }
} 

//delete resource function
function deleteResource(selectedResource) {
    console.log(selectedResource)
    let deleteConfirmation = confirm("Are you sure you want to the delete this resource?");
    if (deleteConfirmation) {
        cards.forEach(el=> {
            const resources = el.card.resources;
            for (let i in resources) {
                if (resources[i].name ==  selectedResource.getAttribute("data-name")) {
                    delete resources[i];
                    addToLocalStorage(cards)
                }
            }
        });       
    }
} 

//add cards to loca storage

function addToLocalStorage(array) {
    // conver the array to string then store it.
    localStorage.setItem('cards', JSON.stringify(array));
    // render them to screen
    renderNewCard(cards);
    renderResource(cards);
}

//render info in local storage

function getFromLocalStorage() {
    const reference = localStorage.getItem('cards');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        cards = JSON.parse(reference);
        renderNewCard(cards);
        renderResource(cards);
    }
}

// initially get everything from localStorage
document.addEventListener("DOMContentLoaded", e => {
    getFromLocalStorage();
    addToLocalStorage(cards);
});





