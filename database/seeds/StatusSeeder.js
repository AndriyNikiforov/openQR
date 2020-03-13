'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database');

class StatusSeeder {
  async run () {
    await Database.table('statuses')
      .insert([
        {
          name: 'success',
          type: 'is-success'
        },
        {
          name: 'failed',
          type: 'is-danger'
        },
        {
          name: 'in_progress',
          type: 'is-warning'
        },
        {
          name: 'future',
          type: 'is-info'
        },
      ]);
  }
}

module.exports = StatusSeeder
