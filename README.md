# LIRI Bot

Date: June 15, 2019
Creator: Mckenna Missfeldt


## ABOUT THE APP
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`


### Packages Used
 * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the 
     
     [OMDB API](http://www.omdbapi.com) and the 
     
     [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   * [Colors](https://www.npmjs.com/package/colors)





### Setting Up Your DEV Environment

1. Using Terminal, Navigate to the nodeJS-liri-app folder

2. Start by Cloning this folder and running `npm install` in your terminal

3. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

You should be ready to run this app!! :)

4. liri.js has 4 different commands:
   * Example 1: `concert-this`
   ![IMAGES](/images/concert-this.PNG)

   This Is executed by running `node liri.js concert-this david guetta`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render information about each event to the terminal

   * Example 2: `spotify-this`
      ![IMAGES](/images/spotify-this.PNG)

   This Is executed by running `node liri.js spotify-this beyonce`

   * This will show the following information about the song in your terminal/bash window

   * Example 3: `movie-this`
     ![IMAGES](/images/movie-this.PNG)

   This Is executed by running `node liri.js movie-this iron man
* This will output the following Movie information to your terminal/bash window

   * Example 4: `do-what-it-says`
        ![IMAGES](/images/do-something.PNG)
        ![IMAGES](/images/randomtxt.PNG)

   This Is executed by running `node liri.js do-something
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.



## EXTRAS!!!
*This app also keeps track of everything you search in an info.txt file so you can keep track of everything you search
![IMAGES](/images/log.PNG)


*You can also keep change the number of results you get for better search efficiency...you can do this by going into the the `mediaSearch.js` file and changing the number inthe feedback variable


## `EXTRA` EXTRAS

*Try running the liri-wInquirer.js where the console propmpts you for your questions :)

![IMAGES](/images/inq1.PNG)
![IMAGES](/images/inq2.PNG)
