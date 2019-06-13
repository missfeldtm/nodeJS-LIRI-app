var inquirer = require('inquirer');


inquirer
    .prompt([
        /* Pass your questions in here */
        //takes in user feedback
        {
            type: "list",
            message: "What would you like to Search?",
            choices: ["Song", "Movie", "Concert"],
            name: "media"
        },
        {
            type: "input",
            message: "Please input your Inquiry Below",
            name: "inquiry"
        },

    ])
    .then(answers => {
        // User feedback in object form

        var expr = answers.media;
        switch (expr) {
            case 'Song':
                console.log('Song');
                break;
            case 'Movie':
                console.log('Movie');

                break;
            case 'Concert':
                console.log('Concert');

                break;
        }

    });