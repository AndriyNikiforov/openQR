'use strict'

class ForgotPassword {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|string|max:16',
      secret_word: 'required|string'
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
      'password.max': 'You must provide a valid size password',
      'secret_word.required': 'You must provide a secret word'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = ForgotPassword
