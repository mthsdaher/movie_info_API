/* 
Name: Matheus Veloso Daher
E-Mail: matheusdaher@gmail.com
Std ID: 200575625
Course: JavaScript
Program Information: a web application utilizing the OMDB API provided
*/

// OMDB API Key
const omdbApiKey = '55e8180';

// Function to search for a movie
function searchMovie() {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    let url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}`;

    // Add the year parameter if provided
    if (year) {
        url += `&y=${year}`;
    }

    // Fetch movie data from the OMDB API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.Response === 'False') {
                resultsDiv.innerHTML = '<p>No results found</p>';
                return;
            }

            const template = document.getElementById('movie-template').content.cloneNode(true);

            // Set poster image
            let poster = template.querySelector('.poster');
            poster.src = data.Poster !== 'N/A' ? data.Poster : 'default-image.png';
            poster.alt = `${data.Title} poster`;

            // Set movie details
            template.querySelector('.movie-title').textContent = `Title: ${data.Title}`;
            template.querySelector('.imdb-id').textContent = `IMDb ID: ${data.imdbID}`;
            template.querySelector('.release-year').textContent = `Year: ${data.Year}`;
            template.querySelector('.country').textContent = `Country: ${data.Country}`;
            template.querySelector('.genre').textContent = `Genre: ${data.Genre}`;
            template.querySelector('.director').textContent = `Director: ${data.Director}`;
            template.querySelector('.actors').textContent = `Actors: ${data.Actors}`;
            template.querySelector('.plot').textContent = `Plot: ${data.Plot}`;
            template.querySelector('.awards').textContent = `Awards: ${data.Awards}`;
            template.querySelector('.Metascore').textContent = `Metascore: ${data.Metascore}`;
            template.querySelector('.imdbRating').textContent = `imdbRating: ${data.imdbRating}`;
            template.querySelector('.awardimdbVotess').textContent = `imdbVotes: ${data.imdbVotes}`;

            // Add country flag
            const country = data.Country.split(',')[0].trim(); // Get the first country listed
            const flagIcon = template.querySelector('.flag');
            const countryCode = getCountryCode(country);
            if (countryCode) {
                flagIcon.classList.add('flag-icon', `flag-icon-${countryCode}`);
            }

            resultsDiv.appendChild(template);

            // Use speech synthesis to read out the movie title
            let utterance = new SpeechSynthesisUtterance(data.Title);
            speechSynthesis.speak(utterance);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to get country code for flag-icon-css
function getCountryCode(countryName) {
    const countryCodes = {
        'United States': 'us',
        'United Kingdom': 'gb',
        'Canada': 'ca',
        'Australia': 'au',
        'France': 'fr',
        'Germany': 'de',
        'India': 'in',
        'Brasil': 'br',
    };

    return countryCodes[countryName] || null;
}
