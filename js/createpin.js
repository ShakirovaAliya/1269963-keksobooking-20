'use strict';

(function () {
  var maxPinCount = 5;
  var mapCard = document.querySelector('.map__card');
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
    var takeNumber = data.length > maxPinCount ? maxPinCount : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };


  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  var typeOfHouse = 'any';
  filterType.addEventListener('change', function (evt) {
    typeOfHouse = evt.target.value;
    if (mapCard) {
      mapCard.remove();
    }
    window.updatePins();
  });

  var filterPrice = mapFilters.querySelector('#housing-price');
  var priceOfHouse = '';
  filterPrice.addEventListener('change', function (evt) {
    priceOfHouse = evt.target.value;
    if (mapCard) {
      mapCard.remove();
    }
    window.updatePins();
  });
  /*
  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var roomsOfHouse = '';
  filterRooms.addEventListener('change', function (evt) {
    roomsOfHouse = evt.target.value;
    window.updatePins();
  });

  var filterGuests = mapFilters.querySelector('#housing-guests');
  var guestsOfHouse = '';
  filterGuests.addEventListener('change', function (evt) {
    guestsOfHouse = evt.target.value;
    window.updatePins();
  });
*/
  window.updatePins = function () {
    var sameTypeAp = window.apartamentList.filter(function (it) {
      return it.type === typeOfHouse.value;
    });
    var samePriceAp = window.apartamentList.filter(function (it) {
      return it.price === priceOfHouse.value;
    });
    /*
    var sameRoomsAp = window.apartamentList.filter(function (it) {
      return it.rooms === roomsOfHouse.value;
    });
    var sameGuestsAp = window.apartamentList.filter(function (it) {
      return it.guests === guestsOfHouse.value;
    });
    */
    var filteredPins = sameTypeAp.concat(samePriceAp);

    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });

    window.createPins(uniquePins);
  };

  /*
  .concat(samePriceAp).concat(sameRoomsAp).concat(sameGuestsAp).concat(window.apartamentList)
  var typeList = ['any', 'palace', 'flat', 'house', 'bungalo'];
  var priceList = ['any', 'middle', 'low', 'high'];
  var roomsList = ['any', '1', '2', '3'];
  var guestsList = ['any', '1', '2', '0'];
  var filterFeatures = mapFilters.querySelector('#housing-features');
  */


})();
