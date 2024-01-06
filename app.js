//npm init
//npm run ...(script package.json)
//npm install --save express
//npm install --save-dev nodemon (need to reload page not the entirety of the terminal)
const express = require('express');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

//road : app.methode(get, send, post, delete...)(chemin, (req or res))
// req.params.id ou req.params.name ...
app.get('/', (req, res) => {
    res.send('Hello World 2!');
});
app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    const pokemon = pokemons.find(pokemon => pokemon.id == id);
    res.send("Vous avez demandé le pokémon " + pokemon.name);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});