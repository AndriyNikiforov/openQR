'use strict'

const Database = use('Database');

class ProfileService {
  async userData(id) {
    const userData = await Database
      .select(
        'users.email',
        'users.full_name',
        'roles.title'
      )
      .from('users')
      .where('users.id', id)
      .leftJoin('roles', 'users.role_id', 'roles.id')
      .leftJoin('test_cases', 'users.id', 'test_cases.user_id')
      .first();

    return { user: userData };
  }

  async editPageData(id) {
    const userData = await Database
      .select(
        'users.email',
        'users.full_name',
        'roles.title'
      )
      .from('users')
      .where('users.id', id)
      .leftJoin('roles', 'users.role_id', 'roles.id');

    return { user: userData };
  }
}

module.exports = new ProfileService();
