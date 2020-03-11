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
  Route.get('/', 'DashboardController.index')
    .as('dashboard');
}).prefix('dashboard');
