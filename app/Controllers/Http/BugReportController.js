'use strict'

const Database = use('Database');
const BugReport = use('App/Models/BugReport');

class BugReportController {
  async index({ params, view, auth }) {
    const id = auth.user.id;
    let { page } = params;
    page = page || 1;
    const viewData = await Database
      .select(
        'bug_reports.title',
        'bug_reports.description',
        'bug_reports.id',
        'projects.id as project_id',
        'projects.title as project'
      )
      .from('bug_reports')
      .where('bug_reports.user_id', id)
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
      .from('projects');

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
    ).from('projects');
    const bugReportData = await BugReport.find(id);

    return view.render('bug_report.update', {
      bugReport: bugReportData,
      projects: projectsData
    });
  }

  async detailPage({ params, view }) {
    const { id } = params;
    const bugReportData = await Database
      .select(
        'bug_reports.text',
        'bug_reports.title',
        'bug_reports.project_id',
        'bug_reports.description',
        'users.full_name'
      ).from('bug_reports')
      .where('bug_reports.id', id)
      .leftJoin('users', 'bug_reports.user_id', 'users.id')
      .first();

    const projectData = await Database
      .select(
        'projects.id',
        'projects.title'
      ).from('projects')
      .where('projects.id', bugReportData.project_id)
      .first();

    return view.render('bug_report.detail', {
      bugReport: bugReportData,
      project: projectData
    });
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
