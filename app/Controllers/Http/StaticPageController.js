'use strict'

class StaticPageController {
  async index({ view }) {
    return view.render('main.index');
  }
}

module.exports = StaticPageController
