'use strict'

class BoardColumnRowCreate {
  get rules () {
    return {
      title: 'required|string',
      description: 'required|string',
      time_estimated: 'required|string',
      time_tracked: 'string',
      board_column_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'description.required': 'You must provide a description',
      'time_estimated.required': 'You must provide a time estimated'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = BoardColumnRowCreate
