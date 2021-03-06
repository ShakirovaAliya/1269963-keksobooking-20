'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var mainForm = document.querySelector('.ad-form');
  var mapVision = document.querySelector('.map');
  var defaultOptionItem = document.createElement('option');
  defaultOptionItem.innerHTML = 'выберите значение';
  defaultOptionItem.disabled = true;
  defaultOptionItem.value = '99';
  defaultOptionItem.setAttribute('selected', true);
  var titleInput = noticeBlock.querySelector('#title');
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  titleInput.minlength = '30';
  titleInput.maxlength = '100';
  titleInput.required = 'true';
  var roomsNumber = noticeBlock.querySelector('#room_number');
  var capacityGuests = noticeBlock.querySelector('#capacity');
  var avatarInput = noticeBlock.querySelector('.ad-form-header');
  var houseType = noticeBlock.querySelector('#type');
  var priceInput = noticeBlock.querySelector('#price');
  var timeInSelect = noticeBlock.querySelector('#timein');
  var timeOutSelect = noticeBlock.querySelector('#timeout');
  var time = noticeBlock.querySelector('.ad-form__element--time');
  var imagesInput = noticeBlock.querySelector('#images');
  var descriptionText = noticeBlock.querySelector('#description');
  var features = noticeBlock.querySelector('.features');
  var featuresCheckbox = noticeBlock.querySelectorAll('.feature__checkbox');
  var addressInput = noticeBlock.querySelector('#address');
  var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
  var main = document.querySelector('main');
  var resetButton = document.querySelector('.ad-form__reset');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');
  var photoElement = document.createElement('img');
  photoPreviewContainer.appendChild(photoElement);
  var photoPreview = document.querySelector('.ad-form__photo img');

  var resetForm = function () {
    titleInput.value = '';
    descriptionText.value = '';
    addressInput.value = '';
    capacityGuests.value = '99';
    roomsNumber.value = '99';
    houseType.value = '99';
    priceInput.value = '';
    priceInput.placeholder = '5000';
    timeOutSelect.value = '12:00';
    timeInSelect.value = '12:00';
    time.value = '';
    avatarInput.value = '';
    imagesInput.value = '';
    avatarPreview.src = 'img/muffin-grey.svg';
    photoPreview.remove();
    for (var j = 0; j < featuresCheckbox.length; j++) {
      if (featuresCheckbox[j].checked === true) {
        featuresCheckbox[j].checked = false;
      }
    }

  };

  var deactivatePage = function () {
    titleInput.disabled = true;
    descriptionText.disabled = true;
    addressInput.disabled = true;
    capacityGuests.setAttribute('disabled', 'true');
    roomsNumber.setAttribute('disabled', 'true');
    houseType.setAttribute('disabled', 'true');
    priceInput.setAttribute('disabled', 'true');
    time.disabled = true;
    avatarInput.disabled = true;
    imagesInput.disabled = true;
    features.disabled = true;
    buttonSubmit.disabled = true;
    mainForm.classList.add('ad-form--disabled');
    mapVision.classList.add('map--faded');
    var newMapCard = document.querySelector('.map__card');
    if (newMapCard) {
      newMapCard.remove();
    }
    var newPin = document.querySelectorAll('.map__pin');
    for (var i = 0; i < newPin.length; i++) {
      newPin[i].classList.add('hidden');
    }
    var mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.classList.remove('hidden');
  };

  var listener = function () {
    resetForm();
    deactivatePage();
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });
  var uploadSuccess = function () {
    var successM = document.querySelector('#success').content.querySelector('.success');
    var successElementClone = successM.cloneNode(true);
    successElementClone.classList.add('success-element');
    main.appendChild(successElementClone);
    var successElement = document.querySelector('.success-element');
    var uploadFormSuccess = function () {
      successElement.remove();
      listener();
      document.removeEventListener('click', uploadFormSuccess);
    };
    document.addEventListener('click', uploadFormSuccess);
    var closeEsc = function (e) {
      if (e.key === 'Escape') {
        successElement.remove();
        listener();
        document.removeEventListener('click', uploadFormSuccess);
        document.removeEventListener('keydown', closeEsc);
      }
    };
    document.addEventListener('keydown', closeEsc);

  };


  var submitHandler = function (evt) {
    window.upload(new FormData(mainForm), uploadSuccess);
    evt.preventDefault();
  };


  mainForm.addEventListener('submit', submitHandler);

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
  titleInput.addEventListener('input', function () {
    var valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });


  var defaultOptionItemRooms = defaultOptionItem.cloneNode(true);
  var defaultOptionItemCapacity = defaultOptionItem.cloneNode(true);
  capacityGuests.appendChild(defaultOptionItemCapacity);
  roomsNumber.appendChild(defaultOptionItemRooms);
  roomsNumber.addEventListener('change', function () {
    var valueRoom = roomsNumber.value;
    var errorMessage = '';
    if (valueRoom && capacityGuests.value === '99') {
      errorMessage = 'укажите кол-во гостей';
    } else if (valueRoom === '1' && capacityGuests.value !== '1') {
      errorMessage = '1 комната — для 1 гостя';
    } else if (valueRoom === '2' && !(capacityGuests.value === '1' || capacityGuests.value === '2')) {
      errorMessage = '2 комнаты — для 2 гостей или для 1 гостя';
    } else if (valueRoom === '3' && !(capacityGuests.value === '1' || capacityGuests.value === '2' || capacityGuests.value === '3')) {
      errorMessage = '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя';
    } else if (valueRoom === '100' && capacityGuests.value !== '0') {
      errorMessage = '100 комнат — не для гостей';
    } else {
      errorMessage = '';
    }
    capacityGuests.setCustomValidity(errorMessage);
    roomsNumber.setCustomValidity(errorMessage);
  });
  capacityGuests.addEventListener('change', function () {
    var valueCapacity = capacityGuests.value;
    var errorMessage = '';
    if (valueCapacity && roomsNumber.value === '99') {
      errorMessage = 'укажите кол-во комнат';
    } else if (valueCapacity === '1' && !(roomsNumber.value === '1' || roomsNumber.value === '2' || roomsNumber.value === '3')) {
      errorMessage = 'для 1го гостя - 1, 2 или 3 комнаты';
    } else if (valueCapacity === '2' && !(roomsNumber.value === '2' || roomsNumber.value === '3')) {
      errorMessage = 'для 2х гостей - 2 или 3 комнаты';
    } else if (valueCapacity === '3' && roomsNumber.value !== '3') {
      errorMessage = 'для 3х гостей - только 3 комнаты';
    } else if (valueCapacity === '0' && roomsNumber.value !== '100') {
      errorMessage = 'не для гостей - 100 комнат';
    } else {
      errorMessage = '';
    }
    roomsNumber.setCustomValidity(errorMessage);
    capacityGuests.setCustomValidity(errorMessage);
  }
  );


  var defaultOptionItemType = defaultOptionItem.cloneNode(true);
  priceInput.min = '0';
  priceInput.max = '1000000';
  priceInput.required = 'true';
  houseType.appendChild(defaultOptionItemType);
  houseType.addEventListener('change', function () {
    var valueType = houseType.value;
    if (valueType === 'bungalo') {
      priceInput.min = '0';
      priceInput.placeholder = '0';
    } else if (valueType === 'flat') {
      priceInput.min = '1000';
      priceInput.placeholder = '1000';
    } else if (valueType === 'house') {
      priceInput.min = '5000';
      priceInput.placeholder = '5000';
    } else if (valueType === 'palace') {
      priceInput.min = '10000';
      priceInput.placeholder = '10000';
    }
  });

  timeInSelect.addEventListener('change', function () {
    var valueTimeIn = timeInSelect.value;
    if (valueTimeIn === '12:00') {
      timeOutSelect.value = '12:00';
    } else if (valueTimeIn === '13:00') {
      timeOutSelect.value = '13:00';
    } else if (valueTimeIn === '14:00') {
      timeOutSelect.value = '14:00';
    }
  });
  timeOutSelect.addEventListener('change', function () {
    var valueTimeOut = timeOutSelect.value;
    if (valueTimeOut === '12:00') {
      timeInSelect.value = '12:00';
    } else if (valueTimeOut === '13:00') {
      timeInSelect.value = '13:00';
    } else if (valueTimeOut === '14:00') {
      timeInSelect.value = '14:00';
    }
  });

  var mapCard = document.querySelector('.map__card');
  var mapContainer = document.querySelector('.map__filters-container');


  var getId = function (evt) {
    var target = evt.target;
    var dataPopup;
    if (target.className === 'map__pin' || target.className === 'popup_img') {
      var pinId = target.dataset.id;
      dataPopup = window.apartamentList.find(function (element) {
        return element.id === Number(pinId);
      });

      if (mapCard) {
        mapCard.remove();
      }
      mapVision.insertBefore(window.card.createCard(dataPopup), mapContainer);
      mapCard = document.querySelector('.map__card');
      var closeButton = document.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        mapCard.remove();
      });
    } else if (evt.key === 'Enter') {
      mapVision.insertBefore(window.card.createCard(dataPopup), mapContainer);
      mapCard = document.querySelector('.map__card');
      closeButton.addEventListener('click', function () {
        mapCard.remove();
      });
    }
  };
  document.addEventListener('click', getId);

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    }
  });
  window.form = {
    resetForm: resetForm,
    deactivatePage: deactivatePage
  };
})();
