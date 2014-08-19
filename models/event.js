module.exports = function(sequelize, DataTypes) {

	return sequelize.define('event', {
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			values: [
				'delo v domu',
				'dežurstva',
				'drugo',
				'gasilska žalovanja',
				'gasilske prireditve',
				'mladinska tekmovanja',
				'organizacija tekmovanja',
				'posvet / seminar',
				'požarna straža',
				'pregled/servisiranje opreme',
				'pregledi hidrantnega omrežja',
				'prevozi vode',
				'seja/sestanek',
				'sojenje na tekmovanju',
				'tekmovanja',
				'urejanje okolice',
				'usposabljanje/izobraževanje',
				'vaje'
			]
		},
		duration: {type: DataTypes.DECIMAL(10, 3), allowNull: false},
		eventDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
		description: DataTypes.TEXT
	});
};