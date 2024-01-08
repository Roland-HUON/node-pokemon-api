//npm init
//npm run ...(script package.json)
//npm install --save express
//npm install --save-dev nodemon (need to reload page not the entirety of the terminal)
//npm install morgan --save-dev
//npm install serve-favicon --save
//postman ou insomnia pour tester
//npm install body-parser --save
//npm install sequelize --save
//npm install mariadb --save
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyparser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const {success, getUniqueId} = require('./helper');
let pokemons = require('./mock-pokemon');
const PokemonModel = require('./src/models/pokemon');

const app = express();
const port = 3000;

//configure sequelize
const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions:{
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

// Connexion
sequelize.authenticate()
    .then(()=>console.log('Connection has been established successfully.'))
    .catch(error=>console.error('Unable to connect to the database:', error));

const Pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({force: true})
    .then(()=>{
        console.log('La base de données a été synchronisée.')

        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types.join()
            }).then(bulbizarre => console.log(bulbizarre.toJSON()))
        })
});
//middleware : link between the request and the response/ data and user
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyparser.json());
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

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = {...req.body, ...{id, created:new Date()}};
    pokemons.push(pokemonCreated);
    const message = "Le pokemon " + pokemonCreated.name + " a bien été créé.";
    res.json(success(message, pokemonCreated));
});

app.put('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const pokemonUpdated = {...req.body, id: id};
    pokemons = pokemons.map(pokemon=>{//
        return pokemon.id === id ? pokemonUpdated : pokemon
    });
    const message = "Le pokémon " + pokemonUpdated.name + " a bien été modifié.";
    res.json(success(message, pokemonUpdated));
});

app.delete('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = "Le pokémon " + pokemonDeleted.name + " a bien été supprimé.";
    res.json(success(message, pokemonDeleted));
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+ port);
});