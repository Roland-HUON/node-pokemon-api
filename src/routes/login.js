/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {

        if (!user) {
            const message = `L'utilisateur n'existe pas. Veuillez vérifier votre nom d'utilisateur.`;
            return res.status(401).json({ message });
        }
        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if(isPasswordValid) {
                //JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                );
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user, token });
            } else {
                const message = `Le mot de passe est invalide`;
                return res.status(401).json({ message });
            }

        })
    })
    .catch(error => {
        const message = `L'utilisateur n'a pas pu être connecté. Réesayez dans quelques instants.`;
        return res.status(500).json({ message, data: error });
    })
  })
}