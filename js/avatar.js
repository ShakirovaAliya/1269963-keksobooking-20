'use strict';

(function () {
  var photoTypes = ['gif', 'jpg', 'jpeg', 'png'];
  var AvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');
  var photoElement = document.createElement('img');
  photoPreviewContainer.appendChild(photoElement);
  var photoPreview = document.querySelector('.ad-form__photo img');
  photoPreview.width = photoPreviewContainer.offsetWidth;
  photoPreview.height = photoPreviewContainer.offsetWidth;

  AvatarChooser.addEventListener('change', function () {
    var file = AvatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = photoTypes.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  });


  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = photoTypes.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  });


})();
