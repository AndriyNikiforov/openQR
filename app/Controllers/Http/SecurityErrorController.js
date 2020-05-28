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
        'security_errors.text',
        'security_errors.score',
        'security_errors.title'
      )
      .from('security_errors')
      .leftJoin('users', 'users.id', 'security_errors.user_id')
      .paginate(page, 7);

    return view.render('security_error.index', {
      securityErrors: viewData
    });
  }

  async detailPage({ params, view }) {
    const { id } = params;
    const viewData = await SecurityError.find(id);

    return view.render('security_error.detail', {
      secData: viewData
    });
  }

  async createPage({ view }) {
    return view.render('security_error.create');
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const viewData = await SecurityError.find(id);

    return view.render('security_error.update', {
      securityError: viewData
    });
  }

  async store({ request, response, auth }) {
    const data = request.only([
      'text',
      'score',
      'title',
      'user_id'
    ]);

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
      'title',
      'user_id'
    ]);
    const securityError = await SecurityError.find(data.id);

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
