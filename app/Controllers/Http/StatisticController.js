'use strict'

const Database = use('Database');
const StatisticService = use('App/Services/StatisticService');

class StatisticController {
  async projectStat({ params, view }) {
    const { id } = params;
    const chartData = await Database
      .select(
        'statuses.type as status_type',
        'test_cases.id as test_case_id',
      )
      .from('test_cases')
      .where('test_cases.project_id', id)
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .groupBy('statuses.id', 'test_cases.id');

    const viewData = await StatisticService
        .statisticData(chartData, id);

    return view.render('static.index', viewData);
  }

  async userStat({ params, view, auth }) {
    const { id } = params;
    const userId = auth.user.id;
    const chartData = await Database
      .select(
        'statuses.type as status_type',
        'test_cases.id as test_case_id',
      )
      .from('test_cases')
      .where('test_cases.project_id', id)
      .where('test_cases.user_id', userId)
      .leftJoin('statuses', 'test_cases.status_id', 'statuses.id')
      .groupBy('statuses.id', 'test_cases.id');

    const viewData = await StatisticService
      .statisticData(chartData, id);

    return view.render('static.user', viewData);
  }
}

module.exports = StatisticController
