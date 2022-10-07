'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Car_Types extends Model {
        static associate(models) {
            // define association here
            models.Car_Types.hasMany(models.Cars, {
                foreignKey: 'car_type',
                as: 'type',
            });
        }
    }
    Car_Types.init(
        {
            type_name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Car_Types',
        }
    );
    return Car_Types;
};
