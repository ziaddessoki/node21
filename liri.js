require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

liri(process.argv[2]);

function liri(action, searchData){
    var nodeArgs = process.argv;
    var searchData = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            searchData = searchData + " " + nodeArgs[i];
        } else {
            searchData += nodeArgs[i];
        }
    }
 switch (action) {
    case 'concert-this':
        concert(searchData);
        break;
    case 'spotify-this':
           
        spoti(searchData);
        break;
    case 'movie-this':
        movie(searchData);
        break;
    case 'do-what-it-says':
        read();
        break;
}

};

function concert(bandName) {

    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
        .then(function (response) {
           
            console.log("############--Concert-This--#################")
            for (var j = 0; j < response.data.length; j++) {
                console.log("----------------------")
                console.log("\r\n");
                console.log("Venue name: " + response.data[j].venue.name);
                console.log("\r");
                console.log("Venue's City: " + response.data[j].venue.city +" "+ response.data[j].venue.region);
                console.log("\r");
                console.log("Concert date: " + response.data[j].datetime);
                console.log("\r\n");
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function spoti(songName) {


    spotify.search({ type: 'track', query: songName, limit: 5 })
    .then(function (response) {

        console.log("############--Spotify-This--#################")
        response.tracks.items.map(function (item) {
            item.available_markets = [];
            // console.log(response.tracks);
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

function movie(movieName) {
  
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("############--Movie-This--#################")
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
            console.log("Plot: " + response.data.Plot);
            console.log("\r");
            console.log("Actors: " + response.data.Actors);
            console.log("\r");
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
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
        
       
        if (dataArr[0] === 'spotify-this') {
            spoti(dataArr[1]);
        }
        if (dataArr[0] === 'concert-this') {
            concert(dataArr[1]);
        }
        if (dataArr[0] === 'movie-this') {
            movie(dataArr[1]);
        }
        
        // liri(dataArr[0], dataArr[1]);
      
    });

}

