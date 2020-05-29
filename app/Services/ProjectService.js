'use strict'

const dayjs = require('dayjs');
const Project = use('App/Models/Project');
const Database = use('Database');

class ProjectService {
  async list(id, page) {
    const projectData = await Project.find(id);
    projectData.created_at = dayjs(projectData.created_at)
      .format('YYYY-DD-MM');

    const testCasesData = await Database
      .select(
        'users.full_name',
        'statuses.name as status_name',
        'statuses.type as status_type',
        'test_cases.id as test_case_id',
        'test_cases.title as test_case_name',
        'test_cases.deleted as test_case_deleted'
      ).from('test_cases')
        .where('test_cases.project_id', id)
        .leftJoin('users', 'test_cases.user_id', 'users.id')
        .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
        .paginate(page, 8);

    return {
      project: projectData,
      testCases: testCasesData
    };
  }

  async searchData(id, query) {
    const testCaseData = await Database
    .select(
      'users.full_name',
      'statuses.name as status_name',
      'statuses.type as status_type',
      'test_cases.id as test_case_id',
      'test_cases.title as test_case_name',
      'test_cases.deleted as test_case_deleted'
    ).from('test_cases')
      .where('test_cases.project_id', id)
      .where('test_cases.title', 'LIKE', `%${query}%`)
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id');

    return { testCases: testCaseData };
  }

  async editPageData(id) {
    const projectData = await Project.find(id);
    projectData.created_at = dayjs(projectData.created_at)
      .format('YYYY-DD-MM');

    return { project: projectData };
  }
}

module.exports = new ProjectService();
