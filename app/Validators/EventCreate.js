'use strict'

class EventCreate {
  get rules () {
    return {
      title: 'required|string',
      project_id: 'required|integer',
      event_date: 'required|string',
      description: 'required|string'
    }
  }

  get validateAll () {
    return true;
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = EventCreate
