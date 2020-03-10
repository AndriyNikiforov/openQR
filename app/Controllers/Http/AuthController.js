'use strict'

const Hash = use('Hash');
const User = use('App/Models/User');
const Database = use('Database');

class AuthController {
  async signInPage({ view }) {
    return view.render('auth.signin');
  }

  async signUpPage({ view, response }) {
    const rolesData = await Database.table('roles')
      .select('*')
      .whereIn('slug', ['qa', 'pm']);

    return view.render('auth.signup', {
      roles: rolesData
    });
  }

  async signUp({ request, response, auth }) {
    const data = request.only([
      'email',
      'password',
      'full_name',
      'role_id'
    ]);

    data.password = await Hash.make(data.password);
    const user = await User.create(data);

    await auth.login(user);

    return response.route('dashboard');
  }

  async signIn({ request, response, auth, session }) {
    const data = request.only([
      'email', 'password'
    ]);

    const user = await User.findBy('email', data.email);
    const valid = await Hash.verify(data.password, user.password);

    if (!valid) {
      session.withErrors([{ password: data.password, message: 'Wrong password' }])
        .flashAll();

      return response.redirect('back');
    }

    await auth.login(user);

    return response.route('dashboard')
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.redirect('/');
  }
}

module.exports = AuthController
