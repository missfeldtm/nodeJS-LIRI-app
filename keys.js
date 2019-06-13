const env = require('dotenv');

env.config();



exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
};

exports.bandsInTownKey = process.env.BANDSINTOWN_KEY;

exports.omdb = process.env.OMDB_KEY;
