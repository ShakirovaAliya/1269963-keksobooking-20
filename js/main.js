'use strict';
var mapVision = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;
var maxCoast = 600;
var maxRoomsCount = 4;
var maxGuestsCount = 10;
var mapInput = document.querySelectorAll('.ad-form input');
var mapSelect = document.querySelectorAll('.ad-form select');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var formDisabled = document.querySelector('.ad-form--disabled');
var minTitleLength = 30;
var maxTitleLength = 100;
var titleInput = document.querySelector('input[name="title"]');
// var mainForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('input[name="address"]');
var typeSelect = document.querySelector('select[name="type"]');
var timeInSelect = document.querySelector('select[name="timein"]');
var timeOutSelect = document.querySelector('select[name="timeout"]');
var priceInput = document.querySelector('input[name="price"]');
var roomSelect = document.querySelector('select[name="rooms"]');
var capacitySelect = document.querySelector('select[name="capacity"]');


// взяла из задания, но хз как использовать
// var buttonPressed = instanceOfMouseEvent.button;


// АКТИВНЫЙ РЕЖИМ
mapPinMain.addEventListener('mousedown', function () {
  mapVision.classList.remove('map--faded');
  formDisabled.classList.remove('ad-form--disabled');
  mapFilter.disabled = 'false';
  mapInput.disabled = 'false';
  mapSelect.disabled = 'false';
}
);


mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    mapVision.classList.remove('map--faded');
    formDisabled.classList.remove('ad-form--disabled');
    mapFilter.disabled = 'false';
    mapInput.disabled = 'false';
    mapSelect.disabled = 'false';
  }
});


// АДРЕС
addressInput.disabled = true;


// ЗАГОЛОВОК
// здесь нужно invalid ставить на всю форму или только на инпут title? что-то разницы не заметила
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


// ТИП
typeSelect.addEventListener('change', function () {
  var valueType = typeSelect.value;
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


// ВРЕМЯ
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


// КОМНАТЫ И ГОСТИ
roomSelect.addEventListener('change', function () {
  var valueRoom = roomSelect.value;
  if (valueRoom === '1') {
    if (capacitySelect.value !== '1') {
      capacitySelect.setCustomValidity('1 комната — для 1 гостя');
    }
  } else if (valueRoom === '2') {
    if (capacitySelect.value !== '1' || capacitySelect.value !== '2') {
      capacitySelect.setCustomValidity('2 комнаты — для 2 гостей или для 1 гостя');
    }
  } else if (valueRoom === '3') {
    if (capacitySelect.value !== '1' || capacitySelect.value !== '2' || capacitySelect.value !== '3') {
      capacitySelect.setCustomValidity('3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя');
    }
  } else if (valueRoom === '100') {
    if (capacitySelect.value !== '0') {
      capacitySelect.setCustomValidity('100 комнат — не для гостей');
    } else {
      capacitySelect.setCustomValidity('');
    }
  }
}
);


//  author

function avatar(count) {
  var newArr = [];
  for (var i = 1; i <= count; i++) {
    if (i < 10 || i > 0) {
      var s = '0' + i;
    } else {
      s = i;
    }
    newArr.push('img/avatars/user' + s + '.png');
  }
  return newArr;
}
var avatarArray = avatar(8);
function sortArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
var sortedAvatarArray = sortArray(avatarArray);


//  location
function locationsCoordinats(min, max, count) {
  var arr = [];
  for (var i = 1; i <= count; i++) {
    arr.push({
      x: Math.round(0 + Math.random() * (mapPinWidth)) - pinWidth / 2,
      y: Math.round(min + Math.random() * (max - min)) - pinHeight
    });
  }
  return arr;
}
var locations = locationsCoordinats(130, 630, 8);


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// offer
var typeArray = ['Palace', 'Flat', 'House', 'Bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function generatePinArray(count) {

  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push({
      author: {
        avatar: sortedAvatarArray[i]
      },
      offer: {
        title: 'Уютное гнездышко для молодоженов',
        address: [locations[i].x, locations[i].y],
        price: getRandomInt(maxCoast),
        type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))],
        rooms: getRandomInt(maxRoomsCount),
        guests: getRandomInt(maxGuestsCount),
        checkin: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        checkout: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        features: featuresArray.slice(getRandomInt(featuresArray.length)),
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        photos: photosArray.slice(getRandomInt(photosArray.length))
      },
      location: {
        x: locations[i].x,
        y: locations[i].y
      }
    });
  }
  return arr;
}
var similarAds = generatePinArray(8);


var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var createPin = function (properties) {
  var PinElement = similarMapPinTemplate.cloneNode(true);
  PinElement.style.top = properties.location.y + 'px';
  PinElement.style.left = properties.location.x + 'px';
  PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
  PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативный текст');
  return PinElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(createPin(similarAds[i]));

}
mapPin.appendChild(fragment);

var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var createCard = function (ads) {
  var card = similarCardTemplate.cloneNode(true);
  card.querySelector('.popup__title').innerText = ads.offer.title;
  card.querySelector('img').src = ads.author.avatar;
  card.querySelector('.popup__text--address').innerText = ads.offer.address;
  card.querySelector('.popup__text--price').innerText = ads.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').innerText = ads.offer.type;
  card.querySelector('.popup__text--capacity').innerText = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').innerText = 'заезд после' + ads.offer.checkin + ', выезд после' + ads.offer.checkout;
  var cardFeature = card.querySelector('.popup__features');
  cardFeature.innerHTML = '';
  ads.offer.features.forEach(function (element) {
    cardFeature.innerHTML += '<li class="popup__feature popup__feature--' + element + '"></li>';
  });
  card.querySelector('.popup__description').innerText = ads.offer.description;
  var cardPhoto = card.querySelector('.popup__photos');
  cardPhoto.innerHTML = '';
  ads.offer.photos.forEach(function (element) {
    if (element) {
      cardPhoto.innerHTML += '<img src="' + element + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
  });
  return card;
};

var mapContainer = document.querySelector('.map__filters-container');
mapVision.insertBefore(createCard(similarAds[0]), mapContainer);

