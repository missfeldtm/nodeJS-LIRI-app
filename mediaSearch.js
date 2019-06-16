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

//shows the amount of results to give back to the user
var feedback = 1;
var divider = "\n===================================================\n";


var MediaSearch = function () {
    this.findSong = function (searchWhat) {

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
    this.findMovie = function (searchWhat) {
        axios.get("http://www.omdbapi.com/?s=" + searchWhat + "&y=&plot=short&apikey=trilogy").then(

            function (response) {
                //gives position in the omdb search array 
                var iNum = 0;

                var header = "***************************************************\n" + "HERE ARE THE TOP " + feedback + " MOVIE(S) FOR: " + searchWhat.toUpperCase() +
                    "\n***************************************************\n"


                console.log(header.rainbow);

                fs.appendFileSync("info.txt", header);

                for (var i = 0; i < feedback; i++) {

                    var searchData = response.data.Search[iNum];
                    var title = searchData.Title;

                    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(

                        function (response) {

                            var movieData = [
                                "Title: " + response.data.Title,
                                "\nRelease Year: " + response.data.Year,
                                "\nIMDB Rating: " + response.data.imdbRating,
                                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                                "\nCountry: " + response.data.Country,
                                "\nLanguage(s): " + response.data.Language,
                                "\nActors: " + response.data.Actors,
                                "\nRating: " + response.data.Rated,
                                "\nRun Time: " + response.data.Runtime,
                                divider
                            ]

                            console.log(movieData.join('\n'))
                            fs.appendFileSync("info.txt", movieData.join('\n'));

                        }
                    )
                    iNum++;
                }

            }

        )
    };
    this.findConcert = function (searchWhat) {

        var queryUrl = "https://rest.bandsintown.com/artists/" + searchWhat + "/events?app_id=" + bandsInTown;

        axios.get(queryUrl).then(

            function (response) {

                var header = "***************************************************\n" + "HERE ARE THE NEXT " + feedback + " CONCERT(S) FOR: " + searchWhat.toUpperCase() +
                    "\n***************************************************"

                //logs the header to the console and the txt file
                console.log(header.rainbow);
                fs.appendFileSync("info.txt", header);

               
            
                for (var i = 0; i < feedback; i++) {

                    var body = response.data[i];
                    var date = body.datetime;
                    var timeChange = moment(date).format('LLL');


                    var concertInfo = [
                        "\nVenue Name : " + body.venue.name,
                        "\nVenue Location: " + body.venue.city + "," + body.venue.region + ', ' + body.venue.country,
                        "\nDate of the Event: " + timeChange,
                        divider
                    ]

                    console.log(concertInfo.join('\n'));
                    fs.appendFileSync("info.txt", concertInfo.join('\n'));

                }

            }).catch(function (error) {
            // handle error
            console.log(error);
        })
    };
    this.doSomething = function () {
        //declaring this at the top of the function so it will run other methods inside of the constructor

        var self = this;
        var type;
        var text;


        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            }

            //split command and song
            var dataArr = data.split(",");
            console.log(dataArr);
            text = dataArr[1];
            type = dataArr[0];

            //if dataarr[0] === whichever case, run that function

            console.log(text);
            console.log(type);
            switch (type) {

                case 'concert-this':
                    console.log(text)
                    self.findConcert(text);

                    break;
                case 'spotify-this':
                    self.findSong(dataArr[1]);

                    break;
                case 'movie-this':
                    self.findMovie(dataArr[1]);

                    break;
                default:
                    console.log("I couldn't complete your request, please try again!");

            }
        });


    };

};

module.exports = MediaSearch;

