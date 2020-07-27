'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth;
  var noticeBlock = document.querySelector('.notice');
  var formDisabled = document.querySelector('.ad-form--disabled');
  var mapFilter = document.querySelector('.map__filters');
  var mapVision = document.querySelector('.map');
  var titleInput = noticeBlock.querySelector('#title');
  var roomsNumber = noticeBlock.querySelector('#room_number');
  var capacityGuests = noticeBlock.querySelector('#capacity');
  var houseType = noticeBlock.querySelector('#type');
  var priceInput = noticeBlock.querySelector('#price');
  var time = noticeBlock.querySelector('.ad-form__element--time');
  var descriptionText = noticeBlock.querySelector('#description');
  var features = noticeBlock.querySelector('.features');
  var avatarInput = noticeBlock.querySelector('.ad-form-header');
  var imagesInput = noticeBlock.querySelector('#images');
  var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
  var addressInput = noticeBlock.querySelector('#address');
  var maxPinCount = 8;
  var main = document.querySelector('main');


  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < maxPinCount; i++) {
      fragment.appendChild(window.createpin.createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };


  var successHandler = function (data) {
    activePage();
    window.apartamentList = data;
    for (var i = 0; i < window.apartamentList.length; i++) {
      window.apartamentList[i].id = i;
    }
    createPins(window.apartamentList);
  };

  var defaultOptionItem = document.createElement('option');
  defaultOptionItem.innerHTML = 'выберите значение';
  defaultOptionItem.disabled = true;
  defaultOptionItem.value = '99';
  defaultOptionItem.setAttribute('selected', true);
  var housingType = document.querySelector('#housing-type');
  var defaultOptionItemTypeAppartments = defaultOptionItem.cloneNode(true);
  housingType.appendChild(defaultOptionItemTypeAppartments);
  window.apartamentList = [];
  var appartmentType = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var typeAp;
  var updateAppartments = function () {
    var sameAppartments = window.apartamentList.filter(function (it) {
      return it.typeAp === typeAp;
    });
    window.createPins(sameAppartments);
  };
  housingType.addEventListener('change', function () {
    for (var i = 0; i < appartmentType.length; i++) {
      housingType.value = appartmentType[i];
      typeAp = appartmentType[i];
    }
    updateAppartments();
  });


  var errorHandler = function () {
    var errorM = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorM.cloneNode(true);
    main.appendChild(errorElement);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorM.remove();
      window.load(successHandler, errorHandler);
    });
    errorElement.addEventListener('click', function () {
      errorM.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorElement.remove();
      }
    });
  };

  var activePage = function () {
    mapVision.classList.remove('map--faded');
    formDisabled.classList.remove('ad-form--disabled');
    mapFilter.disabled = false;
    titleInput.disabled = false;
    roomsNumber.removeAttribute('disabled', 'true');
    capacityGuests.removeAttribute('disabled', 'true');
    houseType.removeAttribute('disabled', 'true');
    priceInput.removeAttribute('disabled', 'true');
    time.disabled = false;
    descriptionText.disabled = false;
    features.disabled = false;
    avatarInput.disabled = false;
    imagesInput.disabled = false;
    buttonSubmit.disabled = false;
    addressInput.readOnly = true;
    addressInput.disabled = false;
    addressInput.value = mapPinMain.offsetLeft + ',' + mapPinMain.offsetTop;
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.load(successHandler, errorHandler);
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.load(successHandler, errorHandler);
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var minY = 130;
      var maxY = 630;

      if ((mapPinMain.offsetTop - shift.y) >= (minY - mapPinMainHeight) && (mapPinMain.offsetTop - shift.y) <= (maxY - mapPinMainHeight)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) <= (mapPinWidth - mapPinMainWidth / 2)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((mapPinMain.offsetLeft - shift.x) <= 0) {
        mapPinMain.style.left = (0 - mapPinMainWidth / 2) + 'px';
      }
      addressInput.value = (mapPinMain.offsetLeft - shift.x) + ',' + (mapPinMain.offsetTop - shift.y);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  );

  window.main = {
    successHandler: successHandler,
    activePage: activePage
  };
})();

