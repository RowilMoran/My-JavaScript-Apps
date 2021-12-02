//selectors
const addCard = document.querySelector(".create-btn");
const cardsContainers = document.querySelector(".card-containers");
const titleInput = document.getElementById("title-form");
/* const deleteCardBtn = document.querySelectorAll(".card-delete-btn"); */


//event listener

addCard.addEventListener("click", addNewCard);

//functions add card list
function addNewCard(e) {
    e.preventDefault();

    //create list Title
    const card = document.createElement("div");
    const titleContainer = document.createElement("div");
    const cardTitle = document.createElement("h3");
    const titleBtn = document.createElement("button");
    const btnImg = document.createElement("img");
    //create delete button 
    const deleteContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    //generate different bg colors
    differentBackgrounds(titleContainer);
    //style classes and atr to title
    card.classList.add("card");
    titleContainer.classList.add("card-title");
    titleBtn.classList.add("reset-btn");
    titleBtn.classList.add("add-resource");
    btnImg.setAttribute("src", "/Resources/saveYourResources/icons/white-plus.png");
    //style classes and atr to delete btn
    deleteContainer.classList.add("card-footer");
    deleteButton.innerText = "Delete List";
    deleteButton.classList.add("card-delete-btn")
    //get user input
    cardTitle.innerText = titleInput.value
    //append to DOM
    titleContainer.appendChild(cardTitle);
    titleBtn.appendChild(btnImg);
    titleContainer.appendChild(titleBtn);
    card.appendChild(titleContainer);
    //append delete btn (card Footer)
    deleteContainer.appendChild(deleteButton);
    card.appendChild(deleteContainer);
    //prevent adding empty cards
    titleInput.value.length < 1 ?  console.error("menos de uno") : cardsContainers.appendChild(card);
    // reset input
    titleInput.value = "";
}


//event on delete card

document.addEventListener("click", deleteList);

function deleteList(e) {
    const clickedCard = e.target.parentElement.parentElement;
    if (e.target.matches(".card-delete-btn")) {
        confirm("Are you sure you want to the delete the whole list?");
        if (confirm) {
            clickedCard.remove();
        }
    } 
}

//event on add new resource

document.addEventListener("click", addNewResource);

function addNewResource(e) {
    const inputPopUp = document.querySelector(".input-popup");
    const titleInInput = document.querySelector(".new-resource-title");
    const newLink = document.getElementById("resource-link");
    const resourceDesc = document.getElementById("resource-desc");
    //show the inputs popup
    if (e.target.matches(".add-resource")) {
        titleInInput.innerText = e.target.parentElement.innerText;
        inputPopUp.classList.add("show");
    } 

    //add new resource
    if (e.target.matches("#createBtn")) {
        e.preventDefault(e);
        //iterate through h3 (card title)elements to know where to add the new resource
        const iterateTitle = document.querySelectorAll(".card-title h3");
        iterateTitle.forEach( el => {
    
            if(el.innerText === titleInInput.innerText) {
                const cardBody = document.createElement("div");
                const linkContainer = document.createElement("div");
                const resourceLink = document.createElement("a");
                const actionBtnContainer = document.createElement("div");
                const copyBtn = document.createElement("button");
                const trashBtn = document.createElement("button");
                const copyImg = document.createElement("img");
                const trashImg = document.createElement("img");
                const description = document.createElement("p");

                //card body class
                cardBody.classList.add("card-body");
                //link container append and classes
                linkContainer.classList.add("link-container");
                cardBody.appendChild(linkContainer);
                //atr to a link
                resourceLink.setAttribute("href", newLink.value);
                resourceLink.innerText = newLink.value;
                linkContainer.appendChild(resourceLink);
                // action buttons container
                actionBtnContainer.classList.add("action-btns");
                linkContainer.appendChild(actionBtnContainer);
                //action buttons
                copyBtn.classList.add("reset-btn");
                copyBtn.classList.add("copy-btn");
                trashBtn.classList.add("reset-btn");
                trashBtn.classList.add("trash-btn");
                actionBtnContainer.appendChild(copyBtn);
                actionBtnContainer.appendChild(trashBtn);
                //add img to buttons
                copyImg.setAttribute("src", "/Resources/saveYourResources/icons/copyToClickboard.svg");
                trashImg.setAttribute("src", "/Resources/saveYourResources/icons/trash-can.svg");
                copyBtn.appendChild(copyImg);
                trashBtn.appendChild(trashImg);
                //description
                description.innerText = resourceDesc.value;
                cardBody.appendChild(description);


                el.parentElement.insertAdjacentElement("afterend", cardBody);
                inputPopUp.classList.remove("show");
                newLink.value ="";
                resourceDesc.value ="";
            }
        });
    }
}


//copy to clipboardFunction

document.addEventListener("click", copyToClipBoard);

function copyToClipBoard(e) {
    if (e.target.matches(".copy-btn")) {
        //const copyLink = e.target.parentElement.parentElement.innerText;
        const copyLink = e.target.parentElement.parentElement.children[0].getAttribute("href");

        console.log(copyLink);
        navigator.clipboard.writeText(copyLink);
        alert("Copied the text: " + copyLink);
    }
}


//delete resource

document.addEventListener("click", deleteResource);

function deleteResource(e) {
    if (e.target.matches(".trash-btn")) {
        confirm("Are you sure you want to delete this resource?")
        if (confirm) {
            const removeResource = e.target.parentElement.parentElement.parentElement;
            removeResource.remove();
        }
    }
}

//generate card title backgrounds

function differentBackgrounds(div) {
    const cardTitle = document.querySelectorAll(".card-title");
    let lastCArd = cardTitle[cardTitle.length-1];
    let background = window.getComputedStyle(lastCArd).backgroundColor;
    let newBackground = {
        red: "rgb(242, 74, 51)",
        blue: "rgb(35, 78, 178)",
        gray: "rgb(55, 71, 79)"
    }
    
    if(background === newBackground.red) {
        div.style.backgroundColor= newBackground.blue;
    } else if (background === newBackground.blue) {
        div.style.backgroundColor=newBackground.gray;
    } else {
        div.style.backgroundColor=newBackground.red
    }
}


//local storage

document.addEventListener("DOMContentLoaded", savedResources) 

function savedResources() {
    localStorage.setItem("cards", "")
}





