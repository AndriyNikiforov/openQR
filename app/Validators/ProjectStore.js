'use strict'

class ProjectStore {
  get rules () {
    return {
      'title': 'required|string',
      'user_id': 'required|integer',
      'description': 'required|string',
      'technical_info': 'required|string',
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'description.required': 'You must provide description',
      'technical_info': 'You must provide technical info'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = ProjectStore
