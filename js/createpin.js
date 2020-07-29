'use strict';

(function () {
  var maxPinCount = 8;
  var mapPin = document.querySelector('.map__pins');
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

  window.createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < maxPinCount; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };

  var mapFilters = document.querySelector('.map__filters');
  var typeList = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var filterType = mapFilters.querySelector('#housing-type');
  var typeAp = 'any';

  // если меняется значение в фильтре ТИП ЖИЛЬЯ, то остаются только объявления с выбранным типом
  filterType.addEventListener('change', function () {
    for (var h = 0; h < typeList.length; h++) {
      filterType.value = typeList[h];
      typeAp = typeList[h];
    }
    window.updatePins();
  });
  window.updatePins = function () {
    var sameTypeAp = window.apartamentList.filter(function (it) {
      return it.type === typeAp;
    });
    window.createPins(sameTypeAp);
  };
  /*

  var filterPrice = mapFilters.querySelector('#housing-price');
  var priceList = ['any', 'middle', 'low', 'high'];
  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var roomsList = ['any', '1', '2', '3'];
  var filterGuests = mapFilters.querySelector('#housing-guests');
  var guestsList = ['any', '1', '2', '0'];
  var filterFeatures = mapFilters.querySelector('#housing-features');
  var typeAp;
  var priceAp;
  var roomsAp;
  var guestsAp;
  var featuresAp;
  */


})();
