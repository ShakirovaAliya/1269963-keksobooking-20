'use strict';
var mapVision = document.querySelector('.map');
mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;
var maxCoast = 600;
var maxRoomsCount = 4;


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
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var titleText;
var descriptionText;
var guestsNumber;

function generatePinArray(count) {

  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push({
      author: {
        avatar: sortedAvatarArray[i]
      },
      offer: {
        title: titleText,
        address: [locations[i].x, locations[i].y],
        price: getRandomInt(maxCoast),
        type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))],
        rooms: getRandomInt(maxRoomsCount),
        quests: guestsNumber,
        checkin: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        checkout: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        features: featuresArray[0 + Math.floor(Math.random() * (featuresArray.length - 0))],
        description: descriptionText,
        photos: photosArray[0 + Math.floor(Math.random() * (photosArray.length - 0))]
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
var createCard = function () {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.document.querySelector('.popup__title').textContent = generatePinArray.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = generatePinArray.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = generatePinArray.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = generatePinArray.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = generatePinArray.offer.rooms + 'комнаты для' + generatePinArray.offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после' + generatePinArray.offer.checkin + ',' + 'выезд после' + generatePinArray.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = generatePinArray.offer.features;
  cardElement.querySelector('.popup__description').textContent = generatePinArray.offer.description;
  cardElement.querySelector('.popup__photos').textContent = generatePinArray.offer.photos;
  return cardElement;
};

var fragmentCard = document.createDocumentFragment();
for (var k = 0; k < similarAds.length; k++) {
  fragmentCard.appendChild(createCard(similarAds[k]));
}
mapPin.appendChild(fragmentCard);

var mapContainer = document.querySelector('.map__filters-container');
mapVision.insertBefore(fragmentCard, mapContainer);

