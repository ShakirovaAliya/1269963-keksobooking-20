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
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var formDisabled = document.querySelector('.ad-form--disabled');
var mainForm = document.querySelector('.ad-form');
mainForm.method = 'post';
mainForm.action = 'https://javascript.pages.academy/keksobooking';
var noticeBlock = document.querySelector('.notice');


// ЗАГОЛОВОК
var titleInput = noticeBlock.querySelector('#title');
titleInput.disabled = true;
var minTitleLength = 30;
var maxTitleLength = 100;
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

// КОМНАТЫ И ГОСТИ
var roomsNumber = noticeBlock.querySelector('#room_number');
var capacityGuests = noticeBlock.querySelector('#capacity');
roomsNumber.setAttribute('disabled', 'true');
capacityGuests.setAttribute('disabled', 'true');

var defaultOptionItem = document.createElement('option');
defaultOptionItem.innerHTML = 'выберите значение';
defaultOptionItem.disabled = true;
defaultOptionItem.value = '99';
defaultOptionItem.setAttribute('selected', true);
// дефолтное значение для выбора количества мест и гостей
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

// ТИП
var houseType = noticeBlock.querySelector('#type');
var priceInput = noticeBlock.querySelector('#price');
houseType.setAttribute('disabled', 'true');
priceInput.setAttribute('disabled', 'true');
priceInput.min = '0';
priceInput.max = '1000000';
priceInput.required = 'true';
var defaultOptionItemType = defaultOptionItem.cloneNode(true);
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

// ВРЕМЯ
var timeInSelect = noticeBlock.querySelector('#timein');
var timeOutSelect = noticeBlock.querySelector('#timeout');
var time = noticeBlock.querySelector('.ad-form__element--time');
time.disabled = true;
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
        photos: photosArray.slice(getRandomInt(photosArray.length)),
      },
      location: {
        x: locations[i].x,
        y: locations[i].y
      },
      id: i,
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
  PinElement.dataset.id = properties.id;
  PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
  PinElement.querySelector('img').classList.add('popup_img');
  PinElement.querySelector('img').dataset.id = properties.id;
  PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативный текст');
  return PinElement;
};


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
      cardPhoto.innerHTML += '<img src="' + element + '"class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
  });

  return card;
};


var mapContainer = document.querySelector('.map__filters-container');


// АВАТАР
var avatarInput = noticeBlock.querySelector('.ad-form-header');
avatarInput.disabled = true;

// ФОТО ЖИЛЬЯ
var imagesInput = noticeBlock.querySelector('#images');
imagesInput.disabled = true;

// ОПИСАНИЕ
var descriptionText = noticeBlock.querySelector('#description');
descriptionText.disabled = true;

// УДОБСТВА
var features = noticeBlock.querySelector('.features');
features.disabled = true;

// АДРЕС
var addressInput = noticeBlock.querySelector('#address');
addressInput.disabled = true;

// КНОПКИ
var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
buttonSubmit.disabled = true;

// АКТИВНЫЙ РЕЖИМ
var fragment = document.createDocumentFragment();

mapPinMain.addEventListener('mousedown', function () {
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
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(createPin(similarAds[i]));
  }
  mapPin.appendChild(fragment);
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
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
    for (var i = 0; i < similarAds.length; i++) {
      fragment.appendChild(createPin(similarAds[i]));
    }
    mapPin.appendChild(fragment);
  }
});

var mapCard = document.querySelector('.map__card');
// дальше создал функцию которая на основании данных id нажатого пина находила бы нам полный обьект предложения что б мы могли на основании его отрисовать попап
function getId(evt) {

  var target = evt.target;
  // завели переменную в которую запишем значение найденой карточки для отрисвки попапа
  var dataPopup;
  // узнаем на пин ли мы кликнули проверив класс елемента по которому кликнули
  if (target.className === 'map__pin' || target.className === 'popup_img') {
    // если мы нажали на button либо img то считываем их dataset.id (уникальное значение)
    var pinId = target.dataset.id; // узнаем id пина по которому кликнули
    dataPopup = similarAds.find(function (element) {
      return element.id === Number(pinId);
    });

    if (mapCard) {
      mapCard.remove();
    }
    mapVision.insertBefore(createCard(dataPopup), mapContainer);
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      mapCard.remove();
    });

  } else if (evt.key === 'Enter') {
    mapVision.insertBefore(createCard(dataPopup), mapContainer);
  }
}

document.addEventListener('click', getId);

