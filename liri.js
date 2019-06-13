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



var arg1 = process.argv[2];
var arg2 = process.argv[3];

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
                //gives position in the omdb search array 
                var iNum = 0;

                console.log("***************************************************\n".rainbow + "HERE ARE THE TOP 5 MOVIE SEARCHES FOR: " + movie.toUpperCase().bold +
                    "\n***************************************************".rainbow);

                fs.appendFileSync("info.txt",

                    "***************************************************\n" + "HERE ARE THE TOP 5 MOVIE SEARCHES FOR: " + movie.toUpperCase() +
                    "\n***************************************************\n")

                for (var i = 0; i < 5; i++) {

                    var searchData = response.data.Search[iNum];
                    var title = searchData.Title;

                    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(

                        function (response) {

                            console.log("Title: " + response.data.Title +
                                "\nRelease Year: " + response.data.Year +
                                "\nActors: " + response.data.Actors +
                                "\nRating: " + response.data.Rated +
                                "\nRun Time: " + response.data.Runtime +
                                "\n***************************************************");

                            fs.appendFileSync("info.txt", "Title: " + response.data.Title +
                                "\nRelease Year: " + response.data.Year +
                                "\nActors: " + response.data.Actors +
                                "\nRating: " + response.data.Rated +
                                "\nRun Time: " + response.data.Runtime +
                                "\n***************************************************\n");
                        }
                    )

                    iNum++;

                }

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
                    "\n***************************************************\n");

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
    },
    doWhatItSays: function () {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            }

            //split command and song
            var dataArr = data.split(",");

            //if dataarr[0] === whichever case, run that function

            mediaSearch.andiamo(dataArr[0],dataArr[1]);

           
            
        })

    },
    andiamo: function (searchHow, searchWhat) {
        switch (searchHow) {
            case 'concert-this':
                mediaSearch.findConcert(searchWhat);

                break;
            case 'spotify-this-song':
                mediaSearch.findSong(searchWhat);

                break;
            case 'movie-this':

                mediaSearch.findMovie(searchWhat);
                break;

            case 'do-what-it-says':
                mediaSearch.doWhatItSays();

                break;

        }

    }

};

mediaSearch.andiamo(arg1,arg2);











//mediaSearch.findSong("True Colors");
// mediaSearch.findMovie("Avengers");
//mediaSearch.findConcert("David Guetta");