try {
  window.Popper = require('popper.js').default;
  window.$ = window.jQuery = require('jquery');

  require('@fortawesome/fontawesome-free/js/all');
} catch (e) {}
