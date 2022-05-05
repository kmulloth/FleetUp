'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupEvents = sequelize.define('GroupEvents', {
    event_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {});
  GroupEvents.associate = function(models) {
  };
  return GroupEvents;
};
