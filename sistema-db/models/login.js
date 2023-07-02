const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idLogin: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idLogin"
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user"
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    }
  };
  const options = {
    tableName: "login",
    comment: "",
    indexes: []
  };
  const LoginModel = sequelize.define("loginModel", attributes, options);
  return LoginModel;
};