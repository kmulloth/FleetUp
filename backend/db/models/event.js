'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    imgUrl: DataTypes.STRING,
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    capacity: DataTypes.INTEGER,
    attending: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.RSVP, { foreignKey: 'eventId' });
    Event.belongsTo(models.User, { foreignKey: 'user_id' });
    Event.belongsToMany(models.Group, { through: 'GroupEvents', foreignKey: 'event_id', otherKey: 'group_id' });
  };
  return Event;
};
