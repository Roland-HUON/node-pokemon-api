/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Fée', 'Vol', 'Combat', 'Psy'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', { // On définit le modèle nom + description (avec propriétés nom + spécificités) + config globale
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : { 
          msg: 'Le nom est déjà pris.'
        },
        validate:{
          isEmpty: {msg: 'Vous devez remplir le champs "name" obligatoirement.'},
          notNull: {msg: 'Le champs "name" est un champs requis.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt : {msg: 'Utiliser uniquement des nombres entiers pour hp.'},
          min : {
            args : [0],
            msg : 'Vous devez rentrer un nombre supérieur à 0 pour hp.'
          },
          max : {
            args : [999],
            msg : 'Vous devez rentrer un nombre inférieur à 1000 pour hp.'
          },
          notNull: {msg: 'Hp est est un champs requis.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt : {msg: 'Utiliser uniquement des nombres entiers pour cp.'},
          min : {
            args : [0],
            msg : 'Vous devez rentrer un nombre supérieur à 0 pour cp.'
          },
          max : {
            args : [99],
            msg : 'Vous devez rentrer un nombre inférieur à 100 pour cp.'
          },
          notNull: {msg: 'Cp est est un champs requis.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl: {msg: 'Vous devez rentrez une url valide pour l\'image.'},
          notNull: {msg: 'Picture est est un champs requis.'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokémon doit au moins avoir un type.');
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokémon ne peut pas avoir plus de 3 types.');
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokémon doit être parmi les suivants : ` + validTypes);
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }