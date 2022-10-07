'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Cars.belongsTo(models.Car_Types, {
                foreignKey: 'car_type',
                as: 'type',
                onDelete: 'CASCADE',
            });
        }
    }
    Cars.init(
        {
            car_name: DataTypes.STRING,
            rent_cost: DataTypes.INTEGER,
            car_image: DataTypes.STRING,
            car_type: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Cars',
        }
    );
    return Cars;
};
