const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    const limite = (limiteur)=>{
      if(req.query.limit){
        let limit = req.query.limit;
        return limit = parseInt(limit); //convertir la chaîne de caractères en nombre
      } else {
        return limit = limiteur;
      }
    }
    if(req.query.name){ //si le paramètre name est présent dans l'url(.../api/pokemons?name=...)
      const name = req.query.name;//extraire le paramètre name de l'url
      if(name.length<2){
        const message = 'Le terme de recherche doit contenir au moins 2 caractères.';
        res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({ 
        where: {
          name : { //propriété name de l'objet Pokemon
            [Op.like]: `%${name}%` //Op.like est un opérateur de sequelize qui permet de faire une recherche partielle
          }
        }, 
        order : ['name'], //tri par ordre alphabétique
        limit : limite(5)
      })
      .then(({count, rows}) => {
        const message = "Il y a " + count + " qui correspondent au terme de votre votre recherche " + name + ".";
        res.json({ message, data: rows });
      })
    } else {
      Pokemon.findAll({
        order : ['name'],
        limit : limite(100000)
      })
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