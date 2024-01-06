//npm init
//npm run ...(script package.json)
//npm install --save express
//npm install --save-dev nodemon (need to reload page not the entirety of the terminal)
const express = require('express');

const app = express();
const port = 3000;

//road : app.methode(get, send, post, delete...)(chemin, (req or res))
app.get('/', (req, res) => {
    res.send('Hello World 2!');
});
app.get('/api/pokemons/1', (req, res) => {
    res.send("Hello Bulbizarre!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});