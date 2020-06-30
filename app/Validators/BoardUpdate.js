'use strict'

class BoardUpdate {
  get rules () {
    return {
      id: 'required|integer',
      title: 'required|string',
      project_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'project_id.required': 'You mus provide a project'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = BoardUpdate
