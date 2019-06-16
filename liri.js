//require file that holds the media search conctructor
var MediaSearch = require("./mediaSearch");
var media = new MediaSearch();

//checks for a search parameter
if (process.argv[2] === 'spotify-this' && !process.argv[3]) {
    process.argv[3] = "lemonade beyonce";
} else if (process.argv[2] === 'movie-this' && !process.argv[3]) {
    process.argv[3] = "Avengers";
} else if (process.argv[2] === 'concert-this' && !process.argv[3]) {
    process.argv[3] = "Cher";
}

//takes in the search parameters
var searchHow = process.argv[2];
var searchWhat = process.argv.slice(3).join(' ');


//switch function to decide which method to run
function letsGo(arg, str) {

    switch (arg) {
        case 'concert-this':
            media.findConcert(str);

            break;
        case 'spotify-this':

            media.findSong(str);

            break;
        case 'movie-this':

            media.findMovie(str);
            break;

        case 'do-something':
            media.doSomething();
            break;
        default:
            console.log("I couldn't complete your request, please try again!");

    }
}

letsGo(searchHow, searchWhat);