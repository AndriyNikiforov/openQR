'use strict'

const Database = use('Database');
const TestCase = use('App/Models/TestCase');
const TestCaseService = use('App/Services/TestCaseService');

class TestCaseController {
  async index({ params, view }) {
    const { id } = params;
    const viewData = await TestCaseService
      .list(id);

    return view.render('test_case.index', viewData);
  }

  async fastCreatePage({ response }) {
    const projectsData = await Database
      .select(
        'projects.id',
        'projects.title'
      )
      .from('projects')
      .fetch();

    const statusesData = await Database
      .select('*')
      .from('statuses');

    return response.json({
      projects: projectsData,
      statuses: statusesData
    });
  }

  async createPage({ view, params }) {
    const { id } = params;
    const viewData = await TestCaseService
      .createPageData(id);

    return view.render('test_case.create', viewData);
  }

  async editPage({ params, view }) {
    const { id } = params;
    const viewData = await TestCaseService
      .editPageData(id);

    return view.render('test_case.edit', viewData);
  }

  async store({ request, response }) {
    const testCaseData = request.only([
      'title',
      'user_id',
      'status_id',
      'project_id',
      'description'
    ]);

    await TestCase.create(testCaseData);

    return response.route('project', {
      id: testCaseData.project_id
    });
  }

  async update({ request, response }) {
    const testCaseData = request.only([
      'id',
      'title',
      'user_id',
      'status_id',
      'project_id',
      'description'
    ]);
    const testCase = await TestCase
      .find(testCaseData.id);

    testCase.merge(testCaseData);
    await testCase.save();

    return response.route('project', {
      id: testCaseData.project_id
    });
  }

  async delete({ params, response }) {
    const { id } = params;
    const testCase = await TestCase
      .find(id);

    await testCase.delete();
    return response.route('back');
  }
}

module.exports = TestCaseController
