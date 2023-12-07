'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
        this.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
      }
  }
  Attendee.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
