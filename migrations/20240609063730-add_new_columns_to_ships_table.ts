module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Ships', 'abs', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'attempted_landings', { type: Sequelize.INTEGER , allowNull: true,}),
      queryInterface.addColumn('Ships', 'course_deg', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'home_port', { type: Sequelize.STRING }),
      queryInterface.addColumn('Ships', 'imo', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'mmsi', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'model', { type: Sequelize.STRING, allowNull: true, }),
      queryInterface.addColumn('Ships', 'speed_kn', { type: Sequelize.FLOAT, allowNull: true, }),
      queryInterface.addColumn('Ships', 'status', { type: Sequelize.STRING, allowNull: true, }),
      queryInterface.addColumn('Ships', 'successful_landings', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'type', { type: Sequelize.STRING }),
      queryInterface.addColumn('Ships', 'url', { type: Sequelize.STRING, allowNull: true, }),
      queryInterface.addColumn('Ships', 'weight_kg', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'weight_lbs', { type: Sequelize.INTEGER, allowNull: true, }),
      queryInterface.addColumn('Ships', 'year_built', { type: Sequelize.INTEGER, allowNull: true})
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Ships', 'abs'),
      queryInterface.removeColumn('Ships', 'attempted_landings'),
      queryInterface.removeColumn('Ships', 'course_deg'),
      queryInterface.removeColumn('Ships', 'home_port'),
      queryInterface.removeColumn('Ships', 'imo'),
      queryInterface.removeColumn('Ships', 'mmsi'),
      queryInterface.removeColumn('Ships', 'model'),
      queryInterface.removeColumn('Ships', 'speed_kn'),
      queryInterface.removeColumn('Ships', 'status'),
      queryInterface.removeColumn('Ships', 'successful_landings'),
      queryInterface.removeColumn('Ships', 'type'),
      queryInterface.removeColumn('Ships', 'url'),
      queryInterface.removeColumn('Ships', 'weight_kg'),
      queryInterface.removeColumn('Ships', 'weight_lbs'),
      queryInterface.removeColumn('Ships', 'year_built')
    ]);
  },
};
