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

  async forgotPasswordPage({ view }) {
    return view.render('auth.forgot_password');
  }

  async signUp({ request, response, auth }) {
    const data = request.only([
      'email',
      'password',
      'full_name',
      'role_id',
      'secret_word'
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

    if (!user) {
      return response.route('signUpPage')
    }

    const valid = await Hash.verify(data.password, user.password);

    if (!valid) {
      session.withErrors([{ password: data.password, message: 'Wrong password' }])
        .flashAll();

      return response.redirect('back');
    }

    await auth.login(user);

    return response.route('dashboard')
  }

  async forgotPassword({ response, request, auth, session }) {
    const data = request.only([
      'email',
      'password',
      'secret_word'
    ]);

    data.password = await Hash.make(data.password);
    const checkUser = await Database.table('users')
      .where('email', data.email)
      .first();

    if (checkUser === null) {
      session.flash({ notification: 'Not found your account' });

      return response.redirect('back');
    }

    const user = await User.find(checkUser.id);
    await auth.login(user);

    return response.route('dashboard');
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.redirect('/');
  }
}

module.exports = AuthController
