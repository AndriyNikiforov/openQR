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
})
  .middleware(['qa'])
  .prefix('test-case');

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
    .as('invite-list');

  Route.get('form', 'InviteProjectMemberController.mailForm')
    .as('invite-form');

  Route.post('send', 'InviteProjectMemberController.sendMail')
    .validator(['InviteProjectMemberCreate'])
    .as('invite-send');
})
  .middleware(['pm'])
  .prefix('invite');

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
    .as('bug-report-store');

  Route.post('/update', 'BugReportController.update')
    .validator(['BugReportUpdate'])
    .as('bug-report-update');

  Route.get('/remove', 'BugReportController.remove')
    .as('bug-report-remove');
}).prefix('bug-report');

Route.group(() => {
  Route.get('/', 'BoardController.index')
    .as('board');

  Route.get('/page/create', 'BoardController.createPage')
    .as('board-crate-page');

  Route.get('/page/update', 'BoardController.updatePage')
    .as('board-update-page');

  Route.post('/store', 'BoardController.store')
    .validator(['BoardCreate'])
    .as('board-store');

  Route.post('/update', 'BoardController.update')
    .validator(['BoardUpdate'])
    .as('board-update');

  Route.get('/remove/:id?', 'BoardController.remove')
    .as('board-remove');
})
  .middleware(['pm'])
  .prefix('board');

Route.group(() => {
  Route.get('/', 'BoardColumnController.index')
    .as('board-column');

  Route.post('/store', 'BoardColumnController.store')
    .validator(['BoardColumnCreate'])
    .as('board-column-store');

  Route.post('/update', 'BoardColumnController.update')
    .validator(['BoardColumnUpdate'])
    .as('board-column-update');

  Route.get('/remove', 'BoardColumnController.remove')
    .as('board-column-remove');
})
  .middleware(['pm'])
  .prefix('board-column');

Route.group(() => {
  Route.get('/detail/:id?', 'BoardColumnRowController.detail')
    .as('board-column-row-detail');

  Route.post('/store', 'BoardColumnRowController.store')
    .middleware(['pm'])
    .as('board-column-row-store');

  Route.post('/update', 'BoardColumnRowController.update')
    .as('board-column-row-update');

  Route.get('/remove/:id?', 'BoardColumnRowController.remove')
    .middleware(['pm'])
    .as('board-column-row-remove');
}).prefix('board-column-row');

Route.group(() => {
  Route.post('/store', 'ProjectCommentController.store')
    .validator(['ProjectCommentCreate'])
    .as('project-comments-store');

  Route.get('/remove/:id?', 'ProjectCommentController.remove')
    .as('project-comments-remove');
}).prefix('project-comments')

Route.group(() => {
  Route.get('/', 'SecurityErrorController.index')
    .as('security-error');

  Route.get('/page/create', 'SecurityErrorController.createPage')
    .middleware(['qa'])
    .as('security-error-create-page');

  Route.get('/page/update', 'SecurityErrorController.updatePage')
    .middleware(['qa'])
    .as('security-error-update-page');

  Route.post('/store', 'SecurityErrorController.store')
    .validator(['SecurityErrorCreate'])
    .as('security-error-store');

  Route.post('/update', 'SecurityErrorController.update')
    .validator(['SecurityErrorUpdate'])
    .as('security-error-update');

  Route.get('/remove', 'SecurityErrorController.remove')
    .middleware(['qa'])
    .as('security-error-remove');
}).prefix('security-error');
