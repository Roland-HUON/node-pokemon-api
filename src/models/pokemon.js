/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', { // On définit le modèle nom + description (avec propriétés nom + spécificités) + config globale
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }