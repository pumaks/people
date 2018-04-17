'use strict';

$(document).ready(function() { 
  const usersPage = $('#users-page');

  usersPage.find('input#user-name').keyup(function() {
    const data = {};
    data.userName = $(this).val();

    $.post('/users/load', data, (res, status) => {
      const list = usersPage.find('.list');
      list.empty();
      if (!res) return list.text('no users');
      list.append(res);
      usersPage.find('#load-users').show(); 
    });

  });

  usersPage.find('#load-users').click(function() {
    const data = {};
    data.skip = usersPage.find('.user').length;
    data.userName = usersPage.find('input#user-name').val();

    $.post('/users/load', data, (res, status) => {
      if (!res) return usersPage.find('#load-users').hide(); 
      usersPage.find('.list').append(res);
    });

  });

});
