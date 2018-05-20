'use strict';

(function() {

  $(document).ready(function() {
    const $profilePage = $('#profile-page');

    $profilePage.on('change', '.avatar input', uploadAvatarAjax);

    function uploadAvatarAjax() {
      const $avatar = $profilePage.find('.avatar img');
      const avatarFile = this.files[0];
      const data = new FormData();
      data.append('avatar', avatarFile, avatarFile.name);
      data.append('oldPath', $avatar.attr('src'));
      $.ajax({
        url: '/profile/loadAvatar',
        type: 'POST',
        data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: data => {
          if (data.err) return console.log(data.err);
          $avatar.attr('src', data.avatarPath);
        }
      });
    }
  });

})();
