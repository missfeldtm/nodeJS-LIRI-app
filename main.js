var Spotify = require('node-spotify-api');
var axios = require('axios');
var colors = require('colors');

var moment = require('moment');
moment().format();


var spotify = new Spotify({
    id: '095a2f1206d94bb697506a092de5a636',
    secret: '139b04fd9534411793f34e7644badb8f'
});

var bitKey = "984b1389-6285-47ac-93aa-3dc247b74115";




//spotify
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

//findSong("Sorry Not Sorry");


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

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bitKey;

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

findConcert("Cardi B");