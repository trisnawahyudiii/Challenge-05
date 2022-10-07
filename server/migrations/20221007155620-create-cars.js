'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            car_name: {
                type: Sequelize.STRING,
            },
            rent_cost: {
                type: Sequelize.INTEGER,
            },
            car_image: {
                type: Sequelize.STRING,
            },
            car_type: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Car_Types',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Cars');
    },
};
