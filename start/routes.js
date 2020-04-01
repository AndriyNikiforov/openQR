'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'StaticPageController.index')
  .as('main')
  .middleware(['admin']);

Route.group(() => {
  Route.get('/about', 'StaticPageController.about')
    .as('about');

  Route.get('/contact', 'StaticPageController.contact')
    .as('contact');

  Route.post('send', 'StaticPageController.sendMessage')
    .validator(['ContactMessage'])
    .as('send-message');
}).prefix('static');

Route.group(() => {
  Route.get('in', 'AuthController.signInPage')
    .as('signInPage');

  Route.get('up', 'AuthController.signUpPage')
    .as('signUpPage');
}).prefix('sign/');

Route.group(() => {
  Route.post('in', 'AuthController.signIn')
    .validator(['SignIn'])
    .as('signin');

  Route.post('up', 'AuthController.signUp')
    .validator(['SignUp'])
    .as('signup');
}).prefix('auth/sign');

Route.get('/forgot/password', 'AuthController.forgotPasswordPage')
  .as('forgot-password-page');

Route.post('forgot-password', 'AuthController.forgotPassword')
  .validator(['ForgotPassword'])
  .as('forgot-password')

Route.get('/logout', 'AuthController.logout')
  .as('logout');

Route.group(() => {
  Route.get('/:page?', 'DashboardController.index')
    .as('dashboard');
}).prefix('dashboard');

Route.group(() => {
  Route.get('/dashboard/:id?/:page?', 'ProjectController.index')
    .as('project');

  Route.get('/page/create', 'ProjectController.createPage')
    .as('project-create-page');

  Route.get('/page/edit/:id?', 'ProjectController.editPage')
    .as('project-edit-page');

  Route.get('/edit/:id?', 'ProjectController.editPage')
    .as('project-edit');

  Route.post('store', 'ProjectController.store')
    .validator(['ProjectStore'])
    .as('project-store');

  Route.post('update', 'ProjectController.update')
    .validator(['ProjectUpdate'])
    .as('project-update');

  Route.get('delete/:id?', 'ProjectController.delete')
    .as('project-delete');
}).prefix('project');

Route.group(() => {
  Route.post('/add', 'ProjectMemberApiController.add')
    .validator(['ProjectMemberAdd'])
    .as('project-member-create');

  Route.get('/remove/:id?', 'ProjectMemberApiController.remove')
    .as('project-member-remove')
}).prefix('/project/member');

Route.group(() => {
  Route.get('/:id?', 'TestCaseController.index')
    .as('test-case');

  Route.get('/page/create', 'TestCaseController.createPage')
    .as('test-case-create-page');

  Route.get('/page/edit/:id?', 'TestCaseController.editPage')
    .as('test-case-edit-page');

  Route.post('store', 'TestCaseController.store')
    .validator(['TestCaseStore'])
    .as('test-case-store');

  Route.post('update', 'TestCaseController.update')
    .validator(['TestCaseUpdate'])
    .as('test-case-update');

  Route.get('remove/:id?', 'TestCaseController.delete')
    .as('test-case-remove');
}).prefix('test-case');

Route.group(() => {
  Route.get('/:id?', 'ProjectMemberController.index')
    .as('project-members');

  Route.get('page/create', 'ProjectMemberController.createPage')
    .as('project-members-create-page');

  Route.get('page/create/fast/:id?', 'ProjectMemberController.addMember')
    .as('project-members-fast-create-page')

  Route.post('store', 'ProjectMemberController.create')
    .validator(['ProjectMemberAdd'])
    .as('project-members-store');

  Route.get('remove/:id?', 'ProjectMemberController.remove')
    .as('project-members-remove');
}).prefix('project/members');

Route.group(() => {
  Route.get('/', 'ProfileController.index')
    .as('profile');

  Route.get('/edit', 'ProfileController.editPage')
    .as('profile-edit-page');

  Route.post('/update', 'ProfileController.update')
    .validator(['ProfileUpdate'])
    .as('profile-update');
}).prefix('profile');


Route.group(() => {
  Route.get('/:page?', 'TodoController.index')
    .as('todo');

  Route.get('/page/create', 'TodoController.createPage')
    .as('todo-create-page');

  Route.get('/page/update/:id?', 'TodoController.updatePage')
    .as('todo-update-page')

  Route.post('/store', 'TodoController.create')
    .validator(['TodoCreate'])
    .as('todo-store');

  Route.post('/update', 'TodoController.update')
    .validator(['TodoUpdate'])
    .as('todo-update');

  Route.get('/remove/:id?', 'TodoController.remove')
    .as('todo-remove');
}).prefix('todo')

Route.group(() => {
  Route.get('list/:page?', 'InviteProjectMemberController.index')
    .as('invite-list');

  Route.get('form', 'InviteProjectMemberController.mailForm')
    .as('invite-form');

  Route.post('send', 'InviteProjectMemberController.sendMail')
    .validator(['InviteProjectMemberCreate'])
    .as('invite-send');
}).prefix('invite');

Route.group(() => {
  Route.get('/', 'BugReportController.index')
    .as('bug-report');

  Route.get('/page/create', 'BugReportController.createPage')
    .as('bug-report-create-page');

  Route.get('/page/update/:id?', 'BugReportController.updatePage')
    .as('bug-report-update-page');

  Route.get('/page/detail/:id?', 'BugReportController.detailPage')
    .as('bug-report-detail-page');

  Route.post('/store', 'BugReportController.store')
    .validator(['BugReportCreate'])
    .as('bug-report-store');

  Route.post('/update', 'BugReportController.update')
    .validator(['BugReportUpdate'])
    .as('bug-report-update');

  Route.get('/remove', 'BugReportController.remove')
    .as('bug-report-remove');
}).prefix('bug-report');


Route.group(() => {

}).prefix('api/v1/');
