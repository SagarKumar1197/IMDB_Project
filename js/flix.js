let search = document.querySelector("#search");
search.addEventListener("keyup",(e)=>{
    e.preventDefault();
    // console.log(e.target.value)
    let searchText= e.target.value;
    searchMovies(searchText);

    let template = document.querySelector("#template");
    template.style.display="flex";
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
})

//Speech Recognition
let speechSearch = document.querySelector("#speechIcon");
speechSearch.addEventListener("click",(e)=>{
    e.preventDefault();

    let template = document.querySelector("#template");
    template.style.display="flex";
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
  
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.interimResults =true;

    recognition.addEventListener("result",(e)=>{
        let data = [...e.results]
        for(i of data){
            // console.log(i)
            data = i[0].transcript;
        }
        search.value= data;
        if(e.results[0].isFinal){
            let searchText = data
            searchMovies(searchText)
        }
    })
    recognition.start(); // need to start speech recogntion
})

//IMDB
function searchMovies(searchText){
    var searchText = searchText.replace(/\s+/g, '&');
    const moviesUrl =`http://www.omdbapi.com/?s=${searchText}&apikey=df4123ce`;
    
    window.fetch(moviesUrl)
    .then(data=>{
        data.json()
        .then(data=>{
            console.log(data)
            let movies = data.Search;
            let output = [];
            for (movie of movies) {
                // console.log(x)
                let defaultImg = (movie.Poster === "N/A" ? "./images/default_poster.jpg" : movie.Poster);
                output += `<div>
                                <img src ="${defaultImg}" />
                                <h1>${movie.Title}</h1>
                                <p>${movie.Year}</p>
                                <a  href ="http://www.imdb.com/title/${movie.imdbID}/"target ="_blank">Movie Details</a>
                            </div>
                        `;
            }
            document.querySelector("#template").innerHTML=output;
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
}

