'use strict'

class InviteProjectMemberCreate {
  get rules () {
    return {
      'email': 'required|email',
      'message': 'required|string',
      'user_id': 'required|integer',
      'project_id': 'required|integer'
    };
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'message.required': 'You must provide a message'
    };
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
      .flashAll()

    return this.ctx.response.redirect('back');
  }
}

module.exports = InviteProjectMemberCreate
