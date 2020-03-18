'use strict'

const DashboardService = use('App/Service/DashboardService');

class DashboardApiController {
  async index({ view, params }) {
    let { page } = params;
    const viewData = await DashboardService.list(page);

    return view.render('dashboard.index', viewData);
  }
}

module.exports = DashboardApiController
