'use strict'

class ProjectCommentUpdate {
  get rules () {
    return {
      id: 'required|integer',
      text: 'required|string',
      user_id: 'required|integer',
      project_id: 'required|integer'    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'text.required': 'You must provide a text',
      'project_id.required': 'You must provide a project'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = ProjectCommentUpdate
