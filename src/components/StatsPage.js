import 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { format } from 'date-fns';
import Header from './Header';
import Footer from './Footer';

const StatsPage = () => {
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [monthlyAttendees, setMonthlyAttendees] = useState([]);
  const [monthlyNotGoing, setMonthlyNotGoing] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchData();
    fetchCategoriesFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/yearly-stats', {
        params: {
          category: selectedCategory === 'all' ? undefined : selectedCategory,
        },
      });

      const { monthlyEvents, monthlyAttendees, monthlyNotGoing } = response.data;

      setMonthlyEvents(monthlyEvents);
      setMonthlyAttendees(monthlyAttendees);
      setMonthlyNotGoing(monthlyNotGoing);
    } catch (error) {
      console.error('Error fetching yearly stats:', error);
    }
  };

  const fetchCategoriesFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateChartData = (data, label, backgroundColor, borderColor) => {
    return {
      labels: data.map((item) => format(new Date(`2023-${item.month}-01`), 'MMM')),
      datasets: [
        {
          label: label,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
          hoverBackgroundColor: backgroundColor,
          hoverBorderColor: borderColor,
          data: data.map((item) => item.eventCount || item.guestsAttending || item.guestsNotAttending),
        },
      ],
    };
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container className="mt-5">
      <Header />
      <h1 className="text-center mb-4">Cтатистика</h1>
      {/* Category filter */}
      <Row className="justify-content-center mb-3">
        <Col md={4}>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">Всі</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>

      {/* Graphs for monthly events, attendees, and non-attendees */}
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <h2 className="text-center">Кількість івентів</h2>
          <div style={{ maxHeight: '600px' }}>
            <Bar
              data={generateChartData(monthlyEvents, 'Усього за місяць', 'rgba(75,192,192,0.4)', 'rgba(75,192,192,1)')}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <h2 className="text-center">Планують іти</h2>
          <div style={{ maxHeight: '600px' }}>
            <Bar
              data={generateChartData(monthlyAttendees, 'Кількість людей', 'rgba(255,99,132,0.4)', 'rgba(255,99,132,1)')}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">Не планують іти</h2>
          <div style={{ maxHeight: '600px' }}>
            <Bar
              data={generateChartData(monthlyNotGoing, 'Кількість людей', 'rgba(255,206,86,0.4)', 'rgba(255,206,86,1)')}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default StatsPage;
