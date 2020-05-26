'use strict'

class ActionUpdate {
  get rules () {
    return {
      test_case_id: 'integer|required',
      step_number: 'integer|required',
      actions_desc: 'string|required',
      result: 'string|required',
      id: 'integer|required'
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

module.exports = ActionUpdate
