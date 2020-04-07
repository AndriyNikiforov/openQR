'use strict'

const DashboardService = use('App/Services/DashboardService');

class DashboardController {
  async index({ view, params }) {
    let { page } = params;
    const viewData = await DashboardService.list(page);

    return view.render('dashboard.index', viewData);
  }
}

module.exports = DashboardController
