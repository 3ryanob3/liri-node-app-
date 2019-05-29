require('dotenv').config();

// Importing files needed to run the functions
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');

fs.appendFile('log.txt', command + ",", function (err) {
    if (err) throw err;
});

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this": //bands in town
        searchForBandsInTown(input);
        break;
    case "spotify-this-song": //spotify
        spotifyThisSong(input);
        break;
    case "movie-this": // OMDB for movies
        movieThis(input);
        break;
    case "do-what-it-says": //  read commands from a file and excute the commands above
        doRandom();
        break;
    default:
        break;
}

function searchForBandsInTown(artist) {
    // var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Name of the venue:", response.data[0].venue.name);
            console.log("Venue location:", response.data[0].venue.city);
            var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log("Date of the Event:", eventDate);
        })
        .catch(function (error) {
            console.log(error);
        });
}