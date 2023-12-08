'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    
    static associate(models) {
      this.hasMany(models.Attendee, { foreignKey: 'eventId', as: 'attendees' });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    guestsAttending: DataTypes.INTEGER,
    guestsNotAttending: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};