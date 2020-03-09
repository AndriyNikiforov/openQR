'use strict'

const Database = use('Database');

class AuthController {
  async signInPage({ view }) {
    return view.render('auth.signin');
  }

  async signUpPage({ view, response }) {
    const rolesData = await Database.table('roles')
      .select('*')
      .whereIn('slug', ['qa', 'pm'])

    return view.render('auth.signup', {
      roles: rolesData
    });
  }

  async signIn({ request, response }) {

  }

  async signUp({ request, response }) {

  }
}

module.exports = AuthController
