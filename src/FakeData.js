// Використовувався на початку для генерації 10 івентів, для тестування фронтенду
import { faker } from '@faker-js/faker';

const generateEvents = (count) => {
  const events = [];

  for (let i = 0; i < count; i++) {
    const event = {
      id: i + 1,
      title: faker.company.name(),
      date: faker.date.future(),
      category: faker.lorem.words(),
      guestsAttending: faker.number.int({ min: 10, max: 500 }) ,
    };

    events.push(event);
  }

  return events;
};

export const eventsData = generateEvents(10); 
