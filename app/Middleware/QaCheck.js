'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('App/Models/Role');

class QaCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    const role = await Role.find(auth.user.role_id);

    if (role.id != 1) {
      return response.redirect('back');
    }

    await next();
  }
}

module.exports = QaCheck
