'use strict'

const User = use('App/Models/User');
const ProfileService = use('App/Services/ProfileService');

class ProfileController {
  async index({ auth, view, response }) {
    const id = auth.user.id;
    const viewData = await ProfileService
      .userData(id);

    return view.render('profile.index', viewData);
  }

  async editPage({ view }) {
    const id = auth.user.id;
    const viewData = await ProfileService
      .editPageData(id);

    return view.render('profile.edit', viewData);
  }

  async update({ request, response, auth }) {
    const id = auth.user.id;
    const userData = request.only([
      'full_name',
      'email'
    ]);
    const user = await User.find(id);

    user.fill(userData);
    await user.save();

    return response.redirect('back');
  }
}

module.exports = ProfileController
