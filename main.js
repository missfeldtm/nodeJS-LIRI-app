//npm package requirements

var Spotify = require('node-spotify-api');
var axios = require('axios');
var colors = require('colors');
var moment = require('moment');
var fs = require('fs');
moment().format();

//grabs the api keys from keys.js
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var bandsInTown = keys.bandsInTownKey;
var omdb = keys.omdb;




//spotify
var mediaSearch = {
    findSong: function (songStr) {
        spotify.search({
            type: 'track',
            query: songStr
        }, function (err, data) {
            if (err) {
                return console.log('Error: ' + err);
            }

            var songs = data.tracks.items;


            console.log("***************************************************\n".rainbow + "HERE ARE THE TOP 5 SONGS FOR ".bold + songStr.toUpperCase().bold +
                "\n***************************************************".rainbow);

            fs.appendFileSync("info.txt",

                "***************************************************\n" + "HERE ARE THE TOP 5 SONGS FOR: " + songStr.toUpperCase() +
                "\n***************************************************\n")

            for (var i = 0; i < 5; i++) {

                console.log(i);
                console.log("Song Name: " + songs[i].name +
                    "\nArtist(s): " + songs[i].artists[0].name +
                    "\nAlbum: " + songs[i].album.name +
                    "\nPreview song: " + songs[i].preview_url);

                fs.appendFileSync("info.txt",
                    "Song Name: " + songs[i].name +
                    "\nArtist(s): " + songs[i].artists[0].name +
                    "\nAlbum: " + songs[i].album.name +
                    "\nPreview song: " + songs[i].preview_url +
                    "\n***************************************************\n")

            }
        });

    },
    findMovie: function (movie) {
        axios.get("http://www.omdbapi.com/?s=" + movie + "&y=&plot=short&apikey=trilogy").then(

        
        
            function (response) {

                console.log(response.data.Search);


                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("Actors: " + response.data.Actors);
                console.log("Rating: " + response.data.Rated);
                console.log("Run Time: " + response.data.Runtime);
           
            }

        )
    },
    findConcert: function (artist) {

        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsInTown;

        axios.get(queryUrl).then(

            function (response) {

                console.log("***************************************************\n".rainbow + "HERE ARE THE LATEST CONCERTS FOR: ".bold + artist.toUpperCase().bold +
                    "\n***************************************************".rainbow);

                fs.appendFileSync("info.txt",

                    "***************************************************\n" + "HERE ARE THE LATEST CONCERTS FOR: " + artist.toUpperCase() +
                    "\n***************************************************\n")

                for (var i = 0; i < 5; i++) {
                    var body = response.data[i];

                    var date = body.datetime;
                    var timeChange = moment(date).format('LLL');

                    console.log("Venue Name : ".bold + body.venue.name +
                        // * Venue location
                        "\nVenue Location: ".bold + body.venue.city + "," + body.venue.region + ', ' + body.venue.country +
                        //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                        "\nDate of the Event: ".bold + timeChange +
                        "\n===================================================".rainbow);

                    fs.appendFileSync("info.txt",

                        "Venue Name : " + body.venue.name +
                        // * Venue location
                        "\nVenue Location: " + body.venue.city + "," + body.venue.region + ', ' + body.venue.country +
                        //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                        "\nDate of the Event: " + timeChange +
                        "\n===================================================\n"

                    )
                }
            }
        )
    }

}



//mediaSearch.findSong("True Colors");
mediaSearch.findMovie("Avengers");
//mediaSearch.findConcert("David Guetta");






/*
function findSong(str) {

    spotify.search({
        type: 'track',
        query: str
    }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }

        var songs = data.tracks.items;

        for (var i = 0; i < 5; i++) {
            console.log("**********SONG INFO*********");

            console.log(i);

            console.log("Song Name: " + songs[i].name);

            console.log("Artist(s): " + songs[i].artists[0].name);

            console.log("Album: " + songs[i].album.name);

            console.log("Preview song: " + songs[i].preview_url);

        }

    });

}



//Movie Search

function findMovie(movie) {


    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(

        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Actors: " + response.data.Actors);
            console.log("Rating: " + response.data.Rated);
            console.log("Run Time: " + response.data.Runtime);
        }
    )

};

//findMovie("Shrek");

function findConcert(artist) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsInTown;

    axios.get(queryUrl).then(

        function (response) {

            console.log("***************************************************\n".rainbow + "HERE ARE THE LATEST CONCERTS FOR: ".bold + artist.toUpperCase().bold +
                "\n***************************************************".rainbow);
            for (var i = 0; i < 5; i++) {
                var body = response.data[i];

                var date = body.datetime;
                var timeChange = moment(date).format('LLL');

                console.log("Venue Name : ".bold + body.venue.name +
                    // * Venue location
                    "\nVenue Location: ".bold + body.venue.city + "," + body.venue.region + ', ' + body.venue.country +
                    //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                    "\nDate of the Event: ".bold + timeChange +
                    "\n====================================================".rainbow);
            }

        }
    )
}

*/