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
  /*
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
*/

  //  Создание фильтров
  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');

  //  фильтр типа жилья
  var typeOfHousingFilter = function (elem) {
    if (housingType.value === 'any') {
      return true;
    }
    return elem.offer.type === housingType.value;
  };

  //  фильтр стоимости
  var priceOfHousing = formFilters.querySelector('#housing-price');
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;
  var priceOfHousingfilter = function (elem) {
    var priceValue = false;
    switch (priceOfHousing.value) {
      case 'any':
        priceValue = 'true';
        break;
      case 'low':
        priceValue = elem.offer.price <= MIN_PRICE_VALUE;
        break;
      case 'high':
        priceValue = elem.offer.price >= MAX_PRICE_VALUE;
        break;
      case 'middle':
        priceValue = elem.offer.price >= MIN_PRICE_VALUE && elem.offer.price <= MAX_PRICE_VALUE;
    }
    return priceValue;
  };


  //  фильтрация по количеству комнат
  var numOfRooms = formFilters.querySelector('#housing-rooms');

  var numOfRoomsFilter = function (elem) {
    if (numOfRooms.value === 'any') {
      return true;
    }
    return elem.offer.rooms === Number(numOfRooms.value);
  };
  //  фильтрация по количеству гостей
  var numOfGuests = formFilters.querySelector('#housing-guests');

  var numOfGuestsFilter = function (elem) {
    if (numOfGuests.value === 'any') {
      return true;
    }
    return elem.offer.guests === Number(numOfGuests.value);
  };

  //  фильтрация по чекбоксам
  var featuresFilter = function (elem) {
    var filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
    var filtered = true;
    if (filterFeaturesCheckboxes.length) {
      filterFeaturesCheckboxes.forEach(function (chBox) {
        if (!elem.offer.features.includes(chBox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

  //  общий фильтр

  var commonFilter = function (elem) {
    return typeOfHousingFilter(elem) && priceOfHousingfilter(elem) && numOfRoomsFilter(elem) && numOfGuestsFilter(elem) && featuresFilter(elem);
  };
  //  событие изменения фильтров пинов
  var onChangePinFiltersFields = function () {
    //  удаление пинов
    // window.remove('.map__pin');
    //  удаление карточки
    // window.remove('.map__card');
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
    window.pinsFragment = window.apartmentsList.filter(commonFilter);
    mapPin.appendChild(window.pinsFragment);
  };
  //  для каждого елемента массива ставим слушатель
  formFilters.addEventListener('change', onChangePinFiltersFields);
  /*
  window.updatePins = function () {
    typeOfHousingFilter();
    priceOfHousingfilter();
    numOfRoomsFilter();
    numOfGuestsFilter();
    featuresFilter();
    var sameTypePriceRoomsGuestsFeaturesAp = window.apartamentList.filter(function (it) {
      return it.offer.type === housingType &&
        it.offer.price === priceOfHousing &&
        it.offer.rooms === numOfRooms.value &&
        it.offer.guests === numOfGuests.value &&
        it.offer.features === featuresFilter;
    });
    var sameTypeAp = window.apartamentList.filter(function (it) {
      return it.offer.type === housingType;
    });
    var samePriceAp = window.apartamentList.filter(function (it) {
      return it.offer.price === priceOfHousing;
    });
    var sameRoomsAp = window.apartamentList.filter(function (it) {
      return it.offer.rooms === numOfRooms;
    });
    var sameGuestsAp = window.apartamentList.filter(function (it) {
      return it.offer.guests === numOfGuests;
    });
    var sameFeaturesAp = window.apartamentList.filter(function (it) {
      return it.offer.features === featuresFilter;
    });
    var filteredPins = sameTypePriceRoomsGuestsFeaturesAp;
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
  */

})();
