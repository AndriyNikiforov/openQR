'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project');
const ProjectMember = use('App/Models/ProjectMember');

class ProjectAccess {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ params, response, auth }, next) {
    const dataRequest = params;
    const user = auth.user.id;
    const dataMember = await ProjectMember
      .query()
      .select('user_id')
      .where('id', dataRequest.id)
      .where('user_id', user)
      .fetch();

    if (!dataMember) {
      return response.redirect('back');
    }

    await next();
  }
}

module.exports = ProjectAccess;
