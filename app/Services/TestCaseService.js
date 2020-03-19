'use strict'

const Database = use('Database');

class TestCaseService {
  async list(id) {
    const testCaseData = await Database
      .select(
        'users.email',
        'users.full_name',
        'test_cases.title',
        'test_cases.steps',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .first();

    return {
      testCase: testCaseData
    };
  }

  async createPageData(id) {
    const projectData = await Database
      .select('title')
      .where('id', id)
      .first();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return {
      project: projectData,
      statuses: statusesData
    }
  }

  async editPageData(id) {
    const testCaseData = await Database
      .select(
        'users.email',
        'users.full_name',
        'test_cases.title',
        'test_cases.steps',
        'test_cases.description',
        'statuses.name as st_name',
        'statuses.type as st_type',
        'projects.title as pt_name'
      )
      .from('test_cases')
      .where('test_cases.id', id)
      .leftJoin('projects', 'test_cases.project_id', 'projects.id')
      .leftJoin('users', 'test_cases.user_id', 'users.id')
      .first();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return {
      testCase: testCaseData,
      statuses: statusesData
    };
  }
}

module.exports = new TestCaseService();
