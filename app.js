//npm init
//npm run ...(script package.json)
//npm install --save express
//npm install --save-dev nodemon
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});