'use strict';

$(document).ready(function() {
  const profilePage = $('#profile-page');
  let avatarFile;

  profilePage.find('.avatar img').click(() => {
    profilePage.find('input[name=avatar]').click();
  });

  profilePage.find('input[name=avatar]').change(function(e) {
    avatarFile = this.files[0];
    const data = new FormData();
    data.append('avatar', avatarFile, avatarFile.name);
    $.ajax({
      url:  '/profile/loadAvatar',
      type: 'POST',
      data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: (data) => console.log(data)
    });
  });

});
