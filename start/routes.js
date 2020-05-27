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
const Route = use('Route');

Route.get('/', 'StaticPageController.index')
  .as('main')
  .middleware(['staticCheck']);

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
})
  .middleware(['admin'])
  .prefix('dashboard');

Route.group(() => {
  Route.get('/dashboard/:id?/:page?', 'ProjectController.index')
    .middleware(['accessProject'])
    .as('project');

  Route.get('/page/create', 'ProjectController.createPage')
    .middleware(['pm'])
    .as('project-create-page');

  Route.get('/page/edit/:id?', 'ProjectController.editPage')
    .middleware(['pm'])
    .as('project-edit-page');

  Route.get('/edit/:id?', 'ProjectController.editPage')
    .middleware(['pm'])
    .as('project-edit');

  Route.post('store', 'ProjectController.store')
    .validator(['ProjectStore'])
    .as('project-store');

  Route.post('update', 'ProjectController.update')
    .validator(['ProjectUpdate'])
    .as('project-update');

  Route.get('delete/:id?', 'ProjectController.delete')
    .middleware(['pm'])
    .as('project-delete');
}).prefix('project');

Route.group(() => {
  Route.post('/add', 'ProjectMemberApiController.add')
    .validator(['ProjectMemberAdd'])
    .as('project-member-create');

  Route.get('/remove/:id?', 'ProjectMemberApiController.remove')
    .as('project-member-remove')
})
  .middleware(['pm'])
  .prefix('/project/member');

Route.group(() => {
  Route.get('/:id?', 'TestCaseController.index')
    .as('test-case');

  Route.get('/page/create/:id?', 'TestCaseController.createPage')
    .middleware(['qa'])
    .as('test-case-create-page');

  Route.get('/page/edit/:id?', 'TestCaseController.editPage')
    .middleware(['qa'])
    .as('test-case-edit-page');

  Route.post('store', 'TestCaseController.store')
    .validator(['TestCaseStore'])
    .as('test-case-store');

  Route.post('update', 'TestCaseController.update')
    .validator(['TestCaseUpdate'])
    .as('test-case-update');

  Route.get('remove/:id?', 'TestCaseController.delete')
    .middleware(['qa'])
    .as('test-case-remove');
}).prefix('test-case');

Route.group(() => {
  Route.get('/page/create/:test_case_id?', 'ActionController.createPage')
    .as('action-create-page');
  Route.get('/page/update/:id?/:test_case_id?', 'ActionController.editPage')
    .as('action-update-page');

  Route.post('/store', 'ActionController.store')
    .validator(['ActionCreate'])
    .as('action-store');

  Route.post('/update', 'ActionController.update')
    .validator(['ActionUpdate'])
    .as('action-update');

  Route.get('/remove/:id?/:test_case_id?', 'ActionController.remove')
    .as('action-remove');
})
  .middleware(['qa'])
  .prefix('action');

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
})
  .middleware('pm')
  .prefix('project/members');

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
    .middleware(['pm'])
    .as('invite-list');

  Route.get('remove/:id?', 'InviteProjectMemberController.removeMail')
    .middleware(['pm'])
    .as('invite-remove');

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
    .middleware(['qa'])
    .as('bug-report-create-page');

  Route.get('/page/update/:id?', 'BugReportController.updatePage')
    .middleware(['qa'])
    .as('bug-report-update-page');

  Route.get('/page/detail/:id?', 'BugReportController.detailPage')
    .as('bug-report-detail-page');

  Route.post('/store', 'BugReportController.store')
    .validator(['BugReportCreate'])
    .middleware(['qa'])
    .as('bug-report-store');

  Route.post('/update', 'BugReportController.update')
    .validator(['BugReportUpdate'])
    .middleware(['qa'])
    .as('bug-report-update');

  Route.get('/remove/:id?', 'BugReportController.remove')
    .middleware(['qa'])
    .as('bug-report-remove');
}).prefix('bug-report');

Route.group(() => {
  Route.get('/:id?', 'ProjectNewController.index')
    .as('project-news');

  Route.get('/page/create/:project_id?', 'ProjectNewController.createPage')
    .as('project-news-create-page');

  Route.post('/store', 'ProjectNewController.store')
    .validator(['ProjectCommentCreate'])
    .as('project-news-store');

  Route.get('/remove/:id?', 'ProjectNewController.remove')
    .as('project-news-remove');
}).prefix('project-news')

Route.group(() => {
  Route.get('/:page?', 'SecurityErrorController.index')
    .as('security-error');

  Route.get('/page/detail/:id?', 'SecurityErrorController.detailPage')
    .as('security-error-detail-page');

  Route.get('/page/create', 'SecurityErrorController.createPage')
    .middleware(['qa'])
    .as('security-error-create-page');

  Route.get('/page/update/:id?', 'SecurityErrorController.updatePage')
    .middleware(['qa'])
    .as('security-error-update-page');

  Route.post('/store', 'SecurityErrorController.store')
    .validator(['SecurityErrorCreate'])
    .middleware(['qa'])
    .as('security-error-store');

  Route.post('/update', 'SecurityErrorController.update')
    .validator(['SecurityErrorUpdate'])
    .middleware(['qa'])
    .as('security-error-update');

  Route.get('/remove/:id?', 'SecurityErrorController.remove')
    .middleware(['qa'])
    .as('security-error-remove');
}).prefix('security-error');
