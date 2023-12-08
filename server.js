const express = require('express');
const cors = require('cors');
const eventController = require('./controllers/eventController');
const attendanceController = require('./controllers/attendanceController');
const statsController = require('./controllers/statsController');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/events', eventController.getAllEvents);
app.get('/events/:id', eventController.getEventById);
app.get('/categories', eventController.getCategories);
app.post('/attend', attendanceController.recordAttendance);
app.put('/attend/notGoing/:eventId', attendanceController.updateAttendanceNotGoing);
app.get('/yearly-stats', statsController.getYearlyStats);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
