'use strict'

const Database = use('Database');
const BugReport = use('App/Models/BugReport');

class BugReportService {
  async list(id, page) {
    page = page || 1;
    const viewData = await Database
      .select(
        'bug_reports.id',
        'bug_reports.title',
        'bug_reports.description',
        'projects.id as project_id',
        'projects.title as project'
      )
      .from('bug_reports')
      .where('bug_reports.user_id', id)
      .leftJoin('projects', 'bug_reports.project_id', 'projects.id')
      .paginate(page, 8);

    return { bugReports: viewData };
  }

  async createPageData() {
    const viewData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .from('projects');

    return { projects: viewData };
  }

  async updatePageData(id) {
    const projectsData = await Database
    .select(
      'projects.id',
      'projects.title'
    ).from('projects');
    const bugReportData = await BugReport.find(id);

    return {
      projects: projectsData,
      bugReport: bugReportData
    };
  }

  async detailPageData(id) {
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

    return {
      project: projectData,
      bugReport: bugReportData
    };
  }
}

module.exports = new BugReportService();
