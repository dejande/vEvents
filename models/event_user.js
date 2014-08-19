module.exports = function(sequelize, DataTypes) {

	return sequelize.define('event_users', {
		duration: {type: DataTypes.DECIMAL(10, 3), allowNull: false},
		description: DataTypes.TEXT
	});
};