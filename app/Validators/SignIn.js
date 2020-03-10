'use strict'

class SignIn {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|max:16'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'password.required': 'You must provide a password',
      'password.max': 'You must provide a valid size password'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = SignIn
