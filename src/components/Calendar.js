import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import '../calendar.css';
import Header from './Header';
import Footer from './Footer';

const CalendarPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState([]);

  const tileContent = ({ date }) => {
    const eventsOnDate = eventsData.filter(
      (event) => new Date(event.date).toLocaleDateString() === date.toLocaleDateString()
    );
  
    const maxAttendees = Math.max(...eventsOnDate.map((event) => event.guestsAttending), 0);
    let maxGuests = 300; // maxGuests - Кількість гостей для розподілу максимальної інтенсивності кольору
    const intensity = maxAttendees / maxGuests; 
  
    return (
      <div>
        {eventsOnDate.map((event) => (
          <p
            key={event.id}
            className={
              intensity < 0.33
                ? 'lowIntensity'
                : intensity < 0.66
                ? 'mediumIntensity'
                : 'highIntensity'
            }
          >
            {event.title}
          </p>
        ))}
      </div>
    );
  };
  

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setDisplayedMonth(activeStartDate);
  };

  const tileDisabled = ({ date, view }) => {
    // Disable tiles for days not in the current month and year
    return (
      view === 'month' &&
      (date.getMonth() !== displayedMonth.getMonth() || date.getFullYear() !== displayedMonth.getFullYear())
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        const events = await response.json();
        setEventsData(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = eventsData.filter(
    (event) =>
      new Date(event.date).getMonth() === displayedMonth.getMonth() &&
      new Date(event.date).getFullYear() === displayedMonth.getFullYear()
  );

  return (
    <div className="container mt-5">
      <Header />
      <h1 className="mb-4">Календар</h1>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card">
            <div className="card-body">
              <Calendar
                tileContent={tileContent}
                tileDisabled={tileDisabled}
                onChange={handleMonthChange}
                onActiveStartDateChange={handleActiveStartDateChange}
                value={selectedMonth}
                className="calendar-custom"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Список подій</h2>
          {filteredEvents.length === 0 ? (
            <p>Немає подій для цього місяця</p>
          ) : (
            <ul className="list-group">
              {filteredEvents.map((event) => (
                <li key={event.id} className="list-group-item">
                  <Link to={`/event/${event.id}`} className="text-decoration-none">
                    <h5 className="card-title">{event.title}</h5>
                  </Link>
                  <p className="mb-1">Дата: {new Date(event.date).toLocaleDateString()}</p>
                  <p className="mb-1">Категорія: {event.category}</p>
                  <p>Гості, які прийдуть: {event.guestsAttending}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
