const API_KEY = "498eaf207016c39539877283304113db";
const BASE_URL = "https://api.themoviedb.org/3";

const movieContainer = document.getElementById("movie-container");

window.onload = () => {
    fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`
    );
};

async function fetchMovies(url) {
    movieContainer.innerHTML = "<h2>Loading movies... 🎬</h2>";

    try {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error("API Error");
        }


        displayMovies(data.results);
    } catch (error) {
        console.log(error);

        movieContainer.innerHTML =
            "<h2>Something went wrong 😢</h2>";
    }
}

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    if (!movies || movies.length === 0) {

        movieContainer.innerHTML =
            "<h2>No movies found 😢</h2>";

        return;
    }

    movies.forEach(movie => {

        const movieCard =
            document.createElement("div");

        movieCard.classList.add("movie-card");

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450";

        movieCard.innerHTML = `
    
      <div class="rating">
        ⭐ ${movie.vote_average.toFixed(1)}
      </div>

      <img src="${poster}" alt="${movie.title}">

      <h3>${movie.title}</h3>

      <button class="trailer-btn">
        ▶ Trailer
      </button>

      <button class="ott-btn">
        🍿 Watch OTT
      </button>

      <button class="save-btn">
        ❤️ Save
      </button>

    `;

        movieCard
            .querySelector(".trailer-btn")
            .addEventListener("click", () => {

                showTrailer(movie.id);

            });

        movieCard
            .querySelector(".ott-btn")
            .addEventListener("click", () => {

                getOTTPlatforms(movie.id);

            });

        movieCard
            .querySelector(".save-btn")
            .addEventListener("click", () => {

                addToWatchlist(movie);

            });

        movieContainer.appendChild(movieCard);

    });

}

function searchMovies() {

    const query =
        document.getElementById("searchInput").value.trim();

    if(!query){
        alert("Enter a movie name");
        return;
    }

    fetchMovies(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

}

function getMoviesByMood(mood) {

    let genreId;

    switch (mood) {

        case "happy":
            genreId = 35;
            break;

        case "sad":
            genreId = 18;
            break;

        case "action":
            genreId = 28;
            break;

        case "chill":
            genreId = 10749;
            break;

        default:
            genreId = 35;

    }

    fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=1000&with_origin_country=IN&primary_release_date.gte=2015-01-01`
    );

}

function showTrailer(id) {

    fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    )

        .then(res => res.json())

        .then(data => {

            const trailer =
                data.results.find(video =>
                    video.type === "Trailer" &&
                    video.site === "YouTube"
                );

            if (trailer) {

                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank"
                );

            } else {

                alert("Trailer not available 😢");

            }

        })

        .catch(error => {

            console.log(error);

        });

}

function getWatchlist() {

    const user =
        localStorage.getItem("loggedInUser");

    return JSON.parse(
        localStorage.getItem(
            `watchlist_${user}`
        )
    ) || [];

}

function saveWatchlist(list) {

    const user =
        localStorage.getItem("loggedInUser");

    localStorage.setItem(
        `watchlist_${user}`,
        JSON.stringify(list)
    );

}

function addToWatchlist(movie) {

    let watchlist = getWatchlist();

    const alreadyExists =
        watchlist.find(m => m.id === movie.id);

    if (alreadyExists) {

        alert("Already in Watchlist ⚠️");

        return;

    }

    watchlist.push(movie);

    saveWatchlist(watchlist);

    alert("Added to Watchlist ❤️");

}

function showWatchlist() {

    const watchlist = getWatchlist();

    displayWatchlist(watchlist);

}

function displayWatchlist(movies) {

    movieContainer.innerHTML = "";

    if (movies.length === 0) {

        movieContainer.innerHTML =
            "<h2>Your Watchlist is empty 😢</h2>";

        return;

    }

    movies.forEach(movie => {

        const movieCard =
            document.createElement("div");

        movieCard.classList.add("movie-card");

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450";

        movieCard.innerHTML = `

      <div class="rating">
        ⭐ ${movie.vote_average.toFixed(1)}
      </div>

      <img src="${poster}" alt="${movie.title}">

      <h3>${movie.title}</h3>

      <button class="remove-btn">
        ❌ Remove
      </button>

    `;

        movieCard
            .querySelector(".remove-btn")
            .addEventListener("click", () => {

                removeFromWatchlist(movie.id);

            });

        movieContainer.appendChild(movieCard);

    });

}

function removeFromWatchlist(id) {

    let watchlist = getWatchlist();

    watchlist =
        watchlist.filter(movie => movie.id !== id);

    saveWatchlist(watchlist);

    showWatchlist();

}

async function getOTTPlatforms(movieId) {

    try {

        const res = await fetch(
            `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
        );

        const data = await res.json();

        const providers = data.results.IN;

        if (
            providers &&
            providers.flatrate &&
            providers.flatrate.length > 0
        ) {

            window.open(
                `https://www.themoviedb.org/movie/${movieId}/watch?locale=IN`,
                "_blank"
            );

        } else {

            alert("OTT platform not available 😢");

        }

    }

    catch (error) {

        console.log(error);

    }

}

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    alert("Logged out successfully 👋");

    window.location.href =
        "login.html";
}