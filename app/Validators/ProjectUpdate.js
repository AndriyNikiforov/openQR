'use strict'

class ProjectUpdate {
  get rules () {
    return {
      id: 'required|integer',
      title: 'required|string',
      description: 'required|string',
      technical_info: 'required|string',
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'title.required': 'You must provide a title',
      'description.required': 'You must provide description',
      'technical_info.required': 'You must provide technical info'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = ProjectUpdate
