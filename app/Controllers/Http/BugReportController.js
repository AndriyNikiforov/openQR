'use strict'

const BugReport = use('App/Models/BugReport');
const Database = use('Database');

class BugReportController {
  async index({ params, view }) {
    let { page } = params;
    page = page || 1;
    const viewData = await Database
      .select(
        'bug_reports.title',
        'bug_reports.description',
        'bug_reports.id',
        'projects.title'
      )
      .from('bug_reports')
      .leftJoin('projects', 'bug_reports.project_id', 'projects.id')
      .paginate(page, 8);

    return view.render('bug_report.index', {
      bugReports: viewData
    });
  }

  async createPage({ view }) {
    const viewData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .from('projects')
      .fetch();

    return view.render('bug_report.create', {
      projects: viewData
    });
  }

  async updatePage({ params, view }) {
    const { id } = params;
    const projectsData = await Database
    .select(
      'projects.id',
      'projects.title'
    )
    .from('projects')
    .fetch();
    const bugReportData = await BugReport.find(id);

    return view.render('bug_report.update', {
      bugReport: bugReportData,
      projects: projectsData
    });
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'description',
      'text',
      'project_id'
    ]);
    const bugReport = new BugReport();

    bugReport.fill(data);
    await bugReport.save();

    return response.route('');
  }

  async update({ request, response }) {
    const data = request.only([
      'id',
      'title',
      'description',
      'text',
      'project_id'
    ]);

    const bugReport = await BugReport.find(data.id);

    bugReport.merge(data);
    await bugReport.save();

    return response.route('');
  }

  async remove({ params, response }) {
    const { id } = params;
    const bugReport = await BugReport.find(id);

    await bugReport.delete();

    return response.route('');
  }
}

module.exports = BugReportController;
