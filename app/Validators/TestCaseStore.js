'use strict'

class TestCaseStore {
  get rules () {
    return {
      user_id: 'required|integer',
      title: 'required|string',
      description: 'required|string',
      status_id: 'required|integer',
      project_id: 'required|integer'
    };
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'user_id.required': 'You must provide a user',
      'title.required': 'You must provide a title',
      'description.required': 'You must provide a description',
      'status_id.required': 'You must provide a status',
      'project_id.required': 'You must provide a project'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = TestCaseStore
