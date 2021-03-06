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

  $('#to-pdf').click((e) => {
    e.preventDefault();

    const titlePDF = $('#title').text();
    const elementHTML = document.getElementById('content');
    htmlToPdf()
      .set({
        filename: titlePDF,
        html2canvas: { scale: 4 }
      })
      .from(elementHTML)
      .save();
  });

  $('#to-bug-report-pdf').click((e) => {
    e.preventDefault();

    const titlePDF = $('#bug-report-title').text();
    const elementHTML = document.getElementById('bug-report-content');
    htmlToPdf()
      .set({
        filename: titlePDF,
        html2canvas: { scale: 4 }
      })
      .from(elementHTML)
      .save();
  });

  $('#to-stat-pdf').click((e) => {
    e.preventDefault();

    const elementHTML = document.getElementById('stat-content');
    htmlToPdf()
      .set({
        filename: 'Statistic.pdf',
        html2canvas: { scale: 4 }
      })
      .from(elementHTML)
      .save();
  });

  $('#to-all-cases-pdf').click((e) => {
    e.preventDefault();

    const titlePDF = 'All_cases';
    const elementHTML = document.getElementById('content');
    htmlToPdf()
      .set({
        filename: titlePDF,
        html2canvas: { scale: 4 }
      })
      .from(elementHTML)
      .save();
  });

  if($('#editor').length != 0) {
  ClassicEditor
    .create(document.querySelector('#editor'))
    .then(editor => {
      editor.editing.view.change(writer => {
        writer.setStyle('height', '500px', editor.editing.view.document.getRoot());
        writer.setStyle('width', '700px', editor.editing.view.document.getRoot());
      });
      window.editor = editor;
    }).catch( error => {
      console.error( 'There was a problem initializing the editor.', error );
    });
  }

  if($('#countSuccess').text()) {
    const countSuccess = $('#countSuccess').text();
    const countFailed = $('#countFailed').text();
    const countFuture = $('#countFuture').text();
    const countInProgress = $('#countInProgress').text();

    const ctx = $('#chart-pie');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [countSuccess || 0, countFailed || 0, countFuture || 0, countInProgress || 0],
            backgroundColor: [
              "rgb(0, 153, 51)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(113, 120, 200)"
            ]
          }
        ],
        labels: [
          'Count Success',
          'Count Failed',
          'Count Future',
          'Count In progress'
        ],
      },
      options: {
        responsive: false
      }
    });
  }
});
