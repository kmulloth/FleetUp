'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    body: DataTypes.TEXT,
    attending: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.User, { foreignKey: 'user_id' });
    Event.belongsToMany(models.User, { through: 'RSVP', foreignKey: 'event_id' });
    Event.belongsToMany(models.Group, { through: 'GroupEvents', foreignKey: 'event_id' });
  };
  return Event;
};
