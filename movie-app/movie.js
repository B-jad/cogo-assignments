const inputString = document.getElementById("search");
const MovieWebList = document.getElementById("movieList");
const movieData = document.getElementById("movieData");
var pageNumber = document.getElementById("pageNumber");
var MovieListData = [];
var MovieList = [];
var url =  "https://www.omdbapi.com/?apikey=d083ac07";
var newurl = "";
var curPage = 1;
pageNumber.innerText = 1;

inputString.addEventListener("keyup", function(){
    let promise = new Promise(function(resolve, reject){
        newurl = url;
        newurl+= "&s=" + inputString.value;
        console.log(newurl);
    })
    setTimeout(getMovieList,1000,newurl);
    // promise.then(getMovieList(newurl))
});

function getMovieList(url)
{
    fetch(url)
    .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
    })
    .then((data) => {
      // Process the received data
      MovieListData = data;
      setTimeout(showMovieList,1000);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.log('Error:', error.message);
    });
    console.log(url);
    console.log(MovieListData);
    console.log(MovieListData.Search);
    curPage = 1;
}

function showMovieList()
{
    MovieWebList.innerHTML = "";
    MovieList = MovieListData.Search;
    for(let i=0;i<MovieList.length;i++)
    {
        let listItem = document.createElement('li');
        let Item = document.createElement('div');
        let poster = document.createElement('img');
        let movieName = document.createElement('h2');
        poster.src = MovieList[i].Poster;
        movieName.innerText = MovieList[i].Title;
        Item.id="list-item-div";
        Item.appendChild(poster);
        Item.appendChild(movieName);
        listItem.appendChild(Item);
        MovieWebList.appendChild(listItem);
        listItem.addEventListener("click", function()
        {
            getMovieData(MovieList[i].imdbID);
        });
    }
    pageNumber.innerText = curPage;
}

function getMovieData(movieID)
{
    console.log("showmoviedata");
    let movieurl = url;
    let Movie = [];
    movieurl+= "&i=" + movieID;
    setTimeout(function() {
        fetch(movieurl)
        .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
        })
        .then((data) => {
          // Process the received data
          Movie = data;
          console.log(Movie);
          showMovieData(Movie);
        })
        .catch(error => {
          // Handle any errors that occurred during the fetch request
          console.log('Error:', error.message);
        });
    },1000); 
}

function showMovieData(movie)
{
    movieData.innerHTML = "";
    let Item = document.createElement('div');
    let poster = document.createElement('img');
    let movieName = document.createElement('h2');
    let details = document.createElement('div'); 
    poster.src = movie.Poster;
    movieName.innerText = movie.Title;
    details.innerHTML = "Year: " + movie.Year + "<br> Genre: " + movie.Genre
                        + "Director: " + movie.Director + "<br>Actors: " + movie.Actors;
    Item.appendChild(poster);
    Item.appendChild(movieName);
    Item.appendChild(details);
    movieData.appendChild(Item);
}

function leftarrow()
{
    if(curPage!=1)
    {
        curPage-=1;
        let pageurl = newurl;
        let pagepromise = new Promise(function()
        {
            pageurl+= "&page=" + curPage;
        })
        pagepromise.then(getMovieList(pageurl));
    }
}

function rightarrow()
{
    // if(pageNumber!=1)
    {
        curPage+=1;
        let pageurl = newurl;
        let pagepromise = new Promise(function()
        {
            pageurl+= "&page=" + curPage;
        })
        pagepromise.then(getMovieList(pageurl));
    }
}