'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
let index = 1;

Factory.blueprint('App/Models/Project', (faker) => {
  return {
    title: faker.word(),
    description: faker.sentence(),
    technical_info: faker.paragraph(),
    user_id: 1
  }
});

Factory.blueprint('App/Models/ProjectMember', (faker) => {
  return {
    user_id: Math.floor(Math.random() * (2 - 1 + 1)) + 1,
    project_id: index++
  };
});

Factory.blueprint('App/Models/TestCase', (faker) => {
  return {
    title: faker.word(),
    user_id: 1,
    status_id: 1,
    project_id: 1
  };
});
