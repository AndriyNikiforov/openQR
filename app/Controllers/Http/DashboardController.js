'use strict'

const DashboardService = use('App/Services/DashboardService');

class DashboardController {
  async index({ view, params }) {
    let { page } = params;
    const viewData = await DashboardService
      .list(page);

    return view.render('dashboard.index', viewData);
  }

  async oldProjects({ params, view }) {
    let { page } = params;
    const viewData = await DashboardService
      .oldProjectsData(page);

    return view.render('dashboard.old_projects', viewData);
  }

  async search({ request, view }) {
    const data = request.only([
      'query'
    ]);
    const viewData = await DashboardService
      .searchData(data.query);

    return view.render('dashboard.search', viewData);
  }
}

module.exports = DashboardController
