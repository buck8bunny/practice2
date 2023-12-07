
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CalendarPage from './components/Calendar';
import EventDetail from './components/EventDetail';
import StatsPage from './components/StatsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

