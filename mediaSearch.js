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

var feedback = 3;
var divider = "\n===================================================\n";


var MediaSearch = function () {
    this.findSong = function (searchWhat) {
        //if the user didn't put a search parameter in, set  default song 


        spotify.search({
            type: 'track',
            query: searchWhat
        }, function (err, data) {
            if (err) {
                return console.log('Error: ' + err);
            }

            var songs = data.tracks.items;
            var header = "***************************************************\n" + "HERE ARE THE TOP " + feedback + " SONGS FOR: " + searchWhat.toUpperCase() +
            "\n***************************************************\n"


            console.log(header.rainbow);

            fs.appendFileSync("info.txt", header);



           for (var i = 0; i < feedback; i++) {

           

                var songInfo = [
                    "Song Name: " + songs[i].name,
                    "\nArtist(s): " + songs[i].artists[0].name,
                    "\nAlbum: " + songs[i].album.name,
                    "\nPreview song: " + songs[i].preview_url,
                    divider

                ]
                console.log(songInfo.join('\n'));
                fs.appendFileSync("info.txt", songInfo.join('\n'));
          

        }


        });

    };
    this.findMovie = function (movie) {
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
        this.findConcert = function (artist) {

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
                            "\n===================================================\n")
                    }
                })
        },
        this.doSomething = function () {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            }

            //split command and song
            var dataArr = data.split(",");

            //if dataarr[0] === whichever case, run that function
            console.log(dataArr);
            console.log(dataArr[0]);
            console.log(dataArr[1]);


        })

    }


};

module.exports = MediaSearch;