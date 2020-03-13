'use strict'

const TestCase = use('App/Models/TestCase');
const Database = use('Database');

class TestCaseController {
  async index({ params, view }) {
    const { id } = params;
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

    return view.render('test_case.index', {
      testCase: testCaseData
    });
  }

  async createPage({ view, params }) {
    const { id } = params;
    const projectData = await Database
      .select('title')
      .where('id', id)
      .first()

    return view.render('test_case.create', {
      project: projectData
    });
  }

  async editPage({ params, view }) {
    const { id } = params;
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

    return view.render('test_case.edit', {
      testCase: testCaseData,
      statuses: statusesData
    });
  }

  async store() {

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = TestCaseController
