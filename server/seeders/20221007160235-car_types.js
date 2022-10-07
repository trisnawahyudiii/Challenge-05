'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Car_Types', [
            {
                type_name: 'Small',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type_name: 'Medium',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type_name: 'Large',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Car_Types', null, {});
    },
};
