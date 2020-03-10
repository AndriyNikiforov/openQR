'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');
const Database = use('Database');


class RoleSeeder {
  async run () {
    await Database.table('roles')
      .insert([
        {
          title: 'Qa',
          slug: 'qa'
        },
        {
          title: 'Admin',
          slug: 'admin'
        },
        {
          title: 'Project manager',
          slug: 'pm'
        }
      ]);
  }
}

module.exports = RoleSeeder
