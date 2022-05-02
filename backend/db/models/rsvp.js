'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  RSVP.associate = function(models) {
    // RSVP.belongsTo(models.User, { foreignKey: 'user_id' });
    // RSVP.belongsTo(models.Event, { foreignKey: 'event_id' });
  };
  return RSVP;
};
