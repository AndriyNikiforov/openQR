'use strict'

class ProfileUpdate {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      full_name: 'required|string|min:2',
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'email.unique': 'You must provide a unique email address',
      'full_name.required': 'You must provide a full name',
      'full_name.min': 'You must provide a valid size full name',
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = ProfileUpdate
