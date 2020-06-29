'use strict'

class BoardColumnRowUpdate {
  get rules () {
    return {
      id: 'required|integer',
      title: 'required|string',
      description: 'required|string',
      time_estimated: 'required|string',
      time_tracked: 'required|string',
      board_column_id: 'required|integer',
      board_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'description.required': 'You must provide a description',
      'time_estimated.required': 'You must provide a time estimated',
      'time_tracked.required': 'You must provide a time tracked'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = BoardColumnRowUpdate
