'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
const { SALT } = require('../config/serverConfig');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.role,{
        through : 'User_Roles'
      });
    }
  }
  user.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,100]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate((user)=>{
    
    const hash = bcrypt.hashSync(user.password, SALT);
    user.password=hash;
  });

  return user;
};