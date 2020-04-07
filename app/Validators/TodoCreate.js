'use strict'

class TodoCreate {
  get rules () {
    return {
      text: 'required|string',
      title: 'required|string'
    };
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'text.required': 'You must provide a text',
      'title.required': 'You must provide a title'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = TodoCreate
