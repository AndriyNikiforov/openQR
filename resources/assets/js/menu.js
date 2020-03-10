$(document).ready(() => {
  $('.navbar-burger').click(() => {
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });


  $('#not-found-account').click(() => {
    $('#not-found-message').hide();
  });
});
