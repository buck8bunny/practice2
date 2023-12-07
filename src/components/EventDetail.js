import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import ProgressBar from 'react-bootstrap/ProgressBar';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  // const [vote, setVote] = useState(null);
  const calculatePercentage = (current, total) => {
    return total === 0 ? 0 : (current / total) * 100;
  };
  useEffect(() => {
    // Fetch event details from your API
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // const handleVote = async (voteValue) => {
  //   setVote(voteValue);
  // };

  return (
    <div className="container mt-5">
      <Header />
      {event ? (
        <div>
          <h1 className="mb-4">{event.title}</h1>
          <p className="mb-1">Дата: {new Date(event.date).toLocaleDateString()}</p>
          <p className="mb-1">Категорія: {event.category}</p>
          <p className="mb-1">Гості, які прийдуть: {event.guestsAttending}</p>
          <p className="mb-1">Не підуть: {event.guestsNotAttending}</p>


          {/* Прогрес-бар із використанням стилів Bootstrap*/}
          <ProgressBar className="mt-3" style={{ maxWidth: '500px' }}>
            <ProgressBar
              animated
              variant="success"
              now={calculatePercentage(event.guestsAttending, event.guestsAttending + event.guestsNotAttending)}
              key={1}
            />
            <ProgressBar
              animated
              variant="danger"
              now={calculatePercentage(event.guestsNotAttending, event.guestsAttending + event.guestsNotAttending)}
              key={2}
            />
          </ProgressBar>
          {/* <div>
            <h2>Голосування</h2>
            <div className="btn-group" role="group" aria-label="Vote Buttons">
              <button
                type="button"
                className={`btn btn-success ${vote === 'Піду' && 'active'}`}
                onClick={() => handleVote('Піду')}
              >
                Піду
              </button>
              <button
                type="button"
                className={`btn btn-danger ${vote === 'Не піду' && 'active'}`}
                onClick={() => handleVote('Не піду')}
              >
                Не піду
              </button>
            </div>
          </div> */}
        </div>
      ) : (
        <p>Івент не знайдено.</p>
      )}
    </div>
  );
};

export default EventDetail;
