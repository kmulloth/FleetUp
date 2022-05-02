'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Group.associate = function(models) {
    Group.belongsTo(models.User, { foreignKey: 'user_id' });
    Group.belongsToMany(models.User, { through: 'GroupMembers', foreignKey: 'group_id' });
    Group.belongsToMany(models.Event, { through: 'GroupEvents', foreignKey: 'group_id' });
  };
  return Group;
};
