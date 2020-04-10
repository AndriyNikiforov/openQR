'use strict'

class SecurityErrorUpdate {
  get rules () {
    return {
      id: 'required|integer',
      title: 'required|string',
      score: 'required|number',
      text: 'required|string',
      user_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a email address',
      'score.required': 'You must provide a valid email address',
      'text.required': 'You must provide a text',
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = SecurityErrorUpdate
