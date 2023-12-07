'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [
      {
        title: 'Концерт "Rock Fest"',
        date: '2023-12-01',
        category: 'Музика',
        guestsAttending: 200,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Тренажерний зал відкритий для всіх',
        date: '2023-12-05',
        category: 'Спорт',
        guestsAttending: 50,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Виставка мистецтва "Сучасні течії"',
        date: '2023-12-10',
        category: 'Мистецтво',
        guestsAttending: 100,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Лекція "Дослідження космосу"',
        date: '2023-12-15',
        category: 'Наука',
        guestsAttending: 80,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Фестиваль "Їжа світу"',
        date: '2023-12-20',
        category: 'Кулінарія',
        guestsAttending: 150,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Театральне виставлення "Шекспір в сучасному стилі"',
        date: '2023-12-25',
        category: 'Театр',
        guestsAttending: 120,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Семінар з веб-розробки',
        date: '2023-12-30',
        category: 'Технології',
        guestsAttending: 60,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Благодійний аукціон',
        date: '2024-01-05',
        category: 'Благодійність',
        guestsAttending: 30,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Марафон "Бігай за здоровя"',
        date: '2024-01-10',
        category: 'Спорт',
        guestsAttending: 100,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Конференція "Штучний інтелект в бізнесі"',
        date: '2024-01-15',
        category: 'Технології',
        guestsAttending: 70,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Вечірка "День святого Валентина"',
        date: '2024-02-14',
        category: 'Розваги',
        guestsAttending: 200,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Виставка автомобілів "Автосалон"',
        date: '2024-02-20',
        category: 'Автомобілі',
        guestsAttending: 80,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Майстер-клас з малювання',
        date: '2024-02-25',
        category: 'Мистецтво',
        guestsAttending: 40,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Спектакль "Класика в новому виконанні"',
        date: '2024-03-01',
        category: 'Театр',
        guestsAttending: 150,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Турнір з настільного тенісу',
        date: '2024-03-05',
        category: 'Спорт',
        guestsAttending: 30,
        guestsNotAttending: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
