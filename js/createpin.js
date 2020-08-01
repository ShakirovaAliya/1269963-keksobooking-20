'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
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
    var takeNumber = data.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };

  var deleteCardPins = function () {
    var newPin = document.querySelectorAll('.map__pin');
    var newMapCard = document.querySelector('.map__card');
    if (newMapCard) {
      newMapCard.remove();
    }
    if (newPin) {
      for (var i = 0; i < newPin.length; i++) {
        newPin[i].classList.add('hidden');
      }
    }
    var mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.classList.remove('hidden');
  };


  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  filterType.value = 'any';
  filterType.addEventListener('change', function (evt) {
    deleteCardPins();
    filterType = evt.target.value;
    window.debounce(window.updatePins());
  });
  var filterPrice = mapFilters.querySelector('#housing-price');
  filterPrice.value = 'any';
  filterPrice.addEventListener('change', function (evt) {
    deleteCardPins();
    filterPrice = evt.target.value;
    window.debounce(window.updatePins());
  });

  var filterRooms = mapFilters.querySelector('#housing-rooms');
  filterRooms.value = 'any';
  filterRooms.addEventListener('change', function (evt) {
    deleteCardPins();
    filterRooms = evt.target.value;
    window.debounce(window.updatePins());
  });

  var filterGuests = mapFilters.querySelector('#housing-guests');
  filterGuests.value = 'any';
  filterGuests.addEventListener('change', function (evt) {
    deleteCardPins();
    filterGuests = evt.target.value;
    window.debounce(window.updatePins());
  });

  var filterFeatures = mapFilters.querySelector('#housing-features');
  var mapCheckbox = filterFeatures.querySelectorAll('.map__checkbox');
  for (var j = 0; j < mapCheckbox.length; j++) {
    mapCheckbox[j].addEventListener('change', function (evt) {
      if (mapCheckbox[j].checked === true) {
        mapCheckbox = evt.target.value;
      }
      deleteCardPins();
      window.debounce(window.updatePins());
    });
  }
  /*
  var getRank = function (apartamentList) {
    var rank = 0;
    if (window.apartamentList.offer.type === filterType) {
      rank += 5;
    }
    if (window.apartamentList.offer.price === filterPrice) {
      rank += 4;
    }
    if (window.apartamentList.offer.rooms === filterRooms) {
      rank += 3;
    }
    if (window.apartamentList.offer.guests === filterGuests) {
      rank += 2;
    }
    if (window.apartamentList.offer.features === mapCheckbox) {
      rank += 1;
    }
    return rank;
  };

  window.updatePins = function () {
    window.render(window.apartamentList.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.apartamentList.indexOf(left) - window.apartamentList.indexOf(right);
      }
      return rankDiff;
    }));
  };
  */

  window.updatePins = function () {

    var sameTypePriceRoomsGuestsAp = window.apartamentList.filter(function (it) {
      return it.offer.type === filterType &&
        it.offer.price === filterPrice &&
        it.offer.rooms === filterRooms.value &&
        it.offer.guests === filterGuests.value &&
        it.offer.features === mapCheckbox.checked;
    });
    var sameTypeAp = window.apartamentList.filter(function (it) {
      return it.offer.type === filterType;
    });
    var samePriceAp = window.apartamentList.filter(function (it) {
      return it.offer.price === filterPrice;
    });
    var sameRoomsAp = window.apartamentList.filter(function (it) {
      return it.offer.rooms === filterRooms;
    });
    var sameGuestsAp = window.apartamentList.filter(function (it) {
      return it.offer.guests === filterGuests;
    });
    var sameFeaturesAp = window.apartamentList.filter(function (it) {
      return it.offer.features === mapCheckbox;
    });
    var filteredPins = sameTypePriceRoomsGuestsAp;
    filteredPins = filteredPins.concat(sameTypeAp);
    filteredPins = filteredPins.concat(samePriceAp);
    filteredPins = filteredPins.concat(sameRoomsAp);
    filteredPins = filteredPins.concat(sameGuestsAp);
    filteredPins = filteredPins.concat(sameFeaturesAp);
    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });
    window.createPins(uniquePins);

  };

})();
