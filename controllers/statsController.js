const { sequelize, Sequelize } = require('../models/index.js');
const { Event } = require('../models');
const getYearlyStats = async (req, res) => {
    try {
            const { category } = req.query;
        
            const whereCondition = category ? { category } : {};

            const monthlyEvents = await Event.findAll({
              attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('Event.id')), 'eventCount'],
              ],
              where: whereCondition,
              group: [Sequelize.fn('MONTH', Sequelize.col('Event.date'))],
            });
        
            // Отримання кількості відвідувачів, хто планує йти на івенти у різних місяцях
            const monthlyAttendees = await Event.findAll({
              attributes: [
                [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
                [sequelize.fn('SUM', sequelize.col('guestsAttending')), 'guestsAttending'],
              ],
              where: whereCondition,
              group: [sequelize.fn('MONTH', sequelize.col('date'))],
            });
        
            // Отримання кількості відвідувачів, хто не планує йти на івенти у різних місяцях
            const monthlyNotGoing = await Event.findAll({
              attributes: [
                [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
                [sequelize.fn('SUM', sequelize.col('guestsNotAttending')), 'guestsNotAttending'],
              ],
              where: whereCondition,
              group: [sequelize.fn('MONTH', sequelize.col('date'))],
            });
        
            res.json({ monthlyEvents, monthlyAttendees, monthlyNotGoing });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
};

module.exports = {
  getYearlyStats,
};
