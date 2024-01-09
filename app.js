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
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

//middleware : link between the request and the response/ data and user
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyparser.json());

sequelize.initDb();

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+ port);
});