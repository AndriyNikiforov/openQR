'use strict'

class BoardColumnUpdate {
  get rules () {
    return {
      id: 'required|integer',
      title: 'required|string',
      board_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = BoardColumnUpdate
