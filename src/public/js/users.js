'use strict';

$(document).ready(function() { 
  const $usersPage = $('#users-page');

  $usersPage.on('keyup', 'input#user-name', searchUsersAjax);
  $usersPage.on('click', '#load-users', loadUsersAjax);

  function searchUsers() {
    const data = {};
    data.userName = $(this).val();
    $.post('/users/load', data, (res, status) => {
      const $list = usersPage.find('.list');
      $list.empty();
      if (!res) return $list.text('no users');
      $list.append(res);
      $usersPage.find('#load-users').show(); 
    });
  }

  function loadUsersAjax() {
    const data = {};
    data.skip = $usersPage.find('.user').length;
    data.userName = $usersPage.find('input#user-name').val();
    $.post('/users/load', data, (res, status) => {
      if (!res) return $usersPage.find('#load-users').hide(); 
      $usersPage.find('.list').append(res);
    });
  }

});
