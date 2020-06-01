'use strict'

const Database = use('Database');
const BugReport = use('App/Models/BugReport');

class BugReportService {
  async list(id, page) {
    page = page || 1;
    let data = await Database
      .select('project_id')
      .from('project_members')
      .where('user_id', id);
    data = data.map(({ project_id }) => project_id);

    const viewData = await Database
      .select(
        'bug_reports.id',
        'bug_reports.title',
        'bug_reports.description',
        'projects.id as project_id',
        'projects.title as project'
      )
      .from('bug_reports')
      .whereIn('bug_reports.project_id', data)
      .leftJoin('projects', 'bug_reports.project_id', 'projects.id')
      .orderBy('bug_reports.updated_at', 'desc')
      .paginate(page, 8);

    return {
      data: data,
      bugReports: viewData
    };
  }

  async createPageData(id) {
    let data = await Database
      .select('project_id')
      .from('project_members')
      .where('user_id', id);
    data = data.map(({ project_id }) => project_id);

    const viewData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .whereIn('id', data)
      .from('projects');

    return { projects: viewData };
  }

  async updatePageData(id, userId) {
    let data = await Database
      .select('project_id')
      .from('project_members')
      .where('user_id', userId);
    data = data.map(({ project_id }) => project_id);

    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .whereIn('id', data)
      .from('projects');
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
