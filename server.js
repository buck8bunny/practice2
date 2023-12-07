const express = require('express');
const { Attendee } = require('./models');
const { Event } = require('./models');
const cors = require('cors');
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

// Получение всех событий
app.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Получение конкретного события
app.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    // метод findAll з опцією attributes для отримання унікальних категорій з бази даних
    const categories = await Event.findAll({
      attributes: ['category'],
      group: ['category'],
    });

    // Отримані дані будуть у форматі масиву об'єктів, де кожен об'єкт містить поле "category"
    const uniqueCategories = categories.map((category) => category.category);

    res.json(uniqueCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Додавання учасника та оновлення кількості учасників
app.post('/attend', async (req, res) => {
  const { eventId, email } = req.body;

  try {
    if (!eventId || !email) {
      return res.status(400).json({ error: 'Bad Request. Missing eventId or email.' });
    }

    const [attendee, created] = await Attendee.findOrCreate({
      where: { eventId, email },
    });

    if (created) {
      // Если участник создан, увеличиваем guestsAttending на 1
      await Event.increment('guestsAttending', { where: { id: eventId } });
    }

    return res.json({ success: true, message: 'Attendance recorded successfully.' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/attend/notGoing/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Устанавливаем guestsNotAttending на текущее значение + 1
    await Event.update(
      { guestsNotAttending: event.guestsNotAttending + 1 },
      { where: { id: eventId } }
    );

    return res.json({ success: true, message: 'Attendance updated successfully.' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'mysql',
  logging: false,
});

app.get('/yearly-stats', async (req, res) => {
  try {
    const { category } = req.query;

    const whereCondition = category ? { category } : {};

    // Получение количества ивентов в каждом месяце
    const monthlyEvents = await Event.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('Event.id')), 'eventCount'],
      ],
      where: whereCondition,
      group: [sequelize.fn('MONTH', sequelize.col('Event.date'))],
    });

    // Получение количества посетителей, кто планирует идти на ивенты в разных месяцах
    const monthlyAttendees = await Event.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
        [sequelize.fn('SUM', sequelize.col('guestsAttending')), 'guestsAttending'],
      ],
      where: whereCondition,
      group: [sequelize.fn('MONTH', sequelize.col('date'))],
    });

    // Получение количества посетителей, кто не планирует идти на ивенты в разных месяцах
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
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
