'use strict'

const Database = use('Database');
const SecurityError = use('App/Models/SecurityError');

class SecurityErrorController {
  async index({ params, view }) {
    let { page } = params;
    page = page || 1;

    const viewData = await Database
      .select(
        'users.full_name',
        'security_errors.id',
        'security_errors.title',
        'security_errors.text',
        'security_errors.score'
      )
      .from('security_errors')
      .leftJoin('users', 'users.id', 'security_errors.user_id')
      .paginate(page, 7);

    return view.render('', {
      securityErrors: viewData
    });
  }

  async createPage({ view }) {
    return view.render('');
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const viewData = await SecurityError.find(id);

    return view.render('', {
      securityError: viewData
    });
  }

  async store({ request, response, auth }) {
    const userId = auth.user.id;
    const data = request.only([
      'text',
      'score',
      'title'
    ]);

    data.user_id = userId;
    const securityError = new SecurityError();

    securityError.fill(data);
    await securityError.save();

    return response.route('security-error');
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'text',
      'score',
      'title'
    ]);
    const securityError = await SecurityError.find(id);

    securityError.fill(data);
    await securityError.save();

    return response.route('security-error');
  }

  async remove({ params, response }) {
    const { id } = params;
    const securityError = await SecurityError.find(id);

    await securityError.delete();
    return response.route('security-error');
  }
}

module.exports = SecurityErrorController
