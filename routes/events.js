// routes/events.js
const express = require('express');
const Event = require('./models/Event');

const router = express.Router();

// Получение всех событий
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
