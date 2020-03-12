'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserBaseChecker {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    try {
      const user = await auth.getUser();

      if (user.full_name != '') {
        return response.route('dashboard', { page: 1 });
      }
    } catch(error) {
      return response.route('signInPage');
    }


    await next();
  }
}

module.exports = UserBaseChecker
