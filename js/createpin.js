'use strict';

(function () {
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (properties) {
    var PinElement = similarMapPinTemplate.cloneNode(true);
    PinElement.style.top = properties.location.y + 'px';
    PinElement.style.left = properties.location.x + 'px';
    PinElement.dataset.id = properties.id;
    PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
    PinElement.querySelector('img').classList.add('popup_img');
    PinElement.querySelector('img').dataset.id = properties.id;
    PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативный текст');
    return PinElement;
  };

  var maxPinCount = 8;
  var mapPin = document.querySelector('.map__pins');

  window.createPins = function (data) {
    var fragment = document.createDocumentFragment();
    // maxPinCount = data.length;
    for (var i = 0; i < maxPinCount; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };

  window.apartamentList = [];

  window.updatePins = function () {
    window.createPins(window.apartamentList);
  };

  var filterForm = document.querySelector('.map__filters');
  var filterElement = filterForm.querySelector('.map__filter');
  var filterType = filterElement.querySelector('#housing-type');
  var typeList = ['any', 'palace', 'flat', 'house', 'bungalo'];
  /* var filterPrice = filterElement.querySelector('#housing-price');
  var priceList = ['any', 'middle', 'low', 'high'];
  var filterRooms = filterElement.querySelector('#housing-rooms');
  var roomsList = ['any', '1', '2', '3'];
  var filterGuests = filterElement.querySelector('#housing-guests');
  var guestsList = ['any', '1', '2', '0'];
  var filterFeatures = filterForm.querySelector('#housing-features');
  var typeAp;
  var priceAp;
  var roomsAp;
  var guestsAp;
  var featuresAp;
  */
  for (var h = 0; h < typeList.length; h++) {
    filterType.addEventListener('change', function () {
      filterType.value = typeList[h];
      window.createPins(window.apartamentList);
    });
  }

})();


