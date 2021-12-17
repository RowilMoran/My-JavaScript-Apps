//grab glider to print movie trending.
const gliderInDOM = document.querySelector(".glider"),
//content on discover section
    discoverSection = document.querySelector(".discover-content"); 


const APIkey = "dfc99425a12f334b1e9917f2c257bb50";
const baseUrl = "https://api.themoviedb.org/3"

//glider fetchUrl (movie trending)
const movieTrending = baseUrl + "/trending/movie/week?api_key=" + APIkey;

//"popular" data on discover menu 
const popularData = baseUrl + `/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;

//"random " data on discover menu 
const movieData =  baseUrl + `/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`;

//"tv series" data on discove menu"
const tvSeriesData = baseUrl + `/tv/popular?api_key=${APIkey}&language=en-US&page=1`;

//search movie
const searchMovieUrl = baseUrl + "/search/movie?api_key="+ APIkey;
/* 
https://api.themoviedb.org/3/search/movie?api_key=

*/
//show glider
async function gliderData() {
    try{
        let response = await fetch(movieTrending),
            jsonResponse = await response.json();

            if(!response.ok) throw {status:response.status, statusText: response.statusText};
            jsonResponse.results.forEach(element => {
                //poster container
                const posterDiv = document.createElement("div");
                //poster
                const posterImg = document.createElement("img");
                posterImg.setAttribute("src", `https://image.tmdb.org/t/p/w300${element.poster_path}`);
                posterDiv.appendChild(posterImg);
                //vote average
                const score = document.createElement("p");
                score.innerText = element.vote_average;
                posterDiv.appendChild(score)
                
                gliderInDOM.insertAdjacentElement("afterbegin", posterDiv);
            }); 
             
             new Glider(document.querySelector('.glider'), {
                slidesToShow: 5.5,
                slidesToScroll: 1,
                dots: '.dots',
                draggable: true,
                rewind:true,    
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            })
        } catch (error){
            //console.log(error)
            let message = error.statusText || "Not found";
        }
    }
   
    
   //get Data of popular & new content
   async function getDiscoverData(url) {
       try {
        let response = await fetch(url),
            jsonResponse = await response.json();
           
            if(!response.ok) throw {status:response.status, statusText: response.statusText};
            if (jsonResponse.results.length === 0) {
                discoverSection.innerHTML = `<p class = "not-found">Try somthing else<p>`
            } else  {
                jsonResponse.results.forEach(movie => {
                    let posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
                    let posterImg = document.createElement("img");
                    (movie.poster_path === null) ? posterImg.setAttribute("src", "Resources/movieSearch/not-abilable.jpg") : posterImg.setAttribute("src", posterUrl);
                    discoverSection.appendChild(posterImg);
                    discoverMore();
                })
            }
        } catch (error){
            let message = error.statusText || "Not found";
            console.log(message);
        }
    }
    
    
    //show corresponding content
    function showContent() {
        document.querySelectorAll(".discover-nav button").forEach(button => {
            button.addEventListener("click", e=> {
                document.querySelector(".discover-content").innerHTML = ""; 
                showStyleOnclick(e);
                const id = e.target.dataset.id;
                if (id === "newAndPopular") getDiscoverData(popularData);
                if (id === "movies") getDiscoverData(movieData);
                if (id === "tvSeries") getDiscoverData(tvSeriesData) ;
            })
        })
        
        document.querySelector('[data-id= "newAndPopular"]').click();
    }

    //load functions when page is loaded
    document.addEventListener("DOMContentLoaded", e => {
        gliderData();
        showContent();
    });


function searchMovie() {
    const form = document.querySelector(".search-form");
    
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        discoverSection.innerHTML="";
        let movieInput = document.getElementById("search").value;
        getDiscoverData(searchMovieUrl+"&query="+movieInput)
        document.querySelectorAll(".discover-nav button").forEach(button=> {
            button.classList.remove("active")
        })
        e.target.reset();
    })
}


    
 
//Active style on discover section menú 
function showStyleOnclick(e) {
    document.querySelectorAll(".discover-menu button").forEach(el=> {
        el.classList.remove("active")
    });
    e.target.classList.add("active");
}

//hamburger menú
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");
document.addEventListener("click", e => {
    if (e.target.matches(".hamburger")) {
        hamburger.classList.toggle("is-active");
        menu.classList.toggle("show");
    }
});



//load more function     
function discoverMore() {
        const items = document.querySelectorAll(".discover-content img"),
        hiddenItems = document.getElementsByClassName("hidden-style"),
        discoverMoreButton = document.querySelector(".discover-section button");

    items.forEach((item, index) => {
        if (index > 10 - 1) {
            item.classList.add("hidden-style");
        }
    })
    
    discoverMoreButton.addEventListener("click", e => {
        for (let img of hiddenItems) {
            img.classList.remove("hidden-style");
        }
        if(hiddenItems.length === 0) {
            discoverMoreButton.style.display= "none";
        }
    });

    discoverMoreButton.style.display= "block";
    
}





searchMovie()

/* 
var loadMore = document.getElementById("loadMore");
maxItems = 4;
loadItems = 4;
hiddenClass = "hiddenStyle";
hiddenItems = Array.from(document.querySelectorAll(".hiddenStyle"));

items.forEach(function (item, index) {
  console.log(item.innerText, index);
  if (index > maxItems - 1) {
    item.classList.add(hiddenClass);
  }
});

loadMore.addEventListener("click", function () {
  [].forEach.call(document.querySelectorAll("." + hiddenClass), function (
    item,
    index
  ) {
    if (index < loadItems) {
      item.classList.remove(hiddenClass);
    }

    if (document.querySelectorAll("." + hiddenClass).length === 0) {
      loadMore.style.display = "none";
    }
  });
});



*/