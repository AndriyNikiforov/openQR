'use strict'

class BugReportCreate {
  get rules () {
    return {
      title: 'required|string',
      description: 'required|string',
      text: 'required|string',
      project_id: 'required|integer'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'description.required': 'You must provide a description',
      'text.required': 'You must provide a text',
      'project_id.required': 'You must provide a project',
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = BugReportCreate
