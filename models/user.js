
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('user', {
		name: {type: DataTypes.STRING, allowNull: false},
		surname: {type: DataTypes.STRING, allowNull: false},
		vulkanId: {type: DataTypes.INTEGER, allowNull: false},
		birthDate: {type: DataTypes.DATE, allowNull: false},
		email: DataTypes.STRING
	});
};