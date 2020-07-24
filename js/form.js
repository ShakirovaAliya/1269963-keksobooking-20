'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var mainForm = document.querySelector('.ad-form');
  var mapVision = document.querySelector('.map');
  // mainForm.method = 'post';
  // mainForm.action = 'https://javascript.pages.academy/keksobooking';
  var defaultOptionItem = document.createElement('option');
  defaultOptionItem.innerHTML = 'выберите значение';
  defaultOptionItem.disabled = true;
  defaultOptionItem.value = '99';
  defaultOptionItem.setAttribute('selected', true);
  var titleInput = noticeBlock.querySelector('#title');
  var roomsNumber = noticeBlock.querySelector('#room_number');
  var capacityGuests = noticeBlock.querySelector('#capacity');
  var avatarInput = noticeBlock.querySelector('.ad-form-header');
  var houseType = noticeBlock.querySelector('#type');
  var priceInput = noticeBlock.querySelector('#price');
  var timeInSelect = noticeBlock.querySelector('#timein');
  var timeOutSelect = noticeBlock.querySelector('#timeout');
  var time = noticeBlock.querySelector('.ad-form__element--time');

  // avatarInput.disabled = true;
  var imagesInput = noticeBlock.querySelector('#images');
  // imagesInput.disabled = true;
  var descriptionText = noticeBlock.querySelector('#description');
  // descriptionText.disabled = true;
  var features = noticeBlock.querySelector('.features');
  var featuresCheckbox = noticeBlock.querySelectorAll('.feature__checkbox');
  // features.disabled = true;
  var addressInput = noticeBlock.querySelector('#address');
  // addressInput.disabled = true;
  var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
  // buttonSubmit.disabled = true;
  var main = document.querySelector('main');
  var resetButton = document.querySelector('.ad-form__reset');

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
    for (var j = 0; j < featuresCheckbox.length; j++) {
      if (featuresCheckbox[j].checked === true) {
        featuresCheckbox[j].checked = false;
      }
    }

  };

  var inactivePage = function () {
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
      newMapCard.classList.add('hidden');
    }
    var newPin = document.querySelectorAll('.map__pin');
    for (var i = 0; i < newPin.length; i++) {
      newPin[i].classList.add('hidden');
    }
    var mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.classList.remove('hidden');
  };
  resetForm();
  inactivePage();


  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });
  var successM = document.querySelector('#success').content.querySelector('.success');
  var successElement = successM.cloneNode(true);
  var submitHandler = function (evt) {
    window.upload(new FormData(mainForm), function () {
      main.appendChild(successElement);
      var listener = function () {
        resetForm();
        inactivePage();
      };
      successElement.addEventListener('click', function () {
        successElement.remove();
      });
      document.addEventListener('click', listener());
      document.removeEventListener('click', listener());
    });
    evt.preventDefault();
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  }
  );
  if (successElement) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        resetForm();
        inactivePage();
      }
    });
  } else {
    window.activePage();
    /* document.removeEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        resetForm();
        inactivePage();
      }
    });
    */
  }


  mainForm.addEventListener('submit', submitHandler);
  var minTitleLength = 30;
  var maxTitleLength = 100;
  // titleInput.disabled = true;
  titleInput.minlength = '30';
  titleInput.maxlength = '100';
  titleInput.required = 'true';
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
  titleInput.addEventListener('input', function () {
    var valueLength = titleInput.value.length;
    if (valueLength < minTitleLength) {
      titleInput.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' симв.');
    } else if (valueLength > maxTitleLength) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });


  var defaultOptionItemRooms = defaultOptionItem.cloneNode(true);
  var defaultOptionItemCapacity = defaultOptionItem.cloneNode(true);
  // roomsNumber.setAttribute('disabled', 'true');
  // capacityGuests.setAttribute('disabled', 'true');
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
  // houseType.setAttribute('disabled', 'true');
  // priceInput.setAttribute('disabled', 'true');
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

  // time.disabled = true;
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
      // в данной функции ни чего не изменилось кроме того,что поиск нужного
      // елемента мы теперь проводим в массиве window.apartamentList
      // который создали в функции successHandler файла main
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
    inactivePage: inactivePage
  };
})();
