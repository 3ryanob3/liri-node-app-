require('dotenv').config();

// Importing files needed to run the functions
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');


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

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(
        function (response) {
            // console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                console.log("Concert Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("Concert Venue: " + response.data[i].venue.name);
                console.log('--------------------------------------------------')
                fs.appendFileSync('log.txt', "\r\n" + "Concert Search Log----------------------" + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "-----------------------------------------" + "\r\n", 'utf8');
            }
        }
    );

};

function spotifyThisSong(song) {

    if (!song) {
        song = "the sign Ace of Base"
    }
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //   console.log(data.tracks.items[0]); 
        console.log("\n---------------------\nSong Name: " + data.tracks.items[0].name);
        console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        //   data.tracks.items[0].artists.forEach(artist => {
        //       console.log(artist.name)
        //   })
        console.log("Preview URL: " + data.tracks.items[0].preview_url + "\n---------------\n");

        //adds text to log.txt
        fs.appendFileSync('log.txt', "\r\n" + "Song Search Log---------------------------------------" + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Song Name: " + data.tracks.items[0].name + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Artist(s): " + data.tracks.items[0].artists[0].name + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Album: " + data.tracks.items[0].album.name + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Preview Link: " + data.tracks.items[0].preview_url + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "-------------------------------------------------------" + "\r\n", 'utf8');
    });
} 
