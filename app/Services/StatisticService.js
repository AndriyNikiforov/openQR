'use strict'

class StatisticService {
  async statisticData(chartData, projectId) {
    const countAll = chartData.length;
    let countSuccess = chartData
      .filter(item => item.status_type == 'is-success')
      .length;
    let countFailed = chartData
      .filter(item => item.status_type == 'is-danger')
      .length;
    let countInProgress = chartData
        .filter(item => item.status_type == 'is-warning')
        .length;
    let countFuture = chartData
        .filter(item => item.status_type == 'is-info')
        .length;

    countFuture = ((countFuture / countAll) * 100).toFixed(1);
    countFailed = ((countFailed / countAll) * 100).toFixed(1);
    countSuccess = ((countSuccess / countAll) * 100).toFixed(1);
    countInProgress = ((countInProgress / countAll) * 100).toFixed(1);

    return {
      countAll: countAll,
      countFuture: (isNaN(countFuture)) ? 0 : countFuture,
      countFailed: (isNaN(countFailed)) ? 0 : countFailed,
      countSuccess: (isNaN(countSuccess)) ? 0 : countSuccess,
      countInProgress: (isNaN(countInProgress)) ? 0 : countInProgress,
      projectId: projectId
    };
  }
}

module.exports = new StatisticService();
