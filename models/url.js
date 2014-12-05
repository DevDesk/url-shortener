"use strict";

module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define("Url", {
    url: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Url;
};
