'use strict'

const Database = use('Database');

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

    const countAll = chartData.length;
    const countSuccess = chartData
      .filter(item => item.status_type == 'is-success')
      .length;
    const countFailed = chartData
      .filter(item => item.status_type == 'is-danger')
      .length;
    const countInProgress = chartData
        .filter(item => item.status_type == 'is-warning')
        .length;
    const countFuture = chartData
        .filter(item => item.status_type == 'is-info')
        .length;

    return view.render('static.index', {
      countAll: countAll,
      countFuture: ((countFuture / countAll) * 100).toFixed(1),
      countFailed: ((countFailed / countAll) * 100).toFixed(1),
      countSuccess: ((countSuccess / countAll) * 100).toFixed(1),
      countInProgress: ((countInProgress / countAll) * 100).toFixed(1)
    });
  }
}

module.exports = StatisticController
