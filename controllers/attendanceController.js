const { Attendee, Event } = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
});

const recordAttendance = async (req, res) => {
    const { eventId, email } = req.body;

    try {
      if (!eventId || !email) {
        return res.status(400).json({ error: 'Bad Request. Missing eventId or email.' });
      }
  
      const [attendee, created] = await Attendee.findOrCreate({
        where: { eventId, email },
      });
  
      if (created) {
        // Отримуємо інформацію про подію, щоб передати у тексті повідомлення 
        const event = await Event.findByPk(eventId);
        // Якщо учасника створено, збільшуємо guestsAttending на 1
        await Event.increment('guestsAttending', { where: { id: eventId } });
  
        // Надсилаємо електронного листа
        const mailOptions = {
          from: 'your-email@gmail.com',
          to: email,
          subject: 'Успішна реєстрація',
          text: `Дякуємо за реєстрацію на подію ${event.title}. Ми чекаємо вас!`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
  
      return res.json({ success: true, message: 'Attendance recorded successfully.' });
    } catch (error) {
      console.error('Error recording attendance:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAttendanceNotGoing = async (req, res) => {
    const eventId = req.params.eventId;

    try {
      const event = await Event.findByPk(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Встановлюємо guestsNotAttending на поточне значення + 1
      await Event.update(
        { guestsNotAttending: event.guestsNotAttending + 1 },
        { where: { id: eventId } }
      );
  
      return res.json({ success: true, message: 'Attendance updated successfully.' });
    } catch (error) {
      console.error('Error updating attendance:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  recordAttendance,
  updateAttendanceNotGoing,
};
