'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Activities', 'usuarioId',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            after: 'status'
          }, { transaction: t },
        )
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Activities', 'usuarioId', { transaction: t },
        )
      ])
    })
  }
};
