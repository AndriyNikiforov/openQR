try {
  window.Popper = require('popper.js').default;
  window.$ = window.jQuery = require('jquery');

  require('@fontawesome/fontawesome-free/js/all');
} catch (e) {}
