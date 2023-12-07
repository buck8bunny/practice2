import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import CustomModal from './CustomModal';
import Footer from './Footer';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [attendance, setAttendance] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [events, setEvents] = useState([]); // Added state for events
  const [categories, setCategories] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEventId(null);
    setEmailInput('');
  };

  const promptForEmail = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleEmailSubmit = (userEmail) => {
    if (userEmail) {
      axios.post('http://localhost:3001/attend', { eventId: selectedEventId, email: userEmail })
        .then(response => {
          setAttendance((prevAttendance) => ({ ...prevAttendance, [selectedEventId]: 'Піду' }));
          // Збільшуємо кількість учасників на 1 у цій події
          setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) => {
              if (event.id === selectedEventId) {
                const updatedEvent = { ...event, guestsAttending: event.guestsAttending + 1 };
                return updatedEvent;
              }
              return event;
            });
            return updatedEvents;
          });

          handleModalClose();
        })
        .catch(error => {
          console.error('Error submitting email:', error);
        });
    }
  };
  const toggleNotGoing = (eventId) => {
    axios.put(`http://localhost:3001/attend/notGoing/${eventId}`)
      .then(response => {
        console.log(response.data);
        setAttendance((prevAttendance) => {
          const updatedAttendance = { ...prevAttendance };
          delete updatedAttendance[eventId];
          return updatedAttendance;
        });
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
      });
  };

  useEffect(() => {
    fetchCategoriesFromServer();
    axios.get('http://localhost:3001/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchCategoriesFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Відображаємо для запису актуальні події, які ще не закінчились
  const currentDate = new Date();

  const filteredEvents =
    filter === 'all'
      ? events.filter((event) => new Date(event.date) >= currentDate)
      : events.filter((event) => event.category.toLowerCase() === filter.toLowerCase() && new Date(event.date) >= currentDate);

  return (
    <div className="container mt-5">
      <Header />
      <h1 className="mb-4">Події</h1>
      <div className="mb-3">
        <label htmlFor="filter" className="form-label mr-2">
          Фільтр:
        </label>
        <select id="filter" className="form-select" value={filter} onChange={handleFilterChange}>
          <option value="all">Всі</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      </div>
      <div className="row">
        
      {filteredEvents.length === 0 ? (
        <p>Немає активних подій в цій категорії.</p>
      ) : (
        filteredEvents.map((event) => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <Link to={`/event/${event.id}`} className="text-decoration-none">
                  <h5 className="card-title">{event.title}</h5>
                </Link>
                <p className="card-text mb-1">Дата: {new Date(event.date).toLocaleDateString()}</p>
                <p className="card-text mb-1">Категорія: {event.category}</p>
                <p className="card-text">Гості, які прийдуть: {event.guestsAttending}</p>
                <button
                  className={`btn btn-success ${attendance[event.id] === 'Піду' ? 'active' : ''}`}
                  onClick={() => promptForEmail(event.id)}
                >
                  Піду
                </button>
                <button
                  className={`btn btn-danger ml-2 ${attendance[event.id] === 'Не піду' ? 'active' : ''}`}
                  onClick={() => toggleNotGoing(event.id)}
                >
                  Не піду
                </button>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

      {/* CustomModal component */}
      <CustomModal
        show={showModal}
        handleClose={handleModalClose}
        handleEmailSubmit={handleEmailSubmit}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
      />
        <Footer />
    </div>
    
  );
};

export default Home;
