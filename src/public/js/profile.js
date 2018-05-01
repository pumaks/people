'use strict';

$(document).ready(function() {
  const $profilePage = $('#profile-page');
  let avatarFile;

  $profilePage.on('change', '.avatar input', uploadAvatarAjax);

  function uploadAvatarAjax() {
    const $avatar = $profilePage.find('.avatar img')
    avatarFile = this.files[0];
    const data = new FormData();
    data.append('avatar', avatarFile, avatarFile.name);
    data.append('oldPath', $avatar.attr('src'));
    $.ajax({
      url:  '/profile/loadAvatar',
      type: 'POST',
      data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: (data) => {
        if (data.err) return console.log(data.err);
        $avatar.attr('src', data.avatarPath);
      }
    });
  }

  $profilePage.find('.avatar img').click(() => {
    $profilePage.find('input[name=avatar]').click();
  });

  // let finalFiles = [];

  // $profilePage.find('input[name=files]').change(function() {
  //   const files = $(this)[0].files;
  //   finalFiles = finalFiles.concat(Array.from(files));

  //   let fileNames = '';

  //   for (const file of files) {      
  //     fileNames += `<p class="file-name">${file.name}<span data-file-name="${file.name}">X<span></p>`;
  //   }

  //   $(this).after(fileNames);
  // });

  // $profilePage.on('click', '.file-name span', function() {
  //   const fName = $(this).data('fileName');
  //   const index = finalFiles.findIndex(elem => elem.name === fName);
  //   finalFiles.splice(index, 1);
  //   $(this).parent().remove();
  // });

  $profilePage.find('form').submit(function(e) {
    e.preventDefault();

    const files = $('input[name=files]')[0].files;
    $('input[name=files]').val('');
    const data = new FormData($(this)[0]);
    
    for (const file of finalFiles) data.append('files', file);

    $.ajax({
      url: window.location.pathname + '/uploads?hi=3',
      type: 'POST',
      data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: (data) => {
        if (data === 'success') window.location = '/profile';
      }
    })
  });

});
