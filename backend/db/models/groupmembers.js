'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {});
  GroupMembers.associate = function(models) {

  };
  return GroupMembers;
};
