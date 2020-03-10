'use strict'

class StaticPageController {
  async index({ view }) {
    return view.render('main.index');
  }

  async about({ view }) {
    return view.render('main.about');
  }

  async contact({ view }) {
    return view.render('main.contact');
  }

  async sendMessage({ request, response }) {
    return response.json({});
  }
}

module.exports = StaticPageController
