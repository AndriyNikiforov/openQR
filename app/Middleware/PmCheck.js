'use strict'

class PmCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    try {
      const user = await auth.getUser();

      if (user.roles.slug != 'qa') {
        return response.route('dashboard', { page: 1 });
      }
    } catch(error) {
      return response.route('signInPage');
    }

    await next();
  }
}

module.exports = PmCheck
