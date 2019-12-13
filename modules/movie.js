'use strict';

const superagent = require('superagent');
require('dotenv').config();


function Movie(title, overview, average_votes, image_url, popularity, released_on) {
  this.title = title;
  this.overview = overview;
  this.average_votes = average_votes;
  this.image_url = `https://image.tmdb.org/t/p/w500${image_url}`;
  this.popularity = popularity;
  this.released_on = released_on;
}

const getMovies = function (request, response) {
  const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${request.query.data.search_query}`;
  superagent.get(url).then(data => {
    const parsedData = JSON.parse(data.text);
    const movieData = parsedData.results.map(data => {
      const title = data.title;
      const overview = data.overview;
      const average_votes = data.vote_average;
      const image_url = data.poster_path;
      const popularity = data.popularity;
      const released_on = data.release_date;
      return new Movie(title, overview, average_votes, image_url, popularity, released_on);
    })
    // console.log('******movieData :', movieData);
    response.status(200).send(movieData);
  }).catch(err => {
    console.error(err);
    response.status(500).send('Status 500: Internal Server Error');
  })
}

module.exports = getMovies;
