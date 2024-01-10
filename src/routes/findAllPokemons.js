const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){ //si le paramètre name est présent dans l'url(.../api/pokemons?name=...)
      const name = req.query.name;//extraire le paramètre name de l'url
      return Pokemon.findAll({ 
        where: {
          name : { //propriété name de l'objet Pokemon
            [Op.like]: `%${name}%` //Op.like est un opérateur de sequelize qui permet de faire une recherche partielle
          }}})
      .then(pokemons => {
        const message = "Il y a " + pokemons.length + " qui correspondent au terme de votre votre recherche " + name + ".";
        res.json({ message, data: pokemons });
      })
    } else {
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.';
        res.json({ message, data: pokemons });
      })
      .catch(error => {
        const message = 'La liste des pokémons n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      })
    }
  })
}