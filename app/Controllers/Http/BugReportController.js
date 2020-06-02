'use strict'

const BugReport = use('App/Models/BugReport');
const BugReportService = use('App/Services/BugReportService');

class BugReportController {
  async index({ params, view, auth }) {
    const id = auth.user.id;
    let { page } = params;
    const viewData = await BugReportService
      .list(id, page);

    return view.render('bug_report.index', viewData);
  }

  async createPage({ view, auth }) {
    const id = auth.user.id;
    const viewData = await BugReportService
      .createPageData(id);

    return view.render('bug_report.create', viewData);
  }

  async updatePage({ params, view, auth }) {
    const { id } = params;
    const userId = auth.user.id;
    const viewData = await BugReportService
      .updatePageData(id, userId);

    return view.render('bug_report.update', viewData);
  }

  async detailPage({ params, view }) {
    const { id } = params;
    const viewData = await BugReportService
      .detailPageData(id);

    return view.render('bug_report.detail', viewData);
  }

  async store({ request, response }) {
    const data = request.only([
      'text',
      'title',
      'user_id',
      'project_id',
      'description'
    ]);
    const bugReport = new BugReport();

    bugReport.fill(data);
    await bugReport.save();

    return response.route('bug-report');
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'text',
      'title',
      'user_id',
      'project_id',
      'description'
    ]);
    const bugReport = await BugReport.find(data.id);

    bugReport.merge(data);
    await bugReport.save();

    return response.route('bug-report');
  }

  async remove({ params, response }) {
    const { id } = params;
    const bugReport = await BugReport.find(id);

    await bugReport.delete();
    return response.route('bug-report');
  }
}

module.exports = BugReportController;
