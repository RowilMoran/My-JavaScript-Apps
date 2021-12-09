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
    



