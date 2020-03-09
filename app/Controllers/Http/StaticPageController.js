'use strict'

class StaticPageController {
  async index({ view }) {
    return view.render('main.index');
  }

  async about({ view }) {
    return view.render('main.about');
  }
}

module.exports = StaticPageController
