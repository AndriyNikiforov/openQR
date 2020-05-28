'use strict'

const Database = use('Database');
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

  async createPage({ view }) {
    const viewData = await BugReportService
      .createPageData();

    return view.render('bug_report.create', viewData);
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const viewData = await BugReportService
      .updatePageData(id);

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
      'project_id',
      'description',
      'user_id'
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
      'project_id',
      'description',
      'user_id'
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
