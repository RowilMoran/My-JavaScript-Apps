(()=> {
    const xhr = new XMLHttpRequest(),
          $xhr = document.getElementById("xhr"),
          $fragment = document.createDocumentFragment();


    xhr.addEventListener("readystatechange", (e)=> {
        if(xhr.readyState !==4) return;

        if(xhr.status >= 200 && xhr.status <= 300){
            //console.log("exito");
            const json = JSON.parse(xhr.responseText);
           // console.log(json);

            json.forEach(el=> {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`
                $fragment.appendChild($li)
            });

            $xhr.appendChild($fragment)

        }else {
            let message = xhr.statusText || "Not found";
            $xhr.innerHTML = `${xhr.status} : ${message}`
        }
    });
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send();
})();
 
/* ****Fetch**** */

 (()=> {
    const $fetch = document.getElementById("fetch"),
          $fragment = document.createDocumentFragment();

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response)
    })
    .then((jsonResponse) => {
        jsonResponse.forEach(el=> {
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`
            $fragment.appendChild($li)
        });
            $fetch.appendChild($fragment)
    })
    .catch((error) => {
        //console.log(`esto es desde el error`, error);
        let message = error.statusText || "Not found";
        $fetch.innerHTML = `${error.status} : ${message}`
    })
    .finally(() => {
        //console.log(`esto se ejecuta independientemente del la respuesta`)
    })
})(); 

/* ****Async Away + Fetch**** */

(()=> {
    const $async = document.getElementById("async"),
           $fragment = document.createDocumentFragment();


    async function getData() {
        try{
            let response = await fetch('https://jsonplaceholder.typicode.com/users'),
                jsonResponse = await response.json();

                if(!response.ok) throw {status:response.status, statusText: response.statusText};

                jsonResponse.forEach(el=> {
                    const $li = document.createElement("li");
                    $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`
                    $fragment.appendChild($li)
                });
                    $async.appendChild($fragment)

        } catch (error){
            //console.log(error)
            let message = error.statusText || "Not found";
            $async.innerHTML = `Error ${error.status} : ${message}.`
        }finally {

        }
    }
    getData()
})();

/* ***axios*** */

(()=> {
    const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        //console.log(res);
        let json = res.data;
        json.forEach(el=> {
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`
            $fragment.appendChild($li)
        });
            $axios.appendChild($fragment);
    })
    .catch(err => {
        //console.log(err);
        let message = err.response.statusText || `error occured`;
        $axios.innerHTML = `Error ${err.response.status}: message`;
    })
    .finally(()=> {
        //console.log("this will run always")
    });
})();

/* Axios + async await */

(() => {
    const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

    async function getData() {
        try {
            let res = await axios.get("https://jsonplaceholder.typicode.com/users");
            let json = await res.data;

            json.forEach(el=> {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`
                $fragment.appendChild($li)
            });
                $axiosAsync.appendChild($fragment);

        } catch (err) {
           // console.log(err.response);
            let message = err.response.statusText || `error occured`;
            $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
        }
    }
    getData()
})();