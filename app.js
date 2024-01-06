//npm init
//npm run ...(script package.json)
//npm install --save express
//npm install --save-dev nodemon (need to reload page not the entirety of the terminal)
//npm install morgan --save-dev
//npm install serve-favicon --save
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const {success} = require('./helper');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

//middleware : link between the request and the response/ data and user
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));

//road : app.methode(get, send, post, delete...)(chemin, (req or res))
// req.params.id ou req.params.name ...
app.get('/', (req, res) => {
    res.send('Hello World 2!');
});
app.get('/api/pokemons', (req,res) => {
    const message = "La liste des pokémons a bien été récupérée.";
    res.json(success(message, pokemons));
});
app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    const pokemon = pokemons.find(pokemon => pokemon.id == id);
    const message = "Un pokémon a bien été trouvé !";   
    res.json(success(message, pokemon));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});