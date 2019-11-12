require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var action = process.argv[2];


switch (action) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this':
        spoti(process.argv[3]);
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        read();
        break;
};

function concert() {

    var nodeArgs = process.argv;
    var bandName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            bandName = bandName + "+" + nodeArgs[i];
        } 
        else {
            bandName += nodeArgs[i];
        }
    }
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var j = 0; j < response.data.length; j++) {
                console.log("----------------------")
                console.log("\r\n");
                console.log("Venue name: " + response.data[j].venue.name);
                console.log("\r");
                console.log("Venue's City: " + response.data[j].venue.city);
                console.log("\r");
                console.log("Concert date: " + response.data[j].datetime);
                console.log("\r\n");
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function spoti(songName) {



    spotify.search({ type: 'track', query: songName }).then(function (response) {
        response.tracks.items.map(function (item) {
            item.available_markets = [];
            //    console.log(Object.values(response.tracks.items[0].external_urls));
            console.log("---------------")
            console.log("---------------")
            console.log("\r\n");
            console.log('Artist: ' + item.artists[0].name);
            console.log('Song Name: ' + item.name);
            console.log('Link: ' + item.external_urls.spotify);
            console.log('Album: ' + item.album.name);
            console.log("\n")

        });
    })

        .catch(function (err) {
            console.log(err);
        });

};

function movie() {
    var nodeArgs = process.argv;
    var movieName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            
            console.log("\r\n");
            console.log("Title: " + response.data.Title)
            console.log("\r");
            console.log("Year: " + response.data.Year);
            console.log("\r");
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("\r");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("\r");
            console.log("Country: " + response.data.Country);
            console.log("\r");
            console.log("Language: " + response.data.Language);
            console.log("\r");
            console.log("plot: " + response.data.Plot);
            console.log("\r");
            console.log("Actors: " + response.data.Actors);
            console.log("\r");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}



function read() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        spoti(dataArr[1]);


    });
}