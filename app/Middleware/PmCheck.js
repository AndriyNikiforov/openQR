'use strict'

const Role = use('App/Models/Role');

class PmCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    const role = await Role.find(auth.user.role_id);

    if (role.id != 3) {
      return response.redirect('back');
    }

    await next();
  }
}

module.exports = PmCheck
