//grab glider to print movie trending.
const gliderInDOM = document.querySelector(".glider"),
//content on discover section
    discoverSection = document.querySelector(".discover-content"),
//pagination
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    current = document.querySelector(".current");

let currentPage = 1,
    nextPage    = 2,
    prevPage    = 3,
    lastUrl     = "",
    totalPage   = 100;



const APIkey = "dfc99425a12f334b1e9917f2c257bb50";
const baseUrl = "https://api.themoviedb.org/3"
const genreList = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

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
           lastUrl     = url;
           let response = await fetch(url),
           jsonResponse = await response.json();
           
           if(!response.ok) throw {status:response.status, statusText: response.statusText};
           if (jsonResponse.results.length === 0) {
               discoverSection.innerHTML = `<p class = "not-found">Try somthing else<p>`
            } else  {
                renderInfo(jsonResponse.results);

                currentPage = jsonResponse.page,
                nextPage    =  currentPage + 1,
                prevPage    =  currentPage - 1,
                totalPage   = jsonResponse.total_pages;
                
                document.querySelector(".current-pag").innerText = currentPage
                if (currentPage <= 1) {
                    discoverMore();
                    prev.classList.add("disable");
                    next.classList.remove("disable");
                } else if (currentPage >= totalPage) {
                    next.classList.add("disable");
                    prev.classList.remove("disable");
                } else {
                    next.classList.remove("disable");
                    prev.classList.remove("disable");
                }
                
            }
        } catch (error){
            let message = error.statusText || "Not found";
            console.log(message);
        }
    }

    //render info
    function renderInfo(data) {
        console.log(data)
        data.forEach(movie => {
         const {title, poster_path, vote_average, overview, release_date, genre_ids,first_air_date, name, vote_count,backdrop_path} = movie;
         const posterUrl = "https://image.tmdb.org/t/p/w300";
         const bgUrl = "https://image.tmdb.org/t/p/w500";
         //card container
         const cardContainer = document.createElement("div")
         cardContainer.classList.add("card-container") 
         
         //render
        const poster = poster_path === null ?  "Resources/movieSearch/not-abilable.jpg" :  posterUrl + poster_path; 
            cardContainer.innerHTML = `
        
            <div class ="overview"> 
                <div class ="overview-container" style = "background-image: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${bgUrl+backdrop_path});">
                    <div class="overview-info">
                        <h3>${title ? title : name}</h3>
                        <p class ="vote-overview">${vote_count} votes</p>
                        <p class ="over-desc">${overview}</p>
                        <button class="return-btn">Return to App</button>
                    </div>
                </div>
            </div>
            <figure>
                <div class = "img-container">
                    <img src= "${poster}" alt="${title ? title : name}">
                    <p class = "vote">${vote_average}</p>
                </div>
                <figcaption class = "title-genre">
                    <div class = "year-genre">
                        <p class = "release">${ first_air_date ? first_air_date.split("-")[0] : release_date.split("-")[0] } </p>
                        <span>/</span>
                        <p class = "genre">${ getGenrers(genreList,genre_ids) }</p>
                    </div>
                    <h4>${title ? title : name}</h4>
                </figcaption>
            </figure>
            `
            discoverSection.appendChild(cardContainer);
        });
      document.querySelectorAll("figure").forEach(card=> {
          card.addEventListener("click", el => {
              let overview =  el.target.previousElementSibling;
              overview.classList.add("show");
            });
        });

        //close overview
        document.querySelectorAll(".return-btn").forEach(button=> {
            button.addEventListener("click", e=> {
                document.querySelectorAll(".overview").forEach(overview=> {
                    overview.classList.remove("show")
                })
            })
        })
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
        searchMovie();
    });


function searchMovie() {
    const form = document.querySelector(".search-form");
    
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        discoverSection.innerHTML="";
        let movieInput = document.getElementById("search").value;
        getDiscoverData(searchMovieUrl+"&query="+movieInput+"&page=1");
        document.querySelectorAll(".discover-nav button").forEach(button=> {
            button.classList.remove("active")
        })
        e.target.reset();
    })
}

//pagination events
next.addEventListener("click", () => {
    if (nextPage <= totalPage) {
        pageCall(nextPage);
        setTimeout(()=> {document.querySelector(".discover").scrollIntoView({behavior : "smooth"});}, 100);
    }
})


prev.addEventListener("click", () => {
    if (prevPage >= 0) {
        pageCall(prevPage);
        setTimeout(()=> {document.querySelector(".discover").scrollIntoView({behavior : "smooth"});}, 100);
    }
})


function pageCall(page) {
    discoverSection.innerHTML=""
   
    let urlSplit = lastUrl.split("?");
    let queryParamas = urlSplit[1].split("&");
    let key = queryParamas[queryParamas.length - 1].split("=");
    console.log(key)
    if (key[0] != "page") {
        let url = lastUrl + "&page=" + page;
        getDiscoverData(url)
    } else {
        key[1] = page.toString();
        let a = key.join("=");
        queryParamas[queryParamas.length - 1]  = a;
        let b =  queryParamas.join("&");
        let url = urlSplit[0] + "?" + b;
        getDiscoverData(url);
    }
}



    
 
//Active style on discover section menú 
function showStyleOnclick(e) {
    document.querySelectorAll(".discover-menu button").forEach(el=> {
        el.classList.remove("active")
    });
    e.target.classList.add("active");
}




//load more function     
function discoverMore() {
    const items = document.querySelectorAll(".card-container"),
    hiddenItems = document.getElementsByClassName("hidden-style"),
    discoverMoreButton = document.querySelector(".discover-btn");
    
    items.forEach((item, index) => {
        if (index > 10 - 1) {
            item.classList.add("hidden-style");
        }
    })
    discoverMoreButton.addEventListener("click", () => {
        items.forEach((item) => {
            item.classList.remove("hidden-style");  
        });
        if (hiddenItems.length === 0) {
            
            discoverMoreButton.style.display= "none";
            //show pagination
            
            document.querySelector(".pagination-container").style.display= "flex";
        }
    });
    
    discoverMoreButton.style.display= "block";
    //hide pagination as default
    document.querySelector(".pagination-container").style.display= "none";
    
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



//get genrers

function getGenrers(arr1,arr2) {
    let movieGenre = [];
    let movieString ="";
    let result = arr1.filter(o1 => arr2.some(o2 => o1.id === o2));
    result.forEach(e=> movieGenre.push(e.name));
    movieGenre.forEach(genre => movieString +=  genre + " ");
    return movieString.split(" ").slice(0 ,2 ).join(", ");
}