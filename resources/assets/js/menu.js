$(document).ready(() => {
  $('.navbar-burger').click(() => {
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });


  $('#not-found-account').click(() => {
    $('#not-found-message').hide();
  });

  $('#test-case-table tbody').click((e) => {
    e.preventDefault();

    const parent = $(e.target).parent('tr');
    ($(parent).hasClass('is-selected')) ?
     $(parent).removeClass('is-selected') :
     $(parent).addClass('is-selected');
  });

  $('#users-dropdown').click((e) => {
    e.preventDefault();

    if ($('#users-dropdown').hasClass('is-active')) {
      $('#users-dropdown').removeClass('is-active');
    } else {
      $('#users-dropdown').addClass('is-active');
    }
  });

  $('#projects-dropdown').click((e) => {
    e.preventDefault();

    if ($('#projects-dropdown').hasClass('is-active')) {
      $('#projects-dropdown').removeClass('is-active');
    } else {
      $('#projects-dropdown').addClass('is-active');
    }
  });
});
