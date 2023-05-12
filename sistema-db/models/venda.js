const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idVenda: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idVenda"
    },
    formaPagamento: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "formaPagamento"
    },
    dataCompra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dataCompra"
    },
    valoTotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "valoTotal"
    }
  };
  const options = {
    tableName: "venda",
    comment: "",
    indexes: []
  };
  const VendaModel = sequelize.define("vendaModel", attributes, options);
  return VendaModel;
};